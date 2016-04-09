'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');
var _cvals = require('../modules/customvalues')
var _cstyles = require('../modules/customstyles')
import * as _ctools from '../libs/customtools'

var Header = require('../parts/header')

var DataFetcher = require('../modules/datafetcher')
var FBaseFetcher = require('../modules/firebasefetcher')

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

      ingredients: [['Loading', 'Loading', 0]],
    };
  },

  getDefaultProps: function() {
    return (
      {
        
      })
  },

  render: function() {
    var {
      ingredients,
      runApp,
      ...props
    } = this.props;

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(_ctools.listify(this.state.ingredients))

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
          onPress={ () => this.props.runApp(this.props.selection) }
          >
          {"I'm ready. Let's Cook!"}
        </Button>
      </View>
    </View>
    );
  },

  runApp: function() {
  },

  setData: function(data) {
    this.setState({ingredients : data})
    console.log(data)
  },

  componentDidMount: function() {
    FBaseFetcher.GetIngredients('ingredients/'
               + 'chicken tacos', (data)=>this.setData(data))
  },

  renderRow(rowData) {
    return (
        <View style={styles.rowStyle}>
          <View style={styles.rowPart}>
            <Text style={_cstyles.detail_text_black}>
              {rowData[1]}
            </Text>
          </View>

          <View style={styles.rowPart2}>
            <Text style={_cstyles.detail_text_black}>
              {rowData[2]}
            </Text>
          </View>
          
          <View style={styles.rowPart3} >
            <Text style={_cstyles.detail_text_black}
                  numberOfLines={2} >
              {rowData[0]}
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
      width: windowSize.width * .7 / 8,
      flexDirection: 'row',
      justifyContent: 'center',

    },

    rowPart2: {
      marginHorizontal: 5 * _cvals.dscale,
      width: windowSize.width * 1 / 8,
      flexDirection: 'row',
      justifyContent: 'flex-start',

    },

    rowPart3: {
      marginHorizontal: 5 * _cvals.dscale,
      width: windowSize.width * 5 / 8,
      marginLeft: 10 * _cvals.dscale,
      flexDirection: 'column',
      justifyContent: 'flex-start',

    }

})

module.exports = IngredientsListing;
