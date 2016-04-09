var Firebase = require('firebase')

function GetIngredients(recipename, callback)
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

module.exports = {GetIngredients, }
