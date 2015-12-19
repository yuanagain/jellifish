// Rushy Panchal
// jellifish
// utils.js

var jQuery = require("jQuery");

module.exports = {
	staticPath: function(path) {
		return window.DATA.static_path + "/" + path;
		},
	getElem: function(selector) {
		return jQuery(selector).get(0);
		},
	};
