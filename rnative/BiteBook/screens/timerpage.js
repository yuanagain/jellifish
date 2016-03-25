'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');
var Timer = require('./iostimer')
import CustomStyles from '../modules/customstyles'

const _cvals = require('../modules/customvalues')
let small_num = 0.0000000000000000000000000000001
var tdata = []//['title1', 'title2', 'title3', 'title3', 'title4']

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
} = React;

var Thumb = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return false;
  },
  render: function() {
    return (
      <View style={styles.timer_container}>
        <Timer
          totaltime={10}
          title_text={this.props.title_text}
          getIncrement={this.props.getIncrement}
          size={'small'}
          index={1}
        />
      </View>
    );
  }
});

var createThumbRow = (text) => <Thumb title_text={text} getIncrement={getIncrement}/>;

var getIncrement = function() {
  return 0.000000000000000001
}

var TimerPage = React.createClass({
  getInitialState: function() {
    return (
      {
        username: '',
        password: '',
        runStatus: 'running',
        backgroundTimerCt: 4,
        index: 0,
      }
    );
  },
  render: function() {
    var {
      name,
      recipeName,
      ...props
    } = this.props;

    if (this.state.backgroundTimerCt < 4) {
      this.contentsize = {width: windowSize.width, justifyContent: 'center'}
    }
    else {
      this.contentsize = {}
    }

    return (
    <View style={styles.container}>
      <View>
        <View style={styles.header_container}>
          <Text style={styles.title_text}>
            {this.props.recipeName}
          </Text>
        </View>

        <View style={styles.timers_container}>
          <Timer
            totaltime={100}
            title_text={"test title"}
            getIncrement={this.getIncrement}
            index={0}
          />
          <ScrollView
            style={[styles.scroll_container, ]}
            horizontal={true}
            contentContainerStyle={[styles.scroll_content_container, this.contentsize]}
            showsHorizontalScrollIndicator={true}
            >
            <View style={styles.timer_container}>
              {tdata.map(createThumbRow)}
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
          Pause
        </Button>
      </View>
    </View>
    );
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
        return small_num
      }
    }
  },
});

var styles = StyleSheet.create({
  title_text: {
    color: 'white',
    fontSize: 30,
    fontFamily: _cvals.mainfont,
    paddingTop: 30,
    paddingBottom: 5,
  },
  timer_container: {
    margin: 10,
  },
  email_input: {
    height: 20,
    borderWidth: 0,
    fontSize: 20,
    textShadowColor: 'white',
    color: 'white',
    margin: 15,
    marginVertical: 18,
    fontFamily: _cvals.mainfont,
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: _cvals.skteal,
    opacity: 0.92,
    margin: 0,
  },
  header_container: {
    // height: windowSize.height * 6 / 10,
    width: windowSize.width,
    alignItems: 'center',
    backgroundColor: _cvals.skkellygreen,
    justifyContent: 'flex-end',
  },
  scroll_container: {
    flex: 1,
    marginTop: 40,
    height: 140
  },
  scroll_content_container: {
    flex: 1,
    width: windowSize.width,
    flex: 0,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  timers_container: {
    marginTop: 40,
    width: windowSize.width,
    //height: windowSize.height * 2 / 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: _cvals.skteal,
    opacity: 1.0,
  },
  buttons_container: {
    //height: windowSize.height * 1 / 10,
    width: windowSize.width,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    width:320,
    height:480,
  },
  pause_button: {
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    fontSize: 28,
    textAlign: 'center',
    backgroundColor: _cvals.sknavy,
    width: windowSize.width,
    padding: 5,
    fontFamily: _cvals.mainfont,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 3}
  },
})

module.exports = TimerPage;
