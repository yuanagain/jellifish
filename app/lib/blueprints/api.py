# Rushy Panchal
# app/lib/blueprints/api.py

from flask import request, redirect, url_for, flash, jsonify
import json

from .. import core
from . import route

class APIRouter(route.Router):
	'''
	An APIRouter provides the routing mechanisms for the web-facing public API.
	'''
	def addRoutes(self):
		'''
		Add routes to the router.
		'''

		@self.route("/list/")
		def get_list():
			'''
			Handles an API request to /list
				Method: GET
				Path: /list

			Returns list of recipes
			'''
			data_out = {"data": self.recipes.value}
			return jsonify(**data_out)

		@self.route("/tasks/", methods = ["POST"])
		def post_tasks():
			'''
			Handles a request to /tasks
				Method: POST
				Path: /tasks

			Returns list of tasks for the recipes, in order.
			'''
			data = request.get_json()
			selected_recipes = tuple(data.get("recipes"))
			data_out = {
				"recipes": selected_recipes,
				"data": self.meals[selected_recipes]
				}
			return jsonify(**data_out)
