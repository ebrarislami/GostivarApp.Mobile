import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Initialization from '../screens/Initialization/Initialization';
import HomeScreen from '../screens/Home/HomeScreen';
import LoginScreen from '../screens/Auth/Login/LoginScreen';
import RegisterScreen from '../screens/Auth/Register/RegisterScreen';

const HomeStackNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
    },
  },
  {
    navigationOptions: () => {
      return {
        header: null,
      };
    },
  }
);

const AuthStackNavigator = createStackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
    },
    RegisterScreen: {
      screen: RegisterScreen,
    },
  },
  {
    navigationOptions: () => {
      return {
        header: null,
      };
    },
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  Initialization: { screen: Initialization },
  HomeScreen: { screen: HomeStackNavigator },
  AuthScreen: { screen: AuthStackNavigator },
});

const AppNavigator = createAppContainer(AppSwitchNavigator);
export default AppNavigator;