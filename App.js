import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';

import LoadingScreen from './src/screens/LoadingScreen'
import HomeScreen from './src/screens/HomeScreen'
import LoginScreen from './src/screens/LoginScreen'
import RegisterScreen from './src/screens/RegisterScreen'
import WatchScreen from './src/screens/WatchScreen'
import TvHome from './src/screens/TvHome'
import ProfileScreen from './src/screens/ProfileScreen'

import * as firebase from 'firebase'
import Icon from 'react-native-vector-icons/FontAwesome';


var firebaseConfig = {
  apiKey: "AIzaSyCeqXH2LySPklDbDEyRTJsi9veMFbrupmM",
  authDomain: "reactfirebasetmr.firebaseapp.com",
  databaseURL: "https://reactfirebasetmr.firebaseio.com",
  projectId: "reactfirebasetmr",
  storageBucket: "reactfirebasetmr.appspot.com",
  messagingSenderId: "120139749864",
  appId: "1:120139749864:web:99969dbb64ded7b55d6c5d",
  measurementId: "G-80FKVPT660"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const AppContainer = createStackNavigator(
  {
    default : createBottomTabNavigator(
      {
        Home : {
          screen: HomeScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Icon name="home" size={24} color={tintColor} />
          }
        },
        TV : {
          screen: TvHome,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Icon name="envelope" size={24} color={tintColor} />
          }
        },
        Watchlist : {
          screen: WatchScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Icon name="user" size={24} color={tintColor} />
          }
        },
        Profile : {
          screen: ProfileScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Icon name="user" size={24} color={tintColor} />
          }
        }
        },
      {
        defaultNavigationOptions: {
        tabBarOnPress: ({navigation, defaultHandler}) => {
          if(navigation.state.key == "Profile"){
            navigation.navigate("postModal")
          }
          else{
            defaultHandler();
          }
        }
      },
      
        tabBarOptions: {
          style: {
            backgroundColor: '#0f0f0f',
          },
          activeTintColor: "#ff0000",
          inactiveTintColor: "#474747",
          showLabel: true
        }
      }
    ),
      postModal: {
        screen: ProfileScreen
      }
  },

  {
    mode: "modal",
    headerMode: "none",
    //initialRouteName: "postModal"
  }
  
);


const AuthStack = createStackNavigator({
  Login : LoginScreen,
  Register : RegisterScreen
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading : LoadingScreen,
      App : AppContainer,
      Auth : AuthStack
    },
    {
      initialRouteName : "Loading"
    }
  )
);