import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import MyHeader from "../components/Header";
import firebase from "firebase";
import db from "../config";

export default class SettingsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      address: "",
      contact: "",
      userId: firebase.auth().currentUser.email,
      docId: "",
    };
  }

  componentDidMount() {
    this.getUserDetails();
  }

  getUserDetails = async () => {
    db.collection("users")
      .where("emailId", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let data = doc.data();
          this.setState({
            firstName: data.firstName,
            lastName: data.lastName,
            contact: data.mobileNumber,
            address: data.address,
            docId: doc.id,
          });
        });
      });
  };

  updateUserDetails = async () => {
    db.collection("users")
      .doc(this.state.docId)
      .update({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        mobileNumber: this.state.contact,
      });
    ToastAndroid.show("Profile updated successfully", ToastAndroid.SHORT);
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <MyHeader title="Settings" navigation={this.props.navigation} />

        <View style={styles.formContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="FirstName"
            onChangeText={(text) => {
              this.setState({ firstName: text });
            }}
            value={this.state.firstName}
            maxLength={8}
          />
          <TextInput
            style={styles.textInput}
            placeholder="LastName"
            onChangeText={(text) => {
              this.setState({ lastName: text });
            }}
            value={this.state.lastName}
            maxLength={8}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Address"
            onChangeText={(text) => {
              this.setState({ address: text });
            }}
            multiline={true}
            value={this.state.address}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Contact"
            onChangeText={(text) => {
              this.setState({ contact: text });
            }}
            maxLength={10}
            minLength={9}
            value={this.state.contact}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.updateUserDetails();
            }}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  textInput: {
    width: "90%",
    height: 45,
    alignSelf: "center",
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 40,
    padding: 10,
  },
  button: {
    width: "50%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
