'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

var RecipeListingRow = require('./recipelistingrow')

var _cvals = require('../modules/customvalues')

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

var RecipeDetail = require('./recipedetail')

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
      selected: []
    };
  },
  render: function() {
    var {
      name,
      runApp,
      ...props
    } = this.props;

    return (
    <View style={styles.container}>
      <View style={styles.body_container}>
        <View style={styles.header_container}>
          <Text style={styles.title_text}>
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
      <View style={styles.buttons_container}>
        <Button
          style={styles.button}
          styleDisabled={{color: 'grey'}}
          onPress={this.props.runApp.bind(this, this.state.selected)}
          >
          {'Cook Selected!'}
        </Button>
      </View>
    </View>
    );
  },

  componentDidMount: function() {
    console.log(windowSize.height)
  },

  runApp: function() {
    this.props.runApp('arg')
  },

  renderListingRow(rowData) {
    return (
        <RecipeListingRow
        onSelect={this.onSelect}
        onDetail={this.onDetail}
        name={rowData['name']}
        description_text={rowData['descr']}
        />
    )
  },

  onSelect: function(name) {
    // if not contained in selection
    if (this.state.selected.indexOf(name) == -1) {
      this.state.selected.push(name)
    }
    // if already contained in selection
    else {
      var index = this.state.selected.indexOf(name)
      this.state.selected.splice(index, 1)

    }
    console.log(this.state.selected)
  },

  onDetail: function(name) {
    console.log(name)
    this.props.navigator.push({
      id: "RecipeDetail",
      component: RecipeDetail,
      passProps: {
        name: name,
        imageLink: 'http://facebook.github.io/react/img/logo_og.png',
        descr: "Description Text",
        goBack: this.goBack,
      }
    })
  },

  goBack: function() {
    this.props.navigator.pop()
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
  header_text: {
    color: 'white',
    fontSize: 30 * _cvals.dscale,
    fontFamily: mainfont,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginVertical: 5 * _cvals.dscale,
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
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    opacity: 1.00,
    margin: 0,
  },
  body_container: {
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
    backgroundColor: _cvals.skkellygreen,
    height: _cvals.headerHeight,
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
  },
  buttons_container: {
      //height: windowSize.height * 1 / 10,
      width: windowSize.width,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 0,
      backgroundColor: 'transparent',
    },
    button: {
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
})

module.exports = RecipeListing;
