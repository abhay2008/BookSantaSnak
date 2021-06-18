import { StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import React from "react";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../components/Header";

export default class MyDonationsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      allDonations: [],
    };
  }

  componentDidMount() {
    this.getAllDonations();
    console.log(this.state.allDonations);
  }

  getAllDonations = async () => {
    await db
      .collection("allDonations")
      .where("donorId", "==", this.state.userId)
      .onSnapshot((snapshot) => {
        let listOfDonations = snapshot.docs.map((doc) => {
          doc.data();
          console.log(doc.data());
        });

        this.setState({ allDonations: listOfDonations });
      });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => (
    <ListItem
      key={index}
      title={item.bookName}
      subTitle={`Requested by: ${item.recieverName}
      RequestStatus: ${item.requestStatus}`}
      titleStyle={{ color: "black", fontWeight: "bold" }}
      rightElement={
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>SendBook</Text>
        </TouchableOpacity>
      }
      leftElement={<Icon name="book" type="font-awesome" color="blue" />}
      bottomDivider
    />
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="My Donations" navigation={this.props.navigation} />
        <View style={{ flex: 1 }}>
          {this.state.allDonations.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={styles.subText}>No Donations by you!</Text>
              <Text style={styles.sub2Text}>Go and Donate some books!</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allDonations}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
