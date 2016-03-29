'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');


var _cvals = require('../styles/customvals')
var _cstyles = require('../styles/customstyles')
import '../libs/customtools.js'

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
      selected: this.props.selection
    };
  },

  getDefaultProps: function() {
    return {
      title: "Select",
      dataSource: [],
      selection: [],
      minSelect: 0,
      maxSelect: Infinity,
    };
  },

  render: function() {
    var {
      title,
      dataSource,
      harvestSelection,
      renderRow,
      selection,
      minSelect,
      maxSelect,
      ...props
    } = this.props;

    console.log(this.props.items)
    return (
    <View style={styles.container}>
      <View style={styles.body_container}>
        <View style={_cstyles.header_container}>
          <Text style={_cstyles.title_text}>
            {this.props.title}
          </Text>
        </View>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          style={styles.listView}
        />

        <View style={styles.divider_line}>
        </View>
      </View>
      <View style={styles.buttons_container}>
        <Button
          style={_cstyles.wide_button}
          styleDisabled={{color: 'grey'}}
          onPress={this.harvestSelection}
          >
          {'Confirm Selection'}
        </Button>
      </View>
    </View>
    );
  },

  inSelectionRange: function() {
    if (inRange(this.props.minSelect, this.props.maxSelect))
  }

  harvestSelection: function() {
    this.props.harvestSelection(this.state.selection)
  },

  cancelSelection: function() {
    this.props.cancelSelection([])
  },

  toggleSelect: function(item) {
    var index = indexOf(this.state.selected, item)
    if (index != -1) {
      var selection = this.state.selection.splice(index, 1)
      this.setState( {selection} )
    }
    else {
      this.setState( {selection: this.state.selection} )
    }
  },

  rowStyle: function(item) {
    if contains(this.state.selected, item) { return this.state.selected_style }
    return {}
  },

  renderRow(item) {
    return (
        <TouchableOpacity onPress={(item) => this.toggleSelect(item)} >
          <View style = selectionStyle(item)>
          {this.props.renderRow(rowData)}
          </View>
        <TouchableOpacity />
    )
  },

  isSelected: function(rowData) {
    if (this.state.selected.indexOf(rowData['name']) == -1) return false;
    return true;
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
  },

  goBack: function() {
    this.props.navigator.pop()
  },
});

var RowContainer = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      selected: this.props.selection
    };
  },
  render: function() {
    var {
      renderRow,

      ...props
    } = this.props;

    console.log(this.props.items)
    return (
    <View style={styles.container}>

    );
  },

var styles = StyleSheet.create({

  selected_style: {
    opacity: 0.5,
    backgroundColor: _cvals.skkellygreen
  }
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
})

module.exports = RecipeListing;
