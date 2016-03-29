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

const _cvals = require('../modules/customvalues')

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
  },
  title_text: {
    color: 'white',
    fontSize: 30 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
    paddingTop: 30 * _cvals.dscale,
    paddingBottom: 5,
  },
  section_header_text: {
    color: 'black',
    fontSize: 26 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
    paddingHorizontal: 10 * _cvals.dscale,
  },
  standard_text: {
    color: 'black',
    fontSize: 20 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
  },
  header_container: {
    height: _cvals.headerHeight,
    width: windowSize.width,
    alignItems: 'center',
    backgroundColor: _cvals.skkellygreen,
    justifyContent: 'flex-end',
  },
  buttons_container: {
    width: windowSize.width,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    flex: 0,
    backgroundColor: 'transparent',
  },
  wide_button: {
    color: 'white',
    //height: windowSize.height * 1 / 10,
    //width: windowSize.width,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
    fontSize: 24 * _cvals.dscale,
    textAlign: 'center',
    backgroundColor: _cvals.skorange,
    width: windowSize.width,
    padding: 10 * _cvals.dscale,
    fontFamily: 'avenir',
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: -1}
  },
})

module.exports = CustomStyles;
