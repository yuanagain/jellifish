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

var timerSizeDefault = windowSize.width * 5 / 7

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
			timeRemaining = this.props.task.time * (1 - this.state.progress),
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
        progress: 0,
        not_paused: true,
      }
    );
  },

  getDefaultProps: function() {
    return (
      {
        progress: 0,
      }
    )
  },
  render: function() {
    var {
      totaltime,
      getIncrement,
      title_text,
      size,
      index,
      getProgress,
      nextTask,
      updateProgress,
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
      var _progress = this.props.getProgress()
      this.setState({ _progress });
      setTimeout(() => {
          setInterval(() => {
          _progress += this.props.getIncrement(this.props.index) / this.getIntervalCt();
          if(_progress >= 1) {
            // TODO Indicate to parent that we're done
            this.props.nextTask()
            _progress = 0
          }

          if (this.fetchData() != true) {
            this.setState({ _progress})
          }

        }, this.interval);
      }, this.interval);
    }
  },

  fetchData: function() {
    if (this.props.fetchData()) {
      this.setState({ _progress : 0})
      console.log(this.state._progress)
      return true
    }
    return false
  },

  getIntervalCt: function() {
    return this.props.totaltime * 1000 / this.interval
  },

  componentDidMount: function() {
    this.setState({ indeterminate: false });
    this.interval = 100
    this.animate();
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
