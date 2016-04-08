# Rushy Panchal
# app/lib/blueprints/recipes.py

from flask import render_template, request, redirect, url_for, flash
import json
import hashlib

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
		self.auth = core.auth.AuthenticationManager(
			authenticate_route = ".get_login",
			already_authenticated_route = ".get_index"
			)

		@self.route("/index")
		@self.route("/")
		@self.auth.authentication_required
		def get_index():
			'''
			Handles a request to / or /index
				Method: GET
				Path: / or /index

			Renders recipe_list.html
			'''
			return render_template("recipes.html", recipes = self.recipes.value)

		@self.route("/login")
		@self.auth.not_authentication_required
		def get_login():
			'''
			Handles a request to /login
				Method: GET
				Path: /login

			Renders login.html
			'''
			return render_template("login.html")

		@self.route("/logout")
		@self.auth.authentication_required
		def get_logout():
			'''
			Handles a request to /logout
				Method: GET
				Path: /logout

			Redirects to .get_index.
			'''
			self.auth.unauthentiate()
			return redirect(url_for(".get_index"))

		@self.route("/login", methods = ["POST"])
		def post_login():
			'''
			Handles a request to /login
				Method: POST
				Path: /login

			Authenticates the user if possible, or flashes an error message
			and redirects the user.

			If the user is successfully logged in, redirects to .get_index, otherwise
			redirects to .get_login.
			'''
			actual_hash = "5b77bb0816e454137cea52f4a3fb9694620e0937fc3e1a8f8f3a80be9a81ea24"
			password = request.form.get("password")
			if hashlib.sha256(password.encode('utf-8')).hexdigest() == actual_hash:
				self.auth.authenticate()
				return redirect(url_for(".get_index"))
			else:
				flash("Incorrect password!")
				return redirect(url_for(".get_login"))

		@self.route("/new")
		@self.auth.authentication_required
		def get_new():
			'''
			Handles a request to /new
				Method: GET
				Path: /new

			Renders new_recipe.html.
			'''
			return render_template("new_recipe.html")

		@self.route("/new", methods = ["POST"])
		@self.auth.authentication_required
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
		@self.auth.authentication_required
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
		@self.auth.authentication_required
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
			return redirect(url_for(".get_index"))

		@self.route("/delete/<recipe>")
		@self.auth.authentication_required
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
