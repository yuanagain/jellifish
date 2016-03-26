'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');
var Timer = require('./iostimer')
import CustomStyles from '../modules/customstyles'

const _cvals = require('../modules/customvalues')
let small_num = 0.0000000000000000000000000000001
var tdata = ['title1', 'title2', 'title3', 'title4', 'title5']

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
} = React;

var Thumb = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return false;
  },
  render: function() {
    return (
      <View style={styles.timer_container}>
        <Timer
          totaltime={10}
          title_text={this.props.title_text}
          getIncrement={this.props.getIncrement}
          size={'small'}
          dead={true}
          index={1}
        />
      </View>
    );
  }
});

var createThumbRow = (text) => <Thumb title_text={text} getIncrement={getIncrement}/>;

var getIncrement = function() {
  return small_num
}

var TimerPage = React.createClass({
  getInitialState: function() {
    return (
      {
        username: '',
        password: '',
        runStatus: 'running',
        backgroundTimerCt: tdata.length,
        index: 0,
        dummyData: "hello",
      }
    );
  },
  render: function() {
    var {
      name,
      recipeName,
      fetchData,
      ...props
    } = this.props;

    if (this.state.backgroundTimerCt < 4) {
      this.contentsize = {width: windowSize.width, justifyContent: 'center'}
    }
    else {
      this.contentsize = {justifyContent: 'flex-start'}
    }

    return (
    <View style={styles.container}>
      <View>
        <View style={styles.header_container}>
          <Text style={styles.title_text}>
            {this.props.recipeName}
          </Text>
        </View>

        <View style={styles.timers_container}>
          <Timer
            totaltime={10}
            title_text={"test title"}
            getIncrement={this.getIncrement}
            index={0}
          />
          <ScrollView
            style={[styles.scroll_container, ]}
            horizontal={true}
            contentContainerStyle={[styles.scroll_content_container, this.contentsize]}
            >
            <View style={styles.timer_container}>
              {tdata.map(createThumbRow)}
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.buttons_container}>
        <Button
          style={styles.pause_button}
          styleDisabled={{color: 'grey'}}
          onPress={()=>this.togglePause()}
          >
          Pause
        </Button>
      </View>
    </View>
    );
  },

  componentDidMount: function() {
    console.log(this.props.fetchData);
    this.animate();
  },


  animate: function() {
    if (this.state.not_paused) {
      var _data = this.props.fetchData()
      this.setState({ _data });
      setTimeout(() => {
        setInterval(() => {
          if (_data != this.props.fetchData()) {
            console.log("data Changed")
          }
        }, 1000);
      }, 1000);
    }
  },

  togglePause: function() {
    if (this.state.runStatus == 'paused') {
      this.setState({runStatus: 'running'})
    }
    else if (this.state.runStatus == 'running') {
      this.setState({runStatus: 'paused'})
    }
  },

  getIncrement: function(index) {
    if (this.state.runStatus == 'paused') {
      return small_num
    }
    if (this.state.runStatus == 'running') {
      if (this.state.index == index) {
        return 1;
      }
      else {
        return small_num
      }
    }
  },
});

var styles = StyleSheet.create({
  title_text: {
    color: 'white',
    fontSize: 30,
    fontFamily: _cvals.mainfont,
    paddingTop: 30,
    paddingBottom: 5,
  },
  timer_container: {
    flexDirection: 'row',
    margin: 6,
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
    backgroundColor: _cvals.sknavy,
    opacity: 0.92,
    margin: 0,
  },
  header_container: {
    // height: windowSize.height * 6 / 10,
    width: windowSize.width,
    alignItems: 'center',
    backgroundColor: _cvals.skkellygreen,
    justifyContent: 'flex-end',
  },
  scroll_container: {
    flex: 1,
    marginTop: 40,
    height: 140,
    width: windowSize.width
  },
  scroll_content_container: {
    flexDirection: 'row',
    flex: 1,
    //width: windowSize.width,
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,

    // justifyContent: 'center',
  },
  timers_container: {
    marginTop: 40,
    width: windowSize.width,
    //height: windowSize.height * 2 / 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    opacity: 1.0,
  },
  buttons_container: {
    //height: windowSize.height * 1 / 10,
    width: windowSize.width,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0,
    backgroundColor: 'white',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    width:320,
    height:480,
  },
  pause_button: {
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    fontSize: 28,
    textAlign: 'center',
    backgroundColor: _cvals.skkellygreen,
    width: windowSize.width,
    padding: 5,
    fontFamily: _cvals.mainfont,
    shadowRadius: 4,
    shadowColor: _cvals.skkellygreen,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 3}
  },
})

module.exports = TimerPage;
