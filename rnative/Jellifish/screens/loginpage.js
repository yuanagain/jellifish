'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
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
      loginFunction,
      ...props
    } = this.props;

    return (
    <View style={styles.container}>

      <View style={styles.header_container}>
        <View style={styles.logowrap}>
          <Image source={require('../assets/logo.png')}
                 style={styles.logo} />
        </View>

      </View>

      <View style={styles.inputs_container}>

        <TextInput
        style={styles.email_input}

        onChangeText={(username) => this.setState({username})}

        value={this.state.username}
        placeholder={"user@email.com"}
        autoCapitalize={"none"}
        />

        <View style={styles.white_line}>
        </View>

        <TextInput
        style={styles.email_input}

        onChangeText={(password) => this.setState({password})}

        value={this.state.password}
        placeholder={"Password"}
        secureTextEntry={true}
        autoCapitalize={"none"}
        />
      </View>

      <View style={styles.buttons_container}>
        <Button
          style={styles.login_button}
          styleDisabled={{color: 'grey'}}
          onPress={this.props.loginFunction}
          >
          Sign In
        </Button>
        <Button
          style={styles.signup_button}
          styleDisabled={{color: 'grey'}}
          onPress={this._handlePress}
          >
          New user? Sign Up!
        </Button>
      </View>

    </View>
    );
  },
});

var styles = StyleSheet.create({
  logo: {
    width: 230,
    height: 230,
    marginBottom: 10,
  },  
  logowrap: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  title_text: {
    color: 'white',
    fontSize: 50,
    fontFamily: 'chalkduster',
    padding: 24
  },
  login_button: {
    color: 'white',
    //height: windowSize.height * 1 / 10,
    //width: windowSize.width,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    fontSize: 40,
    textAlign: 'center',
    backgroundColor: '#395E85',
    width: windowSize.width,
    padding: 15,
    fontFamily: 'chalkduster',
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 3}
  },
  signup_button: {
    fontSize: 20,
    opacity: 1,
    color: 'white',
    padding: 5,
    margin: 10,
    fontFamily: 'avenir',
  },
  email_input: {
    height: 40,
    borderWidth: 0,
    fontSize: 34,
    textShadowColor: 'white',
    color: 'white',
    margin: 15,
    marginVertical: 18,
    fontFamily: 'avenir',
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: '#46D5B5',
    opacity: 0.92,
    margin: 0,
  },
  header_container: {
    // height: windowSize.height * 6 / 10,
    width: windowSize.width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputs_container: {
    width: windowSize.width,
    //height: windowSize.height * 2 / 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#83e2cd',
    opacity: 1.0,
  },
  buttons_container: {
    //height: windowSize.height * 1 / 10,
    width: windowSize.width,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0,
    backgroundColor: '#83e2cd',
    // shadowRadius: 4,
    // shadowColor: 'black',
    // shadowOpacity: 0.5,
    // shadowOffset: {width: 0, height: 0}
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
  }
})

module.exports = LoginPage;
