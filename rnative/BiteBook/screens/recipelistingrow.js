'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
} = React;

var mainfont = 'avenir'
var rowheight = 100

// SHARED FORMATTING.
// TODO: make univeral
var lightgreen = "#7ED321"
var mainfont = 'avenir'
var skblue = '#4A90E2'

var RecipeListingRow = React.createClass({
  getInitialState: function() {
    return (
      {
        status: 0
      }
    );
  },
  render: function() {
    var {
      recipe_name,
      description_text,
      onPressDetailFunction,
      onPressSelectFunction,
      ...props
    } = this.props;

    return (
      <View>
        <View style={styles.container}>
          <View style={styles.thumbnail_container}>
            <Image
              source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
              style={styles.thumbnail}
            />
          </View>
          <View style={styles.content_container}>
            <Text
            style={styles.name_text}
            onPress={this.props.onPressSelectFunction}>
              {this.props.recipe_name}
            </Text>
            <Text style={styles.description_text}>
              {this.props.description_text}
            </Text>
          </View>
        </View>
        <View style={styles.divider_line}>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  description_text: {
    color: 'black',
    fontSize: 14,
    fontFamily: mainfont,
  },
  name_text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: mainfont,
  },
  column_r_r: {
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: windowSize.width / 2 - 10,
  },
  container: {
    flexDirection: 'row',
    height: rowheight
  },
  columns_container: {
    flexDirection: 'row',
    flex: 0,
    width: windowSize.width,
  },
  content_container: {
    margin: 5,
    height: rowheight,
    width: windowSize.width * 2 / 5
  },
  thumbnail_container: {
    height: rowheight
  },
  thumbnail: {
    height: rowheight,
    width: rowheight,
    borderRadius: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  divider_line: {
    backgroundColor: 'grey',
    height: 1,
    opacity: 0.3,
    width: windowSize.width
  },
})

module.exports = RecipeListingRow;
