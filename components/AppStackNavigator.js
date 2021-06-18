import React from "react";
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import DonateScreen from '../screens/DonateScreen';
import RecieverDetailsScreen from '../screens/RecieverDetailsScreen';

export const AppStackNavigator = createStackNavigator ({
  DonateScreen: {
    screen: DonateScreen,
    navigationOptions: {
      headerShown: false,
    }
  },
  RecieverDetailsScreen: {
    screen: RecieverDetailsScreen,
    navigationOptions: {
      headerShown: false,
    }
  },
}, {
  initialRouteName: 'DonateScreen',
});
