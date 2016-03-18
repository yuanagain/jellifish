// Rushy Panchal
// jellifish
// utils.js - basic utility functions

var jQuery = require("jquery");

module.exports = {
	/*
	Get the static path of a file

	Parameters
		String path - path to append to static base

	Returns
		(String) full static path

	Examples
		// Get the base static path
		utils.staticPath("") // => "/static/"

		// Get a full static path
		utils.staticPath("utils.js") => "/static/utils.js"
	*/
	staticPath: function(path) {
		return window.DATA.static_path + "/" + path;
		},
	
	/*
	Get an elem with a jQuery selector

	Parameters
		String selector - selector in the form of jQuery

	Returns
		(HTMLElement) first matched element

	Examples
		// Get an element by id
		utils.getElem("#element-id")

		// Get an element by class name
		utils.getElem(".class")
	*/
	getElem: function(selector) {
		return jQuery(selector).get(0);
		},
	};
