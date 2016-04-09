'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');
var ImageFetcher = require('../modules/imagefetcher')

var _cvals = require('../modules/customvalues')
var mainfont = _cvals.mainfont

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
} = React;

var Header = require('../parts/header')

var MatchPage = React.createClass({
  getInitialState: function() {
    return (
      {
        status: 0, 
        image: {uri: this.props.data.imageLink}
      }
    );
  },
  render: function() {
    var {
      data,
      goBack,
      ...props
    } = this.props;

    return (
    <View style={styles.container}>
      <View style={styles.top_container}>
        <Header title={this.props.data.name}
                mode={'nav'}
                navigator={this.props.navigator} />
        <View style={styles.body_container}>
          <ScrollView
            style={[styles.scroll_container, ]}
            contentContainerStyle={[styles.scroll_content_container]}
            >
            <Image
              source={this.state.image}
              style={styles.pic}
            />
            <Text style={styles.name_text}
                  numberOfLines={3} >
              {this.props.data.name}
            </Text>
            <Text style={styles.value_text}>
              {this.props.data.descr}
            </Text>
          </ScrollView>
        </View>
      </View>
    </View>
    );
  },

  setData: function(data) {
    this.setState({image : {uri : data} })
    console.log(data)
  },

  componentDidMount: function() {
    ImageFetcher.GetImage('images/' + this.props.data.name, 
                            (data)=>this.setData(data))
  },

});

var styles = StyleSheet.create({
  pic: {
    height: windowSize.width,
    width: windowSize.width,
  },
  header_text: {
    color: 'black',
    fontSize: 20,
    fontFamily: mainfont,
    fontWeight: 'bold',
    padding: 10,
  },
  title_text: {
    color: 'white',
    fontSize: 34 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
    paddingTop: 30 * _cvals.dscale,
    paddingBottom: 5,
    paddingHorizontal: 5
  },
  value_text: {
    color: 'black',
    fontSize: 20,
    fontFamily: mainfont,
    padding: 10,
  },
  name_text: {
    color: 'black',
    fontSize: 30,
    fontFamily: 'bold',
    fontFamily: mainfont,
    padding: 10,
  },
  body_container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    opacity: 1.0,
    margin: 0,
  },
  top_container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    opacity: 1.0,
    margin: 0,
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    opacity: 1.0,
    margin: 0,
  },
  header_container: {
    // height: windowSize.height * 6 / 10,
    width: windowSize.width,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    backgroundColor: _cvals.skkellygreen,
    height: _cvals.headerHeight + 5,
  },
  section_container: {
    width: windowSize.width,
    backgroundColor: 'transparent',
    opacity: 1.0,
  },
  divider_line: {
    backgroundColor: 'grey',
    height: 2,
    opacity: 0.3,
    width: windowSize.width
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
  scroll_container: {
    flex: 1,
  },
  scroll_content_container: {
    flexDirection: 'column',
    flex: 1,
    width: windowSize.width,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // justifyContent: 'center',
  },

})

module.exports = MatchPage;
