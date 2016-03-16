# Rushy Panchal
# jellifish
# app/server.py

from flask import Flask, render_template, request, redirect, url_for

import lib.core
import config

class Server(Flask):
	'''
	Creates a basic Flask Web Server

	Arguments
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
		def recipe_selection():
			'''
			Handles a request to /index
				Method: GET
				Path: /index

			Renders index.html with a list of recipes
			'''
			return render_template("index.html", recipes = self.recipes.value)

		@self.route("/ingredients", methods = ["POST"])
		def get_ingredients():
			'''
			Handles a request to /ingredients
				Method: POST
				Path: /ingredients

			Renders ingredients.html with the specified recipes and their associated
			ingredients.
			'''
			selected_recipes = tuple(request.form.getlist("recipe"))
			timer_data = self.meals[selected_recipes]
			ingredients = filter(lambda item: item["duration"] == 0, timer_data["active"])
			return render_template("ingredients.html", ingredients = ingredients, selected_recipes = selected_recipes)

		@self.route("/timers", methods = ["POST"])
		def get_timers():
			'''
			Handles a request to /timers
				Method: POST
				Path: /timers

			Renders timers.html with the recipes and their associated timer data,
			as taken from the backend.
			'''
			selected_recipes = tuple(request.form.getlist("recipe"))
			timer_data = self.meals[selected_recipes]
			timer_data["recipes"] = selected_recipes
			return render_template("timers.html", data = timer_data)
