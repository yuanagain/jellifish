var mainfont = 'avenir'
var skorange = '#F5A623'
var skblue = '#4A90E2'
var skgreen = '#46D5B5'

'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

//var Button_Native = require('react-native-button');
var windowSize = Dimensions.get('window');

var Navigator = require('Navigator');

var Progress = require('react-native-progress');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image
} = React;

var CustomDecs = React.createClass({
  lightgreen: function() { return "#7ED321"},
  mainfont: function() { return 'avenir' },
  skblue: function() { return'#4A90E2' },
  render: function() { return <View></View> }
})

/* using multiple styles: <View style={[styles.element, this.props.elementStyle]} /> */
var CustomStyles = StyleSheet.create({
  mainfont: {
    fontFamily: 'avenir'
  },
  skkellygreen: {
    color: "#7ED321"
  },
  skblue: {
    color: '#4A90E2'
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#0099D1',
    margin: 0
  },
  timer_text: {
    color: 'white'
  },
  progress: {
    margin: 10,
  },
  timer_container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  header_container: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

module.exports = CustomStyles;
