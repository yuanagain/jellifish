# Rushy Panchal
# jellifish
# app/server.py

from flask import Flask, render_template, request

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
			return render_template("index.html")
