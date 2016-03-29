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
  View,
  Image,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

var LoginPage = require('./screens/loginpage')
var RecipeListing = require('./screens/recipelisting')
var SettingsRoot = require('./screens/settingsroot')
var TimerPage = require('./screens/timerpage')
var RecipeListingRoot = require('./screens/recipelistingroot')

class BiteBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home'
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
            renderIcon={() => <Image style={styles.icon}
              source={require('./assets/lists_kellygreen.png')}
            />}
            selected={this.state.selectedTab === 'home'}
            //badgeText="Home"
            onPress={() => {
              this.setState({
                selectedTab: 'home',
              });
              }
            }>
            <RecipeListingRoot runApp={(arg) => this.runApp(arg)} />
          </TabNavigator.Item>
          <TabNavigator.Item
            title="Timer"
            selected={this.state.selectedTab === 'timer'}
            //badgeText="Profile"
            renderIcon={() => <Image style={styles.icon}
              source={require('./assets/timer_kellygreen.png')} /> }
            onPress={() => {
              this.setState({
              selectedTab: 'timer'
              });
            }
            }>
            <TimerPage
              fetchData={(arg) => this.fetchData()}
              recipeName={"RECIPE NAME"}
            />
          </TabNavigator.Item>
          <TabNavigator.Item
            title="Settings"
            selected={this.state.selectedTab === 'settings'}
            renderIcon={() => <Image style={styles.icon}
              source={require('./assets/home_kellygreen.png')} /> }
            //badgeText="Profile"
            onPress={() => {
              this.setState({
              selectedTab: 'settings'
              });
            }
            }>
            <SettingsRoot />
          </TabNavigator.Item>
        </TabNavigator>

      )
    }
  }

  loginFunc() {
    console.log("GOING HOME")
    this.setState({selectedTab: 'home'})
  }

  runApp(selected) {
    console.log(selected)
    this.setState({selectedTab: 'timer'})
  }

  fetchData() {
    console.log("fetching data")
    return 69
  }
}

const styles = StyleSheet.create({
  icon: {
    height: 25,
    width: 25,
    opacity: 0.5
  },
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
