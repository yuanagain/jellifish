var db = require("firebase");

db = new Firebase("");

function _GetIngredients(id, callback) {
    var promise = new Promise(function(resolve, reject) {
        matchdb.child(id).on("value", function(snapshot) {
          var data = snapshot.val();
          resolve(data);
        });
     });
    promise.then(function(value){
      callback(value);
    }).catch(function(){
      console.log("Failed");
    });
}

module.exports = {_GetIngredients};
