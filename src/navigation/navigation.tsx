import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Initialization from '../screens/Initialization/Initialization';
import HomeScreen from '../screens/Home/HomeScreen';
import LoginScreen from '../screens/Auth/Login/LoginScreen';
import RegisterScreen from '../screens/Auth/Register/RegisterScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPassword/ForgotPasswordScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import CreateScreen from '../screens/Create/CreateScreen';

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
        tabBarLabel: 'Home',
      };
    },
  }
);

const ProfileStackNavigator = createStackNavigator(
  {
    ProfileScreen: {
      screen: ProfileScreen,
    },
  },
  {
    navigationOptions: () => {
      return {
        header: null,
        tabBarLabel: 'Profile',
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
    ForgotPasswordScreen: {
      screen: ForgotPasswordScreen,
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

const MainTabsNavigator = createBottomTabNavigator({
  Home: HomeStackNavigator,
  Create: {
    screen: () => null,
    navigationOptions: ({ navigation }) => ({
        tabBarOnPress: ({ navigation }) => {
            navigation.navigate("CreateScreen");
        }
    }),
  },
  Profile: ProfileStackNavigator
}, 
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = FontAwesome5;
      let iconName;
      if (routeName === 'Home') {
        iconName = `home`;
      }

      if (routeName === 'Profile') {
        iconName = `user`;
      }

      if (routeName === 'Create') {
        iconName = `plus`;
      }
      // You can return any component that you like here!
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',  
    inactiveTintColor: 'gray',
  },
  //header: null,
});

const RootNavigation = createStackNavigator({
  MainTabs: { screen: MainTabsNavigator, navigationOptions: { header: null }, },
  CreateScreen: CreateScreen,
}, {
    mode: 'modal',
}); 


const AppSwitchNavigator = createSwitchNavigator({
  Initialization: { screen: Initialization },
  RootStack: { screen: RootNavigation },
  AuthScreen: { screen: AuthStackNavigator },
});

const AppNavigator = createAppContainer(AppSwitchNavigator);
export default AppNavigator;