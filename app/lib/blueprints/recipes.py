# Rushy Panchal
# app/lib/blueprints/recipes.py

from flask import render_template, request, redirect, url_for, flash
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
		@self.route("/index")
		@self.route("/")
		def get_index():
			'''
			Handles a request to / or /index
				Method: GET
				Path: / or /index

			Renders recipe_list.html
			'''
			return render_template("recipes.html", recipes = self.recipes.value)

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

			Saves the recipe and redirects to /.
			'''
			name = request.form.get("name")
			descr = request.form.get("description")
			# The data is turned into a JSON string on the new_recipe page, because
			# that is the simplest way to transmit a list of unknown size,, even
			# though it is a rather hacky way to submit the data through a form,
			# especially because it is not even sent as application/json, but just
			# as raw text.
			tasks_raw = json.loads(request.form.get("tasks"))
			if not (name and descr and tasks_raw):
				flash("Could not save recipe: all fields not provided.", "error")
				return redirect(url_for("recipes.get_new"))

			# Convert each raw task to a TaskNode - note: I avoid using map
			# here because map returns an iterator, and converting that to a list
			# is less efficient than simply using a list comprehension.
			tasks = [core.node.TaskNode(**raw) for raw in tasks_raw]

			# Create the TaskSequence and add it to the database.
			seq = core.node.TaskSequence(name, descr, tasks)
			seq.update_times()
			self.database.add_recipe(seq)
			self.recipes.refresh(True)

			flash("Recipe {name} added.".format(name = name), "success")
			return redirect(url_for("recipes.get_index"))

		@self.route("/edit/<recipe>")
		def get_edit(recipe = ""):
			'''
			Handles a request to /edit
				Method: GET
				Path: /edit

			Renders edit_recipe.html.
			'''
			if recipe:
				seq = self.database.fetch_recipe(recipe)
				data = {
					"name": recipe,
					"descr": seq.descr,
					"tasks": [task.dump_data() for task in seq.tasks]
					}
				return render_template("edit_recipe.html", recipe = data)
			else:
				flash("Recipe name not provided.", "error")
				return redirect(url_for(".get_index"))

		@self.route("/edit", methods = ["POST"])
		def post_edit():
			'''
			Handles a request to /edit
				Method: POST
				Path: /edit

			Renders edit_recipe.html, after updating the data.
			'''
			oldname = request.form.get("oldname")
			name = request.form.get("name")
			descr = request.form.get("description")
			if not name:
				flash("Name not provided.", "error")
				return redirect(url_for(".get_edit", recipe = oldname))

			tasks_raw = json.loads(request.form.get("tasks"))
			if not (name and descr and tasks_raw):
				flash("Could not save recipe: all fields not provided.", "error")
				return redirect(url_for("recipes.get_new"))

			tasks = [core.node.TaskNode(**raw) for raw in tasks_raw]

			seq = core.node.TaskSequence(name, descr, tasks)
			seq.update_times()

			self.database.delete_recipe(oldname)
			self.database.add_recipe(seq)
			self.recipes.refresh(True)

			self.recipes.refresh(True)
			return redirect(url_for(".get_edit", recipe = name))

		@self.route("/delete/<recipe>")
		def get_delete(recipe = ""):
			'''
			Handles a request to /delete
				Method: GET
				Path: /delete

			Deletes the recipe and redirects to /.
			'''
			if recipe:
				self.database.delete_recipe(recipe)
				self.recipes.refresh(True)
				flash("Recipe {name} deleted.".format(name = recipe), "success")
			else:
				flash("Recipe name not provided.", "error")
			return redirect(url_for(".get_index"))
