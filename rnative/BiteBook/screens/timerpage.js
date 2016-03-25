'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');
var Timer = require('./iostimer')
import CustomStyles from '../modules/customstyles'

const _cvals = require('../modules/customvalues')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image
} = React;

var TimerPage = React.createClass({
  getInitialState: function() {
    return (
      {
        username: '',
        password: '',
        runStatus: 'running',
        index: 0
      }
    );
  },
  render: function() {
    var {
      name,
      recipeName,
      ...props
    } = this.props;

    return (
    <View style={styles.container}>
      <View>
        <View style={styles.header_container}>
          <Text style={styles.title_text}>
            {this.props.recipeName}
          </Text>
        </View>

        <View style={styles.inputs_container}>
          <Timer
            totaltime={10}
            title_text={"test title"}
            getIncrement={this.getIncrement}
            index={0}
          />
          <Timer
            totaltime={10}
            title_text={"test title"}
            getIncrement={this.getIncrement}
            size={'small'}
            index={0}
          />
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
    var totaltime = 10.0;
    if (this.state.runStatus == 'paused') {
      return 0.0
    }
    if (this.state.runStatus == 'running') {
      if (this.state.index == index) {
        return totaltime / 6000;
      }
      else {
        return 0.0
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
  inputs_container: {
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
  white_line: {
    backgroundColor: 'white',
    height: 2,
    opacity: 0.3,
    width: windowSize.width
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    width:320,
    height:480,
  },
  pause_button: {
    color: 'white',
    //height: windowSize.height * 1 / 10,
    //width: windowSize.width,
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
