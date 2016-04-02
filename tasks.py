# Rushy Panchal
# jellifish
# tasks.py

from invoke import task, run

import sys
import os

sys.path.append("app")
import config

STATIC_PATH = os.path.join(os.getcwd(), "static")

@task(name = "push")
def push(remote = "aws", branch = "master", f = False):
	'''Pushes files to the server
	
	Arguments
		str remote - remote to push to (default: aws)
		str branch - branch to push form (default: master)
		bool f - whether or not to force push
	'''
	if f and not config.DEV_MODE:
		print("ERROR: Cannot force push if not in dev mode.")
		return
	flags = "-f" if f else "" 
	run("git push --no-verify {remote} {branch}:master {flags}".format(
		remote = remote, branch = branch, flags = flags))

@task(name = "build")
def build(external = False):
	'''Run all build tasks

	Arguments
		bool external - whether or not to compile external dependencies
	'''
	build_react(external)
	build_sass(external)

@task(name = "build-react")
def build_react(external = False):
	'''Build ReactJS files into a single file

	Arguments
		bool external - whether or not to (separately) compile external dependencies
	'''
	# get dependencies from Node
	dependencies = run("""node -e 'var e=require("./package.json"); console.log(Object.keys(e.dependencies).join(" "));'""")
	if not dependencies.ok:
		raise RuntimeError("could not load dependencies from package.json")
	else:
		dependencies = dependencies.stdout.strip("\n").split(" ")

	# bundle custom and dependency files separately
	browserify("main.js", "bundle.js", dependencies)
	if external: # there is no main source file for bundling the external files
		browserify("", "external.js", dependencies)

def browserify(in_path, out_path, deps):
	'''Browserify a file

	Arguments
		str in_path - source input of files to bundle
		str out_path - output path of bundle
		[str] deps - list of dependency names
	'''
	input_path = os.path.join(STATIC_PATH, "js", in_path)
	output_path = os.path.join(STATIC_PATH, "js", out_path)

	if in_path: # only bundle local files
		in_stream = input_path
		if deps: # exclude external dependencies from bundling
			additional = "--no-bundle-external -x {deps}".format(deps = " -x ".join(deps))
			# by specifying certain external dependencies, we still bundle the
			# custom packages that we've created.
		else:
			additional = "--no-bundle-external"
	else: # bundle all external dependencies
		if deps: # only bundle dependencies, and nothing else
			in_stream = "-r {deps}".format(deps = " -r ".join(deps))
		else:
			in_stream = ""
		additional = ""

	command = "node_modules/.bin/browserify {in_path} -t [ reactify --everything --es6 ] -o {out_path} {additional}".format(
		in_path = in_stream, out_path = output_path, additional = additional)

	run(command)

@task(name = "build-sass")
def build_sass(external = False):
	'''Compile SASS files

	Arguments
		bool external - whether or not to (separately) compile external dependencies
	'''
	
	sass_to_css("custom-styles.scss", "custom-styles.css")
	if external:
		sass_to_css("bootstrap.scss", "bootstrap.css")

def sass_to_css(input_path, output_path):
	'''Compile a SASS file to a CSS file

	Arguments
		str input_path - source input (SCSS) of file to compile
		str output_path - output path of compiled CSS
	'''
	run("scss --style compressed {sass_path} {css_path}".format(
		sass_path = os.path.join(STATIC_PATH, "sass", input_path),
		css_path = os.path.join(STATIC_PATH, "css", output_path)
		))
