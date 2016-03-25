/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

var LoginPage = require('./screens/loginpage')
var RecipeListing = require('./screens/recipelisting')
var SettingsPage = require('./screens/settingspage')
var TimerPage = require('./screens/timerpage')

class BiteBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'settings'
    };
  }

  render() {
    if (this.state.selectedTab == 'loginpage') {
      return (
        <LoginPage loginFunction={() => this.loginFunc()} />
      );
    }
    else {
      return (
        <TabNavigator selected={this.state.selectedTab}>
          <TabNavigator.Item
            tabBarStyle={{height: 0,}}
            title='Recipes'
            selected={this.state.selectedTab === 'home'}
            //badgeText="Home"
            onPress={() => {
              this.setState({
                selectedTab: 'home'
              });
              }
            }>
            <RecipeListing />
          </TabNavigator.Item>
          <TabNavigator.Item
            title="Timer"
            selected={this.state.selectedTab === 'timer'}
            //badgeText="Profile"
            onPress={() => {
              this.setState({
              selectedTab: 'timer'
              });
            }
            }>
            <TimerPage
              recipeName={"RECIPE NAME"}
            />
          </TabNavigator.Item>
          <TabNavigator.Item
            title="Settings"
            selected={this.state.selectedTab === 'settings'}
            //badgeText="Profile"
            onPress={() => {
              this.setState({
              selectedTab: 'settings'
              });
            }
            }>
            <SettingsPage />
          </TabNavigator.Item>
        </TabNavigator>

      )
    }
  }

  loginFunc() {
    console.log("GOING HOME")
    this.setState({selectedTab: 'home'})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('BiteBook', () => BiteBook);
