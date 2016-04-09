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

/*recipes_ings is a list of javascript objects of ingredients for
separate recipes*/
function combineLikeTerms(recipes_ings)
{
  var ing_list = new Object();
  var exists_list = new Object();
  for (var i = 0; i < recipes_ings.length; i++)
  {
    for (var ing in recipes_ings[i])
    {
      if (! exists_list[ing])
      {
      	//console.log("new ingredient added");
        exists_list[ing] = true;
        ing_list[ing] = {"ing" : ing,
        				 "qty" : recipes_ings[i][ing]["quantity"],
        				 "units" : recipes_ings[i][ing]["units"]};
      }
      else
      {
      	//console.log("copy found");
      	ing_list[ing]["qty"] += recipes_ings[i][ing]["quantity"];
      }      
    }
  }
  /*ing_list is a javascript object corresponding to the 
  ingredients necessary to complete all of these recipes,
  with quantities added together*/
  return ing_list
}