// Rushy Panchal
// jellifish
// utils.js

function staticPath(path) {
	return STATIC_PATH + "/" + path;
	}

function getElem(selector) {
	return jQuery(selector).get(0);
	}

function exportFunctions(funcs) {
	for (var i = 0; i < funcs.length; i++) {
		var func = funcs[i];
		window[func.name] = func;
		}
	}
