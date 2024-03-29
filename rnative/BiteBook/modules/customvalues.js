/*
This module contains standard custom styling data for all apps
*/
'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

const _cvals = {
  mainfont: 'avenir',
  titlefont: 'chalkduster',
  skorange: '#F5A623',
  skblue: '#4A90E2',
  sknavy: '#395E85',
  skteal: "#0099D1",
  skkellygreen: "#46D5B5",
  skkellygreen_light: '#83e2cd',
  headerTextSize: 24,
  normalTextSize: 20,
  detailTextSize: 14,
  dscale: windowSize.height / 667,
  headerHeight: 50 * this.dscale
}



module.exports = _cvals;
