# Rushy Panchal
# jellifish
# app/server.py

from flask import Flask, render_template, request, redirect, url_for

import lib
import config

class Server(Flask):
	'''
	Creates a basic Flask Web Server

	Parameters
		str configPath - path to the configuration, as an object, for the server
		list *args - extra arguments to pass to Flask
		dict kwargs - extra keyword arguments to pass to Flask
	'''
	def __init__(self, configPath, *args, **kwargs):
		super(Server, self).__init__(config.NAME, *args, **kwargs)
		self.config.from_object(configPath)
		self.jinja_env.globals["site"] = config.VIEW_GLOBALS

		self.database = lib.core.client.DatabaseClient(config.DATABASE)
		
		# Recipes are cached and are refreshed every minute, as necessary.
		self.recipes = lib.core.cache.CachedValue(refresh = self.database.list_recipes,
			prefetch = True)
		# Up to CACHE_SIZE meals are cached, with the earliest 10% being cleared
		# when unused.
		self.meals = lib.core.cache.FixedSizeCache(config.CACHE_SIZE,
			config.CACHE_SIZE / 10, onmiss = self.database.fetch_recipes_greedy)

		lib.blueprints.route.Router.updateGlobalData({
			"database": self.database,
			"recipes": self.recipes,
			"meals": self.meals
			})

	def shutdown(self):
		'''
		Shuts down the server.
		'''
		self.database.close()

	def configureRoutes(self):
		'''
		Configure the routes for the server
		'''
		@self.route("/index/")
		@self.route("/")
		def get_index():
			'''
			Handles a request to /index
				Method: GET
				Path: /index

			Renders index.html with a list of recipes
			'''
			return render_template("index.html", recipes = self.recipes.value)

		@self.route("/timers/", methods = ["POST"])
		def post_timers():
			'''
			Handles a request to /timers
				Method: POST
				Path: /timers

			Renders timers.html with the recipes and their associated timer data,
			as taken from the backend.
			'''
			selected_recipes = tuple(request.form.getlist("recipe"))
			timer_data = {"recipes": selected_recipes, "active": self.meals[selected_recipes]}
			return render_template("timers.html", data = timer_data)

		@self.route("/ingredients/")
		@self.route("/timers/")
		def redirect_index():
			'''
			Handles a request to /ingredients OR /timers
				Method: GET
				Path: /ingredients OR /timers

			Redirects to get_index router.
			'''
			return redirect(url_for(".get_index"))

		self.configureBlueprints()

	def configureBlueprints(self):
		'''
		Configure the blueprints for the server.
		'''
		# Add all appropriate blueprints
		recipeRouter = lib.blueprints.recipes.RecipeRouter("recipes", __name__,
			template_folder = "views", url_prefix = "/recipes")
		apiRouter = lib.blueprints.api.APIRouter("api", __name__,
			template_folder = "views", url_prefix = "/api")

		all_blueprints = [recipeRouter, apiRouter]

		# Register each blueprint with the server
		for blueprint in all_blueprints:
			self.register_blueprint(blueprint)
