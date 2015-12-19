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
def build(all = True):
	'''Run all build tasks'''
	build_react()
	build_sass(all)

@task(name = "build-react")
def build_react():
	'''Build ReactJS files into a single file'''
	input_path = os.path.join(STATIC_PATH, "js", "main.js")
	output_path = os.path.join(STATIC_PATH, "js", "bundle.js")

	run("browserify {in_path} -t [ reactify --everything --es6 ] -o {out_path}".format(
		in_path = input_path,
		out_path = output_path
		))

@task(name = "build-sass")
def build_sass(bootstrap = False):
	'''Compile SASS files'''
	static_path = os.path.join(os.getcwd(), "static")
	sass_path = lambda *paths: os.path.join(static_path, "sass", *paths)
	css_path = lambda *paths: os.path.join(static_path, "css", *paths)

	if bootstrap:
		run("scss --style compressed {sass_path} {css_path}".format(
			sass_path = sass_path("bootstrap.scss"),
			css_path = css_path("bootstrap.css")))
	run("scss --style compressed {sass_path} {css_path}".format(
		sass_path = sass_path("custom-styles.scss"),
		css_path = css_path("custom-styles.css")))
