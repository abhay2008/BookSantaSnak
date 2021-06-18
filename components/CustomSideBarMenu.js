import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';

export default class CustomSideBarMenu extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.drawerContainer}>
          <DrawerItems {...this.props} activeTintColor='#7bffe0' labelStyle={{fontSize: 17}} inactiveTintColor='#420987'/>
        </View>
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={()=>{this.props.navigation.navigate('LoginScreen')
          firebase.auth().signOut()
        }}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContainer: {
    flex: 0.8,
    backgroundColor: '#47afde',
    paddingTop: 35,
  },
  logoutContainer: {
    flex: 0.2,
    paddingBottom: 30,
    justifyContent: 'flex-end',
    backgroundColor: '#47afde'
  },
  logoutButton: {
    backgroundColor: '#a85ae6',
    marginLeft: 30,
    width: 100,
    height: 40,
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4c0e42',
    padding: 7
  },
  logoutText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  }
})