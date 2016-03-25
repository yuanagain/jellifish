'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

var RecipeListingRow = require('./recipelistingrow')

var mainfont = 'avenir'
var skorange = '#F5A623'
var skblue = '#4A90E2'
var skgreen = '#46D5B5'

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ListView
} = React;

var RecipeListing = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(
        [
          {'name': 'Recipe Name 1', 'descr': 'Description 1'},
          {'name': 'Recipe Name 2', 'descr': 'Description 2'},
          {'name': 'Recipe Name 3', 'descr': 'Description 3'},
          {'name': 'Recipe Name 4', 'descr': 'Description 4'},
          {'name': 'Recipe Name 5', 'descr': 'Description 5'},
          {'name': 'Recipe Name 6', 'descr': 'Description 6'},
          {'name': 'Recipe Name 7', 'descr': 'Description 7'},
          {'name': 'Recipe Name 8', 'descr': 'Description 8'},
          {'name': 'Recipe Name 9', 'descr': 'Description 9'},
        ]
      ),
    };
  },
  render: function() {
    console.log("YO")
    var {
      name,
      ...props
    } = this.props;

    return (
    <View style={styles.container}>

      <View style={styles.header_container}>
        <Text style={styles.header_text}>
          {"Recipes"}
        </Text>
        <View style={styles.divider_line}>
        </View>
      </View>


      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderListingRow}
        style={styles.listView}
      />

      <View style={styles.divider_line}>
      </View>
    </View>
    );
  },

  renderListingRow(rowData) {
    return (
        <RecipeListingRow
        onPressFunction={() => this.onButtonPress("TEST")}
        recipe_name={rowData['name']}
        description_text={rowData['descr']}
        />
    )
  },
  onButtonPress(arg) {
    console.log(arg)
    this.props.navigator.push({
      id: "Recipe",
      component: RecipeListingRow,
      passProps: {
        matchnum: "recipe",
      }
    })
  },
});

var styles = StyleSheet.create({
  title_text: {
    color: 'black',
    fontSize: 20,
    fontFamily: mainfont,
    fontWeight: 'bold',
    padding: 10
  },
  header_text: {
    color: skgreen,
    fontSize: 20,
    fontFamily: mainfont,
    fontWeight: 'bold',
    paddingHorizontal: 10
  },
  value_text: {
    color: 'black',
    fontSize: 20,
    fontFamily: mainfont,
    padding: 10,
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    opacity: 1.00,
    marginTop: 0,
  },
  header_container: {
    width: windowSize.width,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    height: 40,
  },
  section_container: {
    width: windowSize.width,
    backgroundColor: 'transparent',
    opacity: 1.0,
  },
  divider_line: {
    backgroundColor: skgreen,
    height: 1.2,
    opacity: 0.3,
    width: windowSize.width
  },
  listView: {
    backgroundColor: 'transparent',
  }
})

module.exports = RecipeListing;
