'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');
var Progress = require('react-native-progress');

import CustomStyles from '../modules/customstyles'
const _cvals = require('../modules/customvalues')
const _cstyles = require('../modules/customstyles')

var TimerPage = require('../screens/timerpage')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} = React;

var marginSize = windowSize.height / 20

var Header = require('../parts/header')


var TimerPageSwitch = React.createClass({
  getInitialState: function() {
    return (
      {
        ran: false,
      }
    );
  },

  render: function() {
    var {
      ran,
      name,
      recipeName,
      fetchData,
      selection,
      ...props
    } = this.props;


    if (this.props.ran) {
      return (
            <TimerPage
              fetchData={this.props.fetchData}
              recipeName={this.props.recipeName}
              selection={this.props.selection}
            />
      );
    }

    else {
      return (
        <View style={styles.container}>
          <View>
            <Header title={"Loading"}
                    navigator={this.props.navigator} />

          </View>
          <View style={styles.buttons_container}>
          </View>
        </View>
      );
    }
  },
});

var styles = StyleSheet.create({
  title_text: {
    color: 'white',
    fontSize: 30 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
    paddingTop: 30 * _cvals.dscale,
    paddingBottom: 5,
  },
  dummy_timer_container: {
    flexDirection: 'row',
    margin: 10 * _cvals.dscale,
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: _cvals.sknavy,
    opacity: 0.92,
    margin: 0,
  },
  scroll_container: {
    flex: 1,
    marginTop: 0 * _cvals.dscale,
    height: 130 * _cvals.dscale,
    width: windowSize.width,
    borderTopWidth: 0,
    borderColor: 'white',

  },
  scroll_content_container: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descr: {
    marginHorizontal: 10 * _cvals.dscale,
    height: windowSize.width * 0.18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descrContainer: {
    height: windowSize.width * 0.18,
    width: windowSize.width,
  },
  timers_container: {
    marginTop: 10 * _cvals.dscale,
    width: windowSize.width,
    //height: windowSize.height * 2 / 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    opacity: 1.0,
  },
  buttons_container: {
    flexDirection: 'row',
    width: windowSize.width,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0,
    backgroundColor: _cvals.skkellygreen,
  },
  pause: {
    height: 33 * _cvals.dscale,
    width: 33 * _cvals.dscale,
    margin: 13 * _cvals.dscale,
    marginHorizontal: 23 * _cvals.dscale
  },
  scroll_timer_container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  timer_text: {
    color: 'white',
    fontSize: 40 * _cvals.dscale,
    textAlign: 'center'
  },
  big_timer_container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent',
    margin: 0,
  },
})

module.exports = TimerPageSwitch;
