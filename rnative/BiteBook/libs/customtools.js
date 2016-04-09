'use strict';

var _const = require('./constants')

var isNumeric = function (n) {
  return (!isNaN(parseFloat(n)) && isFinite(n))
}

var isValidScore = function(n) {
  if (isNumeric(n)) {
    if (n >= 0) {
      return true
    }
  }
  return false
}

var supplementIndex = function(items) {
  var indexedItems = []
  for (var i = 0; i < items.length; i++) {
    indexedItems.push({'index': i, 'item': items[i]})
  }
  return indexedItems
}

var stripIndex = function(indexedItems) {
  var items = []
  for (var i = 0; i < indexedItems.length; i++) {
    items.push(indexedItems[i]['item'])
  }
}

var indexOf = function(haystack, needle) {
  for (var i = 0; i < haystack.length; i++) {
      if (needle == haystack[i]) { return i }
  }
  return -1
}

var contains = function(haystack, needle) {
  return (indexOf(haystack, needle) != -1)
}

var inRange = function(n, min, max) {
  if (n > max) { return false }
  if (n < min) { return false }
  return true
}

/*
takes list of indices, recovers corresponding list
of items
*/
var traceIndices = function(haystack, indices) {
  var items = []
  for (var i = 0; i < indices.length; i++) {
    items.push(haystack[indices[i]])
  }
  return items
}

/*
takes list of item, recovers corresponding list
of indices
*/
var selectionNeedles = function(haystack, needles) {
  var indices = []
  for (var i = 0; i < needles.length; i++) {
    var index = indexOf(haystack, needles[i])
    indices.push(i)
  }
  return indices
}

var randomKey = function() {
  return Math.random(1, _const.bignum)
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

module.exports = {indexOf, supplementIndex, contains, inRange,
                  traceIndices, isValidScore, randomKey,
                  selectionNeedles, combineLikeTerms};
