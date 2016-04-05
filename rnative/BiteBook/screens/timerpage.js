'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');
var Timer = require('./iostimer')

import CustomStyles from '../modules/customstyles'
const _cvals = require('../modules/customvalues')
const _cstyles = require('../modules/customstyles')

import * as _ctools from '../libs/customtools.js'

var DummyTimer = require('../parts/dummytimer')
var DataFetcher = require('../modules/datafetcher')

let small_num = 0.0000000000000000000000000000001

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


var Thumb = React.createClass({
  render: function() {
    return (
      <View style={styles.timer_container}>
        <DummyTimer
          totaltime={10}
          title={this.props.title}
          getIncrement={this.props.getIncrement}
          size={'small'}
          dead={true}
          index={1}
        />
      </View>
    );
  }
});

var createThumbRow = (data) => <Thumb title={data.name}
                                      getIncrement={getIncrement}
                                      key={_ctools.randomKey()}/>;


var getIncrement = function() {
  return small_num
}

var TimerPage = React.createClass({
  getInitialState: function() {
    return (
      {
        loaded: false,
        runStatus: 'running',
        index: 0,
        dummyData: "hello",
        selection: this.props.selection,
        progress: 0,
        sequence: [],
        currentTask: {
          descr: 'No Task Selected',
          end: 0,
          name: 'Wait',
          start: 0,
          time: 0.1,
        },
      }
    );
  },

  getDefaultProps: function() {
    return ({
      selection: [],
      recipeName: "COOK"
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

    if (this.state.sequence.slice(this.state.index + 1).length < 4) {
      this.contentsize = {width: windowSize.width, justifyContent: 'center'}
    }
    else {
      this.contentsize = {justifyContent: 'flex-start'}
    }

    var currentTask = endTask
    if (this.state.index < this.state.sequence.length) {
      currentTask = this.state.sequence[this.state.index]
    }

    if (this.state.loaded) {
      return (
      <View style={styles.container}>
        <View>
          <Header title={this.props.recipeName}
                  navigator={this.props.navigator} />

          <View style={styles.timers_container}>

            <Timer
              totaltime={Math.abs(currentTask.time)}
              title_text={currentTask.name}
              getIncrement={this.getIncrement}
              progress={0}
              index={this.state.index}
              nextTask={this.nextTask}
              updateProgress={this.updateProgress}
              getTotalTime={this.getTotalTime}
            />
            <View style={styles.descr}>
              <Text style={_cstyles.standard_text}>
                {currentTask.descr}
              </Text>
            </View>

            <ScrollView
              style={[styles.scroll_container, ]}
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={[styles.scroll_content_container, this.contentsize]}
              >
              <View style={styles.timer_container}>
                {this.state.sequence.slice(this.state.index + 1).map(createThumbRow)}
              </View>
            </ScrollView>
          </View>
        </View>
        <View style={styles.buttons_container}>
          <Button
            style={styles.pause_button}
            styleDisabled={{color: 'grey'}}
            onPress={()=>this.togglePause()}
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

  // increments
  nextTask: function() {
    if (this.state.index < this.state.sequence.length) {
      this.setState({index: this.state.index + 1})
    }
    console.log("NEXT TASK")
  },

  updateProgress: function(progress) {
    this.state.progress = progress
  },

  getProgress: function() {
    return this.state.progress
  },

  getTotalTime: function() {
    return this.state.sequence[this.state.index].time
  },

  componentDidMount: function() {
    // console.log(this.props.fetchData);
    DataFetcher.getOptimized(this.state.selection, (data)=>this.harvestData(data))

  },

  harvestData: function(task_sequence) {
    this.setState({sequence: task_sequence.active})
    this.setState({loaded: true})
  },


  togglePause: function() {
    if (this.state.runStatus == 'paused') {
      this.setState({runStatus: 'running'})
    }
    else if (this.state.runStatus == 'running') {
      this.setState({runStatus: 'paused'})
    }
  },

  getIncrement: function(index) {
    if (this.state.runStatus == 'paused') {
      return small_num
    }
    if (this.state.runStatus == 'running') {
      if (this.state.index == index) {
        return 1;
      }
      else {
        return small_num;
      }
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
  timer_container: {
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
    borderTopWidth: 1,
    borderColor: 'white',
  },
  scroll_content_container: {
    flexDirection: 'row',
    flex: 1,
    //width: windowSize.width,
    alignItems: 'center',
    justifyContent: 'center',
    //height: 100 * _cvals.dscale,

    // justifyContent: 'center',
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
})

module.exports = TimerPage;
