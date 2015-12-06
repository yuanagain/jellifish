# Rushy Panchal
# Jelli.fish
# app/run.py

import os.path

import config
import server

def main():
	'''Create the server and start it'''
	options = {"template_folder": os.path.join("web", "views")}

	if config.DEV_MODE:
		options["static_folder"] = os.path.join("web", "static")
		options["static_url_path"] = "/static"
	
	appServer = server.Server("config.FlaskSettings", **options)
	appServer.configureRoutes()

	if config.DEV_MODE:
		appServer.run()

if __name__ == '__main__':
	main()

