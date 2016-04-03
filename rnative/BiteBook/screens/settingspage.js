'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');
import CustomStyles from '../modules/customstyles'

const _cvals = require('../modules/customvalues')

var PopoverSelector = require('../bigparts/popoverselector')

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
      navigator,
      ...props
    } = this.props;

    return (
    <View style={styles.container}>
      <View>
        <View style={styles.header_container}>
          <Text style={styles.title_text}>
            Settings
          </Text>
        </View>

        <View style={styles.inputs_container}>
        </View>
      </View>

      <PopoverSelector
        title={"Select Item"}
        items={['text1', 'text2', 'text3']}
        renderRow={this.renderRow}
        navigator={this.props.navigator}
        selection={[]}
        harvestSelection={this.harvestSelection}
      />

      <View style={styles.buttons_container}>
        <Button
          style={styles.save_button}
          styleDisabled={{color: 'grey'}}
          onPress={this.props.loginFunction}
          >
          Save Changes
        </Button>
      </View>

    </View>
    );
  },

  harvestSelection: function(selection) {
    console.log("SELECTION: " + String(selection))
  },

  renderRow: function(rowData) {
    return (
      <Text>{rowData}</Text>
    );
  }
});

var styles = StyleSheet.create({
  title_text: {
    color: 'white',
    fontSize: 30 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
    paddingTop: 30 * _cvals.dscale,
    paddingBottom: 5,
  },
  save_button: {
    color: 'white',
    //height: windowSize.height * 1 / 10,
    //width: windowSize.width,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    fontSize: 28 * _cvals.dscale,
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
    backgroundColor: 'transparent',
    opacity: 0.92,
    margin: 0,
  },
  header_container: {
    height: _cvals.headerHeight,
    width: windowSize.width,
    alignItems: 'center',
    backgroundColor: _cvals.skkellygreen,
    justifyContent: 'flex-end',
  },
  inputs_container: {
    width: windowSize.width,
    height: 1,
    //height: windowSize.height * 2 / 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: _cvals.skkellygreen_light,
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
  }
})

module.exports = LoginPage;
