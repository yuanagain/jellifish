'use strict';

var React = require('react-native');


var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image
} = React;


function isNumeric (n) {
  return (!isNaN(parseFloat(n)) && isFinite(n))
}

function isValidScore(n) {
  if (isNumeric(n)) {
    if (n >= 0) {
      return true
    }
  }
  return false
}

function upplementIndex(items) {
  indexedItems = []
  for (var i = 0; i < items.length; i++) {
    indexedItems.push({'index': i, 'item': items[i]})
  }
  return indexedItems
}

function stripIndex(indexedItems) {
  items = []
  for (var i = 0; i < indexedItems.length; i++) {
    items.push(indexedItems[i]['item'])
  }
}

function indexOf(haystack, needle) {
  for (var i = 0; i < haystack.length, i++) {
      if (needle == haystack[i]) { return i }
  }
  return -1
}

function contains(haystack, needle) {
  return (indexOf(haystack, needl) != -1)
}

function inRange(n, min, max) {
  if (n > max) { return false }
  if (n < min) { return false }
  return true
}

module.exports = [isNumeric];
