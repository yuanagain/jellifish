'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

//var Button_Native = require('react-native-button');
var windowSize = Dimensions.get('window');

var Navigator = require('Navigator');
var TimerV1 = require('./iostimer')
var LoginPage = require('./loginpage')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image
} = React;

var Login = React.createClass({
  getInitialState: function() {
    return (
      {
        username: '',
        password: '',
        logged_in: false,
        show_screen: "loginscreen"
      }
    );
  },
  render: function() {
    if (this.state.logged_in) {
      return (
      <View style={styles.container}>
        <TimerV1
          progress={0.30}
          />
      </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <LoginPage />
        </View>
      )
    }
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
  logobox: {
    margin: 10,
  },
  input: {
    left: 0,
    right: 0,
    height: 40,
    padding: 10,
    margin: 10,
    fontSize: 25
  },
  whiteFont: {
    color: "#FFF"
  },
  blackFont: {
    color: "#000"
  },
  input_container: {
    backgroundColor: "#3399ff",
    margin: 0,
    padding: 20,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputs_container: {
    justifyContent: 'center',
    marginTop: 40
  },
  buttons_container: {
    height: 80,
    marginTop: 10,
    backgroundColor: "#6699ff"
  }
})

module.exports = Login;
