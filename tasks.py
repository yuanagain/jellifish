# Rushy Panchal
# jellifish
# fabfile.py

from invoke import task, run

import sys
import os

sys.path.append("app")
import config

@task(name = "build")
def build():
	'''Run all build tasks'''
	build_react()
	build_sass()

@task(name = "build-react")
def build_react():
	'''Build ReactJS files into a single file'''
	static_path = os.path.join(os.getcwd(), "static")
	react_path = os.path.join(static_path, "react")

	combined_file = open(os.path.join(static_path, "js", "react-components.jsx"), "w")

	for path in os.listdir(react_path):
		with open(os.path.join(react_path, path)) as open_file:
			combined_file.write(open_file.read() + "\n")

	combined_file.close()

@task(name = "build-sass")
def build_sass():
	'''Compile SASS files'''
	static_path = os.path.join(os.getcwd(), "static")
	sass_path = lambda *paths: os.path.join(static_path, "sass", *paths)
	css_path = lambda *paths: os.path.join(static_path, "css", *paths)

	run("scss --style compressed {sass_path} {css_path}".format(
		sass_path = sass_path("bootstrap.scss"),
		css_path = css_path("bootstrap.css")))
	run("scss --style compressed {sass_path} {css_path}".format(
		sass_path = sass_path("custom-styles.scss"),
		css_path = css_path("custom-styles.css")))
