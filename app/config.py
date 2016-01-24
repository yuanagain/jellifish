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

if DEV_MODE:
	FlaskSettings.SEND_FILE_MAX_AGE_DEFAULT = 0

VIEW_GLOBALS = {
	"production": not DEV_MODE,
	"name": "Jellifish",
	"static": "/".join([FULL_URL, "static"])
	}

DEPLOY_SETTINGS = {
	"configuration_files": ["nginx.conf", "init", "upstart-app.conf"],
	"configuration_file_data": {}, # utilized by package.py
	"https": False,
	"cloudflare": False,
	"static_error_pages": False,
	"ufw": True,
	"swap_size": "1G",
	"py_version": "3.5.0",
	"virtualenv": "env",
	"app_directory": "app",
	"static_directory": "static",
	"user": NAME
	}
