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

var Header = require('../parts/header')

var IngredientsListing = require('../screens/ingredientslisting')

var DataFetcher = require('../modules/datafetcher')

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

    return {
      recipes: [],
      selection: []
    };
  },
  render: function() {
    var {
      name,
      runApp,
      ...props
    } = this.props;

    //this.state.recipes=[] // this.state.recipes
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(this.state.recipes)

    return (
    <View style={styles.container}>
      <View style={styles.body_container}>
        <Header title={"Recipes"}
                navigator={this.props.navigator} />


        <ListView
          dataSource={dataSource}
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
          onPress={ () => this.listIngredients() }
          >
          {'Cook Selected'}
        </Button>
      </View>
    </View>
    );
  },

  runApp: function() {
    this.props.runApp(this.state.selection)
  },


  listIngredients: function() {

    this.props.navigator.push({
      id: 'ingredientslisting',
      component: IngredientsListing,
      passProps: {
        runApp: this.props.runApp,
        selection: this.state.selection
      }
    })
  },

  setData: function(data) {
    this.setState({recipes : data.recipes})
  },

  componentDidMount: function() {
    DataFetcher.getRecipes((data)=>this.setData(data))
  },

  renderListingRow(rowData) {
    return (
        <RecipeListingRow
        onSelect={this.onSelect}
        onDetail={this.onDetail}
        data={rowData}
        description_text={rowData}
        navigator={this.props.navigator}
        />
    )
  },

  onSelect: function(name) {
    // if not contained in selection
    if (this.state.selection.indexOf(name) == -1) {
      this.state.selection.push(name)
    }
    // if already contained in selection
    else {
      var index = this.state.selection.indexOf(name)
      this.state.selection.splice(index, 1)

    }
  },

  onDetail: function(data) {
    this.props.navigator.push({
      id: "RecipeDetail",
      component: RecipeDetail,
      passProps: {
        data: data,
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
