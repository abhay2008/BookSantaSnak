import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../components/Header";
import { ListItem } from "react-native-elements";
import { StatusBar } from "expo-status-bar";

export default class DonateScreen extends React.Component {
  constructor() {
    super();
    this.state = { requestedBookList: [] };
  }

  getRequestedBookList = () => {
    db.collection("requestedBooks").onSnapshot((snapshot) => {
      let requestedBookList = snapshot.docs.map((doc) => doc.data());
      this.setState({ requestedBookList: requestedBookList });
    });
  };

  componentDidMount() {
    this.getRequestedBookList();
    console.log(this.state.requestedBookList);
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => (
    <ListItem
      key={index}
      title={item.bookName}
      subTitle={item.reasonToRequest}
      titleStyle={{ color: "black", fontWeight: "bold" }}
      rightElement={
        <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate('RecieverDetailsScreen', {details: item})}}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      }
      bottomDivider
    />
  );

  flatlistItemSeparator = () => {
    return (
      <View style={{height: 1, width: '100%'}}/>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, }}>
        <StatusBar style="dark"/>
        <MyHeader title="DonateScreen" navigation={this.props.navigation}/>
        <View style={{ flex: 1 }}>
          {
            (console.log(this.state.requestedBookList.length),
            this.state.requestedBookList.length === 0 ? (
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20 }}>
                  List Of All Requested Books
                </Text>
              </View>
            ) : (
              <FlatList
                data={this.state.requestedBookList}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                ItemSeparatorComponent={() => this.flatlistItemSeparator()}
              />
            ))
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7d30c7",
    shadowColor: "#2d064f",
    borderRadius: 12,
    shadowRadius: 12,
    elevation: 15,
    shadowOffset: { width: 0, height: 8 },
  },
  buttonText: {
    color: '#fff',
    fontSize: 15
  },
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
