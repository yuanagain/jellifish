'use strict'
var React = require('react-native');

var {
  Image,
} = React;

// TODO change to app server URL
var BASE_URL = "http://app.jelli.fish/api/";
var HEADERS = {'Accept': 'application/json', 'Content-Type': 'application/json'};

// Login/load user data


// Show recipes (in a cookbook, eventually)

/*
* Get the list of recipes from the backend.
* Parameters
*	Function callback - function for when the request finishes
*		Object data - JSON data received from server
*/

// TODO return with descriptions.
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

function fetchFBing(recipename, callback)
{
	// Get a database reference to our posts
	var ref = new Firebase("https://jellifish.firebaseio.com/");
	// Attach an asynchronous callback to read the data at our posts reference
	ref.child(recipename).on("value", function(snapshot)
	{
	    callback(snapshot.val());
	},
	function (errorObject) 
	{
	  alert("The read failed: " + errorObject.code);
	});
}

module.exports = {
	getRecipes: getRecipes,
	getOptimized: getOptimized
	}
