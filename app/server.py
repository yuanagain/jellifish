# Rushy Panchal
# jellifish
# app/server.py

from flask import Flask, render_template, request, redirect, url_for

import config

class Server(Flask):
	'''Creates a basic Flask Web Server'''
	def __init__(self, configPath, *args, **kwargs):
		super(Server, self).__init__(config.NAME, *args, **kwargs)
		self.config.from_object(configPath)
		self.jinja_env.globals["site"] = config.VIEW_GLOBALS

	def configureRoutes(self):
		'''Configure the routes for the server'''
		@self.route("/index/")
		@self.route("/")
		def recipe_selection():
			'''GET index'''
			return render_template("index.html", recipes = ["test", "derp"])

		@self.route("/ingredients", methods = ["POST"])
		def get_ingredients():
			'''GET ingredients'''
			selected_recipes = request.form.getlist("recipe")
			# TODO fetch ingredients from backend
			ingredients = ["Pasta", "Water", "Potatoes", "Tomatoes"]
			return render_template("ingredients.html", ingredients = ingredients, selected_recipes = selected_recipes)

		@self.route("/timers", methods = ["POST"])
		def get_timers():
			'''GET timers'''
			selected_recipes = request.form.getlist("recipe")
			# TODO fetch data from backend cache
			data = {}
			return render_template("timers.html", data = data)
