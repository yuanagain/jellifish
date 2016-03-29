'use strict'
var React = require('react-native');

var {
  Image,
} = React;

// TODO change to app server URL
var BASE_URL = "http://localhost:8080/api/";
var HEADERS = {'Accept': 'application/json', 'Content-Type': 'application/json'};

// Login/load user data


// Show recipes (in a cookbook, eventually)

/*
* Get the list of recipes from the backend.
* Parameters
*	Function callback - function for when the request finishes
*		Object data - JSON data received from server
*/
function getRecipes(callback) {
	fetch(BASE_URL + "/list/", {
		headers: HEADERS
		}).then((res) => res.json()).then(callback);
	} 

/*
* Get the optimized ordering of a list of recipes.
* Parameters
*	[String...] recipes - list of recipes to optimize
*	Function callback - function for when the request finishes
*		Object data - JSON data received from server
*/
function getOptimized(recipes, callback) {
	fetch(BASE_URL + "/tasks/", {
		method: 'POST',
		headers: HEADERS,
		body: JSON.stringify({
			recipes: recipes
			})
		}).then((res) => res.json()).then(callback);
	}
