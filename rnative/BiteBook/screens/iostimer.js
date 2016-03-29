'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

//var Button_Native = require('react-native-button');
var windowSize = Dimensions.get('window');
var moment = require('moment')
var Navigator = require('Navigator');

var Progress = require('react-native-progress');
const _cvals = require('../modules/customvalues')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image
} = React;

let bignum = 999999999999999

var timerSizeDefault = windowSize.width * 3 / 4 * _cvals.dscale

var TimerV1 = React.createClass({
  // propTypes: {
  //   progress: PropTypes.number,
  // },
  /*
	Get the formatted time depending on the current remaining time
	Returns
		(String) format of HH:mm:ss if more than an hour remaining,
		otherwise format of mm:ss
	*/

	_getFormattedTime() {
		var text,
			timeRemaining = this.props.totaltime * this.state._progress,
			momentTime = moment().set({hours: 0, minutes: 0, seconds: timeRemaining});
		if (timeRemaining > 36000) text = momentTime.format("HH:mm:ss");
    if (timeRemaining > 3600) text = momentTime.format("H:mm:ss");
    if (timeRemaining > 600) text = momentTime.format("mm:ss");
		else text = momentTime.format("m:ss");
		return text;
	},

  getInitialState: function() {
    return (
      {
        username: '',
        // progress: 0.3,
        indeterminate: false,
        _progress: 0.0,
        not_paused: true,
      }
    );
  },
  render: function() {
    var {
      totaltime,
      getIncrement,
      title_text,
      size,
      index,
      dead,
      ...props
    } = this.props;

    if (this.props.size == 'small') {
      this.timerSize = 100 * _cvals.dscale
      this.timerTextSize = styles.timer_text_small
    }
    else {
      this.timerSize = timerSizeDefault
      this.timerTextSize = styles.timer_text
    }

    return (
    <View style={styles.container}>
      <View style={styles.timer_container}>
        <Progress.Circle
            style={styles.progress}
            progress={this.state._progress}
            indeterminate={this.state.indeterminate}
            direction="clockwise"
            size ={this.timerSize}
            color={'orange'}
            unfilledColor={'#EFEFEF'}
            borderWidth={0}
            thickness={5}
            textStyle={this.timerTextSize}
            showsText={true}
            formatText={(progress) => title_text + '\n' + this._getFormattedTime()}
          />
        </View>
    </View>
    );
  },

  animate: function() {
    if (this.state.not_paused) {
      var _progress = this.state._progress
      this.setState({ _progress });
      setTimeout(() => {
        this.setState({ indeterminate: false });
          setInterval(() => {
          _progress += this.props.getIncrement(this.props.index) / this.intervalCt;
          if(_progress > 1) {
            _progress = 1;
          }
          this.setState({ _progress });
          if (this.props.dead) {
            this.setState({not_paused: false})
            console.log('paused2')
            return
          }
        }, this.interval);
      }, this.interval);
    }
  },

  componentDidMount: function() {
    this.interval = 100
    this.intervalCt = this.props.totaltime * 1000 / this.interval
    // if (this.props.dead) {
    //   this.state.not_paused = false
    // }
    this.animate();
  },

  _handlePress_toRecord(event) {
    this.setState({show_screen: "recordscreen"})
  },
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent',
    margin: 0,
  },
  timer_text: {
    color: 'white',
    fontSize: 50 * _cvals.dscale,
    textAlign: 'center'
  },
  timer_text_small: {
    color: 'white',
    fontSize: 20 * _cvals.dscale,
    textAlign: 'center'
  },
  progress: {
    margin: 10 * _cvals.dscale,
  },
  timer_container: {
    alignItems: 'center',
    justifyContent: 'center'
  },


})

module.exports = TimerV1;