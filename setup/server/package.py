# Jellifish
# Rushy Panchal
# package.py
# Package all configuration files into one executable script

import sys
import os

# Load configuration file
sys.path.append(os.path.join(os.path.realpath("../.."), "app"))
import config

import jinja2

CONFIGURATION_FILES = config.DEPLOY_SETTINGS["configuration_files"]

CONFIG = {"settings": config.DEPLOY_SETTINGS}
CONFIG.update(config.__dict__)

def main():
	'''Main process'''
	jinjaLoader = jinja2.FileSystemLoader(searchpath = ".")
	jinjaEnv = jinja2.Environment(trim_blocks = True, lstrip_blocks = True, loader = jinjaLoader)

	packageData = CONFIG.copy()
	for path in CONFIGURATION_FILES:
		fileTemplate = jinjaEnv.get_template(path)
		rendered = fileTemplate.render(**CONFIG)
		packageData["DEPLOY_SETTINGS"]["configuration_file_data"][path] = rendered

	packagedTemplate = jinjaEnv.get_template("configure_template.py")
	with open("configure.py", "w") as configure_file:
		configure_file.write(packagedTemplate.render(**CONFIG))

if __name__ == '__main__':
	main()
