# Rushy Panchal
# jellifish
# app/config.py

import os

NAME = "jellifish"

ENVIRONMENT = os.environ.get("PYTHONENV", "dev")

DEV_MODE = (ENVIRONMENT == "dev")

class FlaskSettings(object):
	'''Settings for Flask server'''
	DEBUG = DEV_MODE

	SECRET_KEY = "NtaTRKcZKw256RNMwp25Xqvw"
	SESSION_COOKIE_NAME = NAME

	SERVER_NAME = "localhost:8080" if DEV_MODE else "app.jelli.fish"
	PREFERRED_URL_SCHEME = "http://"

RECIPES = ["Blondies", "Canapes", "Turkish Coffee"]

VIEW_GLOBALS = {
	"name": "Jellifish"
	}
