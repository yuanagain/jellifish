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
			timer_data = {"active": [{"start_time": 0.0, "description": "Put water in pot. Put pot on stove", "name": "Put water on stove", "end_time": 5.0, "duration": 5}, {"start_time": 5.0, "description": "Add salt to water", "name": "Add salt", "end_time": 15, "duration": 10}, {"start_time": 15.0, "description": "Add pasta to boiling water", "name": "Put pasta in water", "end_time": 25.0, "duration": 10}, {"start_time": 25.0, "description": "Dice Tomatoes into small cubes", "name": "Dice Tomatoes", "end_time": 35.0, "duration": 10}, {"start_time": 35.0, "description": "Drain pasta using a strainer", "name": "Drain pasta", "end_time": 50.0, "duration": 15}, {"start_time": 50.0, "description": "Cover the pasta with Tomatoes", "name": "Put Tomatoes in pasta", "end_time": 55.0, "duration": 5}], "passive": [{"name":"Boiling Water\n","end_time":7.0,"start_time":0.0,"descripton":"Bring cold water to a boil\n","duration":7.0},{"name":"Pasta\n","end_time":120.0,"start_time":120.0,"descripton":"Ingredient\n","duration":0.0},{"name":"Water\n","end_time":120.0,"start_time":120.0,"descripton":"Ingredient\n","duration":0.0}, {"start_time": 2.0, "end_time": 30.0, "duration": 28.0, "name": "Watch pasta", "description": "none"}]}

			timer_data["recipes"] = selected_recipes
			return render_template("timers.html", data = timer_data)
