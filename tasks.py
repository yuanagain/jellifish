# Rushy Panchal
# jellifish
# fabfile.py

from invoke import task, run

import sys
import os

sys.path.append("app")
import config

STATIC_PATH = os.path.join(os.getcwd(), "static")

@task(name = "build")
def build(external = False):
	'''Run all build tasks'''
	build_react(external)
	build_sass(external)

@task(name = "build-react")
def build_react(external = False):
	'''Build ReactJS files into a single file'''
	# get dependencies from Node
	dependencies = run("""node -e 'var e=require("./package.json"); console.log(Object.keys(e.dependencies).join(" "));'""")
	if not dependencies.ok:
		raise RuntimeError("could not load dependencies from package.json")
	else:
		dependencies = dependencies.stdout.strip("\n").split(" ")

	browserify("main.js", "bundle.js", dependencies)
	if external:
		browserify("", "external.js", dependencies)

def browserify(in_path, out_path, deps):
	'''Browserify a file'''
	input_path = os.path.join(STATIC_PATH, "js", in_path)
	output_path = os.path.join(STATIC_PATH, "js", out_path)

	if in_path: # only bundle local files
		in_stream = input_path
		additional = "--no-bundle-external " + " ".join(map(lambda s: "-x " + s, deps))
	else: # bundle all external dependencies
		in_stream = ' '.join(map(lambda s: "-r " + s, deps))
		additional = ""

	command = "browserify {in_path} -t [ reactify --everything --es6 ] -o {out_path} {additional}".format(
		in_path = in_stream, out_path = output_path, additional = additional)

	run(command)

@task(name = "build-sass")
def build_sass(external = False):
	'''Compile SASS files'''
	static_path = os.path.join(os.getcwd(), "static")
	sass_path = lambda *paths: os.path.join(static_path, "sass", *paths)
	css_path = lambda *paths: os.path.join(static_path, "css", *paths)

	if external:
		run("scss --style compressed {sass_path} {css_path}".format(
			sass_path = sass_path("bootstrap.scss"),
			css_path = css_path("bootstrap.css")))
	run("scss --style compressed {sass_path} {css_path}".format(
		sass_path = sass_path("custom-styles.scss"),
		css_path = css_path("custom-styles.css")))
