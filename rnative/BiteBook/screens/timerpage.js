'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');
var Progress = require('react-native-progress');

import CustomStyles from '../modules/customstyles'
const _cvals = require('../modules/customvalues')
const _cstyles = require('../modules/customstyles')

import * as _ctools from '../libs/customtools.js'

var DummyTimer = require('../parts/dummytimer')
var DataFetcher = require('../modules/datafetcher')

var moment = require('moment')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
} = React;

var marginSize = windowSize.height / 20

var Header = require('../parts/header')

//============================

let endTask = {
  descr: '',
  end: 0,
  name: 'Done!',
  start: 0,
  time: 0.01,
};

//============================


var Dummy = React.createClass({
  render: function() {
    return (
      <View style={styles.dummy_timer_container}>
        <DummyTimer
          task={this.props.task}
        />
      </View>
    );
  }
});

var createDummyRow = (task) => <Dummy task={task} key={_ctools.randomKey()}/>;

var TimerPage = React.createClass({
  getInitialState: function() {
    return (
      {
        loaded: false,
        index: 0,
        progress: 0,
        sequence: [],
        selection: this.props.selection,
        paused: false,
      }
    );
  },

  getDefaultProps: function() {
    return ({
      selection: [],
      recipeName: "COOK",
      timerSize: windowSize.width * 5 / 7,
      fps: 10, // fps = 1000 / interval
    })
  },

  render: function() {
    var {
      name,
      recipeName,
      fetchData,
      selection,
      ...props
    } = this.props;

    if (this.getFutureTasks().length < 4) {
      this.contentsize = {width: windowSize.width, justifyContent: 'center'}
    }
    else {
      this.contentsize = {justifyContent: 'flex-start'}
    }

    var title_text = this.getCurrentTask().name

    if (this.state.loaded) {
      return (
      <View style={styles.container}>
        <View>
          <Header title={this.props.recipeName}
                  navigator={this.props.navigator} />

          <View style={styles.timers_container}>

            <View style={styles.big_timer_container}>
              <Progress.Circle
                  style={{margin: 10 * _cvals.dscale}}
                  progress={this.state.progress}
                  indeterminate={this.state.indeterminate}
                  direction="clockwise"
                  size = {this.props.timerSize}
                  color = {'orange'}
                  unfilledColor={'#EFEFEF'}
                  borderWidth={0}
                  thickness={5}
                  textStyle={styles.timer_text}
                  showsText={true}
                  formatText={(progress) => title_text + '\n' + this.getFormattedTime()}
              />
            </View>

            <View style={styles.descr}>
              <Text style={_cstyles.standard_text}>
                {this.getCurrentTask().descr}
              </Text>
            </View>

            <ScrollView
              style={[styles.scroll_container, ]}
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={[styles.scroll_content_container, this.contentsize]}
              >

              <View style={styles.scroll_timer_container}>
                {this.getFutureTasks().map(createDummyRow)}
              </View>

            </ScrollView>
          </View>
        </View>

        <View style={styles.buttons_container}>
          <Button
            style={styles.pause_button}
            styleDisabled={{color: 'grey'}}
            onPress={() => this.togglePause()}
            >
            {"Pause"}
          </Button>
        </View>
      </View> ); }

      else return (
        <View style={styles.container}>
          <View>
            <Header title={"Loading"}
                    navigator={this.props.navigator} />

          </View>
          <View style={styles.buttons_container}>
          </View>
        </View>
      );
  },

  animate: function() {
    if (this.state.paused != true) {
      setTimeout(() => {
          setInterval(() => {
          if (this.state.paused != true) {
            this.state.progress += 1 / (this.getCurrentTask_time() * this.props.fps);
          }
          if (this.state.progress >= 1) {
            // TODO Indicate to parent that we're done
            this.nextTask()
            this.state.progress = 0
          }
          this.fetchData()

          this.setState({ progress: this.state.progress })

        }, 1000 / this.props.fps);
      }, 1000 / this.props.fps);
    }
  },

  getFormattedTime: function() {
    var text,
      timeRemaining = this.getCurrentTask_time() * (1 - this.state.progress),
      momentTime = moment().set({hours: 0, minutes: 0, seconds: timeRemaining});
    if (timeRemaining > 36000) text = momentTime.format("HH:mm:ss");
    if (timeRemaining > 3600) text = momentTime.format("H:mm:ss");
    if (timeRemaining > 600) text = momentTime.format("mm:ss");
    else text = momentTime.format("m:ss");
    return text;
  },

  getIncrement: function() {
    if (this.state.paused) {
      return 0
    }
    else {
      return 1
    }
  },

  getCurrentTask_time: function() {
    return Math.abs(this.getCurrentTask().time)
  },

  getFutureTasks: function() {
    return this.state.sequence.slice(this.state.index + 1)
  },

  getCurrentTask: function() {
    if (this.state.index < this.state.sequence.length) {
      return this.state.sequence[this.state.index]
    }
    else {
      return endTask
    }
  },

  fetchData: function() {
    var data = this.props.fetchData()
    if (data == false) {
      return
    }
    else {
      // reset
      this.state.selecton = data
      this.state.progress = 0
      this.state.paused = false
      this.state.index = 0
      DataFetcher.getOptimized(this.state.selection, (data)=>this.harvestData(data))
      // this.animate()
    }
  },

  togglePause: function() {
    if (this.state.paused) {
      this.setState({paused: false})
    }
    else {
      this.setState({paused: true})
    }
  },

  resetTask: function() {
    this.setState({progress: 0})
  },

  backtrack: function() {
    this.setState({index: Math.max(0, this.state.index - 1)})
  },

  fast_forward: function() {
    this.setState({progress: 1})
  },

  // increments
  nextTask: function() {
    if (this.state.index < this.state.sequence.length) {
      this.setState({index: this.state.index + 1})
    }
  },

  updateProgress: function(progress) {
    this.state.progress = progress
  },

  getProgress: function() {
    return this.state.progress
  },

  componentDidMount: function() {
    this.fetchData()
    this.animate()
  },

  harvestData: function(task_sequence) {
    this.setState({sequence: task_sequence.active})
    this.setState({loaded: true})
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
    //height: windowSize.height * 1 / 10,
    width: windowSize.width,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0,
    backgroundColor: 'white',
  },
  pause_button: {
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    fontSize: 28 * _cvals.dscale,
    textAlign: 'center',
    backgroundColor: _cvals.skkellygreen,
    width: windowSize.width,
    padding: 5,
    fontFamily: _cvals.mainfont,
    shadowRadius: 4,
    shadowColor: _cvals.skkellygreen,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 3}
  },
  scroll_timer_container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  timer_text: {
    color: 'white',
    fontSize: 50 * _cvals.dscale,
    textAlign: 'center'
  },
  big_timer_container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent',
    margin: 0,
  },
})

module.exports = TimerPage;
