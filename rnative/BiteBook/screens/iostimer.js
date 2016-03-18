'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

//var Button_Native = require('react-native-button');
var windowSize = Dimensions.get('window');

var Navigator = require('Navigator');

var Progress = require('react-native-progress');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image
} = React;

var TimerV1 = React.createClass({
  // propTypes: {
  //   progress: PropTypes.number,
  // },

  getInitialState: function() {
    return (
      {
        username: '',
        // progress: 0.3,
        indeterminate: false,
        not_paused: true
      }
    );
  },
  render: function() {
    var {
      progress,
      ...props
    } = this.props;

    return (
    <View style={styles.container}>
      <View style={styles.header_container}>
      </View>
      <View style={styles.timer_container}>
        <Progress.Circle
            style={styles.progress}
            progress={this.state.progress}
            indeterminate={this.state.indeterminate}
            direction="clockwise"
            size ={250}
            color={'orange'}
            unfilledColor={'#EFEFEF'}
            borderWidth={0}
            thickness={5}
            textStyle={styles.timer_text}
            showsText={true}
            formatText={(progress) => 'Test\n0:' + Math.round(progress * 59)}
          />
        </View>
    </View>
    );
  },
  animate: function() {
    if (this.state.not_paused) {
      var progress = this.props.progress
      this.setState({ progress });
      setTimeout(() => {
        this.setState({ indeterminate: false });
        setInterval(() => {
          progress += 1/600;
          if(progress > 1) {
            progress = 1;
          }
          this.setState({ progress });
        }, 100);
      }, 100);
    }
  },

  componentDidMount: function() {
    this.animate();
  },

  _handlePress_toRecord(event) {
    this.setState({show_screen: "recordscreen"})
  },
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#0099D1',
    margin: 0
  },
  timer_text: {
    color: 'white'
  },
  progress: {
    margin: 10,
  },
  timer_container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  header_container: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

module.exports = TimerV1;
