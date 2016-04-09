'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

var moment = require('moment')

var _cvals = require('../modules/customvalues')
var _cstyles = require('../modules/customstyles')
import * as _ctools from '../libs/customtools.js'

var {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    TextInput,
    Image
  } = React;

var timerSizeDefault = windowSize.width * 3 / 4 * _cvals.dscale

var DummyTimer = React.createClass({

  	_getFormattedTime() {
  		var text,
  			timeRemaining = Math.abs(this.props.task.time) * (1 - this.state.progress),
  			momentTime = moment().set({hours: 0, minutes: 0, seconds: timeRemaining});
  		if (timeRemaining > 36000) text = momentTime.format("HH:mm:ss");
      if (timeRemaining > 3600) text = momentTime.format("H:mm:ss");
      if (timeRemaining > 600) text = momentTime.format("mm:ss");
  		else text = momentTime.format("m:ss");
  		return text;
  	},

    getInitialState: function() {
      var radius = this.props.timerSize
      var bd_width = 9 * _cvals.dscale
      return (
        {

          progress: 0.0,
          not_paused: true,
          radius: radius,

          circle_big: {
            height: radius,
            width: radius,
            borderRadius: radius / 2,
            backgroundColor: 'orange',
          },

          circle_small: {
            height: radius - bd_width,
            width: radius - bd_width,
            borderRadius: (radius - bd_width) / 2,
            backgroundColor: _cvals.sknavy,
          },

        }
      );
    },

    getDefaultProps: function() {
      return (
        {
          timerSize: 70 * _cvals.dscale,
        }
      )
    },

    render: function() {
      var {
        totaltime,
        title_text,
        size,
        index,
        ...props
      } = this.props;

      return (
      <View style={styles.container}>
        <View style={[this.state.circle_big, styles.circle_big]}>
          <View style={[this.state.circle_small, styles.circle_big]}>

            <Text style={_cstyles.detail_text}>
              {this._getFormattedTime()}
            </Text>
          </View>
        </View>
        <View style={styles.descr}>
          <Text style={_cstyles.detail_text}
                numberOfLines={2} >
            {this.props.task.name}
          </Text>
        </View>
      </View>
      );
    },

    componentDidMount: function() {
    },
});

var styles = StyleSheet.create({
    descr: {
      flexDirection: 'column',
      justifyContent: 'center',
      height: 55 * _cvals.dscale
    },
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent',
      margin: 0,
      alignItems: 'center',
      width: _cvals.dscale * 80,
    },
    timer_text_small: {
      color: 'white',
      fontSize: 20 * _cvals.dscale,
      textAlign: 'center',
      marginTop: 5 * _cvals.dscale,
    },
    circle_big: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    timer_container: {
      alignItems: 'center',
      justifyContent: 'center'
    },
})

module.exports = DummyTimer;
