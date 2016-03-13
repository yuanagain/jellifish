# Rushy Panchal
# jellifish
# app/config.py

import os
import yaml

def recursiveMerge(x, y):
	'''
	Recursively merge two dictionaries

	Arguments
		dict x - first dictionary to merge
		dict y - second dictionary to merge

	Returns
		(dict) merged dictionaries
	'''
	if y is None: y = {}
	merged = dict(x, **y)
	for key, value in x.items():
		if isinstance(value, dict) and key in y:
			merged[key] = recursiveMerge(value, y[key])
	return merged

ENVIRONMENT = os.environ.get("ENV", "development")

DEV_MODE = (ENVIRONMENT == "development")

with open("../config.yml", "r") as config_file:
	RAW_CONFIG = yaml.load(config_file)["config"]
	CONFIG = recursiveMerge(
		RAW_CONFIG["default"],
		RAW_CONFIG.get(ENVIRONMENT)
		)

NAME = CONFIG["name"]
PROTOCOL = CONFIG["web"]["protocol"]
BASE_URL = CONFIG["web"]["url"]
FULL_URL = PROTOCOL + BASE_URL

class FlaskSettings(object):
	'''
	Settings for Flask server
	'''
	DEBUG = DEV_MODE

	SECRET_KEY = CONFIG["app"]["secret_key"]
	SESSION_COOKIE_NAME = NAME

	SERVER_NAME = BASE_URL
	PREFERRED_URL_SCHEME = PROTOCOL

if DEV_MODE:
	FlaskSettings.SEND_FILE_MAX_AGE_DEFAULT = 0

VIEW_GLOBALS = {
	"production": not DEV_MODE,
	"name": NAME.title(),
	"static": "/".join([FULL_URL, CONFIG["web"]["static"]])
	}

DEPLOY_SETTINGS = {
	"configuration_files": ["nginx.conf", "init", "upstart-app.conf"],
	"configuration_file_data": {}, # utilized by package.py
	"https": CONFIG["web"]["https"],
	"cloudflare": CONFIG["web"]["cloudflare"],
	"static_error_pages": CONFIG["web"]["static_error_pages"],
	"ufw": CONFIG["server"]["ufw"],
	"swap_size": CONFIG["server"]["swap"],
	"py_version": CONFIG["app"]["py_version"],
	"virtualenv": CONFIG["app"]["virtualenv"],
	"app_directory": CONFIG["app"]["directory"],
	"static_directory": CONFIG["app"]["static_directory"],
	"user": CONFIG["user"]["name"]
	}
