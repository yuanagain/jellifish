# Rushy Panchal
# app/lib/blueprints/recipes.py

from flask import render_template, request, redirect, url_for
import json

from .. import core
from . import route

class RecipeRouter(route.Router):
	'''
	A RecipeRouter provides the routing mechanisms for the recipe-based
	pages.
	'''
	def addRoutes(self):
		'''
		Add routes to the router.
		'''
		@self.route("/new")
		def get_new():
			'''
			Handles a request to /new
				Method: GET
				Path: /new
			Renders new_recipe.html.
			'''
			return render_template("new_recipe.html")

		@self.route("/new", methods = ["POST"])
		def post_new():
			'''
			Handles a request to /new
				Method: POST
				Path: /new
			Saves the recipe and redirects to /new.
			'''
			name = request.form.get("name")
			descr = request.form.get("description")
			# The data is turned into a JSON string on the new_recipe page, because
			# that is the simplest way to transmit a list of unknown size,, even
			# though it is a rather hacky way to submit the data through a form,
			# especially because it is not even sent as application/json, but just
			# as raw text.
			tasks_raw = json.loads(request.form.get("tasks"))
			# TODO verify if arguments are provided or not, and report error
			# as a flash message if not provided.

			# Convert each raw task to a TaskNode - note: I avoid using map
			# here because map returns an iterator, and converting that to a list
			# is less efficient than simply using a list comprehension.
			tasks = [core.node.TaskNode(**raw) for raw in tasks_raw]

			# Create the TaskSequence and add it to the database.
			seq = core.node.TaskSequence(name, descr, tasks)
			seq.update_times()
			self.database.add_recipe(seq)

			return redirect(url_for("recipes.get_new"))
