var Firebase = require('firebase')

function GetImage(recipename, callback)
{
	// Get a database reference to our posts
	var ref = new Firebase("https://jellifish.firebaseio.com/");
	// Attach an asynchronous callback to read the data at our posts reference
	ref.child(recipename).on("value", function(snapshot)
	{
		/*
		  var recipe = snapshot.val();
		  for (var ing in recipe) 
		  	{
		    	if (recipe.hasOwnProperty(ing))
		    	{
		    		console.log(ing);
		    	}
			}
		*/
	    //console.log(snapshot.val());
	    callback(snapshot.val());
		// return snapshot.val();
	},
	function (errorObject) 
	{
	  //console.log("The read failed: " + errorObject.code);
	  alert("The read failed: " + errorObject.code);
	});
}


module.exports = {GetImage, }