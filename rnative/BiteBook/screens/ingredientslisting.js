'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');
var _cvals = require('../modules/customvalues')
var _cstyles = require('../modules/customstyles')

var Header = require('../parts/header')

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

var IngredientsListing = React.createClass({
  getInitialState: function() {

    return {
      
    };
  },

  getDefaultProps: function() {
    return (
      {
        ingredients: [[1, 'oz', 'milk'], [400, 'grams', 'whole wheat flour']],
        runApp: function() {
          console.log("running app")
        },
      })
  },

  render: function() {
    console.log(this.props.ingredients)
    var {
      ingredients,
      runApp,
      ...props
    } = this.props;

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(this.props.ingredients)

    return (
    <View style={styles.container}>
      <View style={styles.body_container}>
        <Header title={"Ingredients"}
                mode={'nav'}
                navigator={this.props.navigator} />


        <ListView
          dataSource={dataSource}
          renderRow={this.renderRow}
          style={styles.listView}
        />

        <View style={styles.divider_line}>
        </View>
      </View>
      <View style={styles.buttons_container}>
        <Button
          style={styles.button}
          styleDisabled={{color: 'grey'}}
          onPress={()=>this.runApp()}
          >
          {"I'm ready. Let's Cook!"}
        </Button>
      </View>
    </View>
    );
  },

  runApp: function() {
    this.props.runApp()
    this.goBack()
  },

  setData: function(data) {
    this.setState({recipes : data.recipes})
  },

  componentDidMount: function() {
    DataFetcher.getRecipes((data)=>this.setData(data))
  },

  runApp: function() {
    this.props.runApp('arg')
  },

  renderRow(rowData) {
    return (
        <View style={styles.rowStyle}>
          <View style={styles.rowPart}>
            <Text style={_cstyles.standard_text_black}>
              {rowData[0]}
            </Text>
          </View>

          <View style={styles.rowPart2}>
            <Text style={_cstyles.standard_text_black}>
              {rowData[1]}
            </Text>
          </View>
          
          <View style={styles.rowPart3}>
            <Text style={_cstyles.standard_text_black}>
              {rowData[2]}
            </Text>
          </View>

        </View>
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

  goBack: function() {
    this.props.navigator.pop()
  }
});

var styles = StyleSheet.create({
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
    backgroundColor: _cvals.skgreen,
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

    rowStyle: {
      marginHorizontal: 10 * _cvals.dscale,
      marginVertical: 5 * _cvals.dscale,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: windowSize.width,
    },

    rowPart: {
      marginHorizontal: 5 * _cvals.dscale,
      width: 20 * _cvals.dscale,
      flexDirection: 'row',
      justifyContent: 'center',

    },

    rowPart2: {
      marginHorizontal: 5 * _cvals.dscale,
      width: 80 * _cvals.dscale,
      flexDirection: 'row',
      justifyContent: 'center',

    },

    rowPart3: {
      marginHorizontal: 5 * _cvals.dscale,
      marginLeft: 10 * _cvals.dscale,
      flexDirection: 'row',
      justifyContent: 'flex-start',

    }

})

module.exports = IngredientsListing;
