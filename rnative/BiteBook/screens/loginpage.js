'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

//var Button_Native = require('react-native-button');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image
} = React;

var LoginPage = React.createClass({
  getInitialState: function() {
    return (
      {
        username: '',
        password: '',
      }
    );
  },
  render: function() {
    var {
      name,
      ...props
    } = this.props;

    return (
    <View style={styles.container}>

      <View style={styles.header_container}>

      </View>

      <View style={styles.inputs_container}>

        <TextInput
        style={styles.email_input}
        onChangeText={(username) => this.setState({username})}
        value={this.state.text}
        placeholder={"user@email.com"}
        autoCapitalize={"none"}
        />

        <TextInput
        style={styles.email_input}
        onChangeText={(password) => this.setState({password})}
        value={this.state.text}
        placeholder={"Password"}
        secureTextEntry={true}
        autoCapitalize={"none"}
        />
      </View>

      <View style={styles.buttons_container}>
        <Button
          style={styles.login_button}
          styleDisabled={{color: 'red'}}
          onPress={this._handlePress}
          >
          Login
        </Button>
      </View>
      <View style={styles.signup_container}>
      </View>
    </View>
    );
  },
  animate: function() {
    if (this.state.not_paused) {
      var progress = this.props.progress
      this.setState({ progress });
      setTimeout(() => {
        this.setState({ indeterminate: false });
        setInterval(() => {
          progress += 1/600;
          if(progress > 1) {
            progress = 1;
          }
          this.setState({ progress });
        }, 100);
      }, 100);
    }
  },

  componentDidMount: function() {
    this.animate();
  },

  _handlePress_toRecord(event) {
    this.setState({show_screen: "recordscreen"})
  },
});

var styles = StyleSheet.create({
  login_button: {
    color: 'white',
    height: windowSize.height * 1 / 10,
    width: windowSize.width,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0,
    flexDirection: 'column',
    fontSize: 40,
    textAlign: 'center',
  },
  email_input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0,
    fontSize: 40,
    textShadowColor: 'white',
    color: 'white',
    margin: 10
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#46D5B5',
    opacity: 0.92,
    margin: 0,
  },
  header_container: {
    height: windowSize.height * 6 / 10,
    width: windowSize.width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputs_container: {
    width: windowSize.width,
    height: windowSize.height * 2 / 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    opacity: 0.32,
  },
  buttons_container: {
    height: windowSize.height * 1 / 10,
    width: windowSize.width,
    backgroundColor: '#395E85',
  },
  signup_container: {
    height: windowSize.height * 1 / 10,
    width: windowSize.width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    opacity: 0.32,
  }
})

module.exports = LoginPage;
