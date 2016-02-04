# Rushy Panchal
# jellifish
# app/app.py

import signal
import os.path
import sys

import server
import config

class Application(object):
	'''Houses the entire main application'''
	def __init__(self):
		self.server = None
		self._setup = False

	@staticmethod
	def getServer(setup = False):
		'''Get the server of a new Application instance, optionally setting it up

		Arguments
			bool setup - whether or not to set up the server

		Returns
			(server.Server) application's server instance'''
		app = Application()
		app.setup()
		return app.server

	def run(self):
		'''Runs the application'''
		if not self._setup:
			self.setup()

		self.server.run()

	def setup(self):
		'''Set up the application'''
		options = {"template_folder": "views"}

		if config.DEV_MODE:
			options["static_folder"] = os.path.join("..", "static")
			options["static_url_path"] = "/static"

		self.server = server.Server("config.FlaskSettings", **options)
		self.server.configureRoutes()

		# handle incoming OS (termination) signals
		signal.signal(signal.SIGINT, self.handleSignal)
		signal.signal(signal.SIGTERM, self.handleSignal)

	def shutdown(self):
		'''Shutdown the application'''
		return # no shutdown behavior yet

	def handleSignal(self, signal, frame):
		'''Handle an incoming signal'''
		self.shutdown()

		sys.exit(signal)
