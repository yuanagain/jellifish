# Rushy Panchal
# jellifish
# app/config.py

import os

ENVIRONMENT = os.environ.get("PYTHONENV", "dev")

DEV_MODE = (ENVIRONMENT == "dev")

NAME = "jellifish"
PROTOCOL = "http://"
BASE_URL = "localhost:8080" if DEV_MODE else "app.jelli.fish"
FULL_URL = PROTOCOL + BASE_URL

class FlaskSettings(object):
	'''Settings for Flask server'''
	DEBUG = DEV_MODE

	SECRET_KEY = "NtaTRKcZKw256RNMwp25Xqvw"
	SESSION_COOKIE_NAME = NAME

	SERVER_NAME = BASE_URL
	PREFERRED_URL_SCHEME = PROTOCOL

RECIPES = ["Blondies", "Canapes", "Turkish Coffee"]

VIEW_GLOBALS = {
	"name": "Jellifish",
	"static": "/".join([FULL_URL, "static"])
	}
