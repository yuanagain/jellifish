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
  title_text: {
    color: 'white',
    fontSize: 30 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
    // marginTop: 30 * _cvals.dscale,
  },
  header_text: {
    color: 'black',
    fontSize: 23 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
    paddingHorizontal: 8 * _cvals.dscale,
    marginVertical: 4 * _cvals.dscale,
  },
  standard_text: {
    color: 'white',
    fontSize: 21 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
  },
  detail_text: {
    color: 'white',
    fontSize: 16 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
  },
  light_text: {
    color: 'grey',
    fontSize: 12 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
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
  title_text: {
    color: 'white',
    fontSize: 30 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
    paddingTop: 20 * _cvals.dscale,
    paddingBottom: 5,
  },
  section_header_text: {
    color: 'black',
    fontSize: 26 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
    paddingHorizontal: 10 * _cvals.dscale,
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
  left_arrow: {
    height: 28 * _cvals.dscale,
    width: 28 * _cvals.dscale,
    marginLeft: 12 * _cvals.dscale,
    paddingTop: 10
  },
  right_arrow: {
    height: 28 * _cvals.dscale,
    width: 28 * _cvals.dscale,
    marginRight: 15 * _cvals.dscale,
  },
  header_container: {
    height: _cvals.headerHeight,
    width: windowSize.width,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: _cvals.skkellygreen,
    justifyContent: 'space-between',
  },
  divider_line: {
    height: 1,
    width: windowSize.width,
    backgroundColor: 'grey',
  }
})

module.exports = CustomStyles;
