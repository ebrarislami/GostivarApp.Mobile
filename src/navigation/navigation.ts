import React from 'react';
import { TouchableOpacity, Image, Animated, Easing, Platform } from 'react-native';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Initialization from '../screens/Initialization/Initialization';
import Home from '../screens/Home/Home';

const HomeStackNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
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
  Home: { screen: HomeStackNavigator },
});

const AppNavigator = createAppContainer(AppSwitchNavigator);
export default AppNavigator;