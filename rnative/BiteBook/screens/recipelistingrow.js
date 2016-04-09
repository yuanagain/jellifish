'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var _cvals = require('../modules/customvalues')
var ImageFetcher = require('../modules/imagefetcher')


var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} = React;

var mainfont = 'avenir'
var rowheight = 100 * _cvals.dscale


// SHARED FORMATTING.
// TODO: make univeral
var lightgreen = "#7ED321"
var mainfont = 'avenir'
var skblue = '#4A90E2'

var RecipeListingRow = React.createClass({
  getInitialState: function() {
    return (
      {
        status: 0,
        selected: false,
        selectedStyle: {},
        image: {uri: 'http://facebook.github.io/react/img/logo_og.png'}
      }
    );
  },
  render: function() {
    var {
      data,
      description_text,
      onPressDetailFunction,
      onSelect,
      onDetail,
      thumbnailStyle,
      ...props
    } = this.props;

    return (
      <View >
        <View style={[styles.container, ]}>
          <View style={[styles.thumbnail_container, this.state.selectedStyle]}>
            <TouchableHighlight onPress={() => this.onSelect()}>
              <Image
                source={this.state.image}
                style={styles.thumbnail}
              />
            </TouchableHighlight>
          </View>
          <TouchableOpacity onPress={() => this.onDetail()}>
            <View style={styles.content_container}>
              <Text
              style={styles.name_text}
              numberOfLines={1} >
                {this.props.data.name}
              </Text>
              <Text style={styles.description_text}
                    numberOfLines={3} >
                {this.props.data.descr}
              </Text>
            </View>
          </TouchableOpacity >
        </View>
        <View style={styles.divider_line}>
        </View>
      </View>
    );
  },

  setData: function(data) {
    console.log("THIS IS OUR URI")
    console.log(data)
    this.setState({image : {uri : data} })

  },

  componentDidMount: function() {
    ImageFetcher.GetImage('images/' + this.props.data.name, 
                            (data)=>this.setData(data))
  },

  setData: function(data) {
    this.setState({image : {uri : data} })
  },

  componentDidMount: function() {
    // ImageFetcher.getImage((data)=>this.setData(data))
  },
  
  onSelect: function() {
    if (this.state.selected) {
      this.props.onSelect(this.props.data.name)
      this.setState({selectedStyle: {}, selected: false})
    }
    else {
      this.props.onSelect(this.props.data.name)
      this.setState({selectedStyle: styles.selectedStyle, selected: true})
    }
    return
  },
  onDetail: function() {
    this.props.onDetail(this.props.data)

  }
});

var styles = StyleSheet.create({
  description_text: {
    color: 'black',
    fontSize: 14 * _cvals.dscale,
    fontFamily: mainfont,
  },
  name_text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24 * _cvals.dscale,
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
    width: windowSize.width * .7
  },
  thumbnail_container: {
    height: rowheight
  },
  selectedStyle: {
    opacity: 0.5,
    //backgroundColor: _cvals.skkellygreen
  },
  thumbnail: {
    height: rowheight,
    width: rowheight,
    borderRadius: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  thumbnail_selected: {
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
