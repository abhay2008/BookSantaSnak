import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { AppTabNavigator } from "./BottomTabNavigator";
import CustomSideBarMenu from "./CustomSideBarMenu";
import { createDrawerNavigator } from "react-navigation-drawer";
import MyDonationsScreen from "../screens/MyDonationsScreen";
import SettingsScreen from "../screens/SettingsScreen";

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: AppTabNavigator,
    MyDonations: MyDonationsScreen,
    Settings: SettingsScreen,
  },
  { contentComponent: CustomSideBarMenu },
  { initialRouteName: 'Home' }
);
