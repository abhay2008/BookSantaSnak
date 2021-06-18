import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import firebase from "firebase";
import db from "../config";
import { Card, Header, Icon } from "react-native-elements";
import MyDonationsScreen from "./MyDonationsScreen";


export default class RecieverDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.navigation.getParam("details"));
    this.state = {
      userId: firebase.auth().currentUser.email,
      recieverId: this.props.navigation.getParam("details")["userId"],
      requestId: this.props.navigation.getParam("details")["requestId"],
      bookName: this.props.navigation.getParam("details")["bookName"],
      reasonForRequset: this.props.navigation.getParam("details")[
        "reasonToRequest"
      ],
      recieverName: "",
      recieverContact: "",
      recieverAddress: "",
      recieverRequestDocId: "",
    };
  }

  componentDidMount() {
    this.getRecieverDetails();
  }

  updateBooksStatus = async () => {
    db.collection('allDonations').add({
      bookName: this.state.bookName,
      requestId: this.state.requestId,
      recieverName: this.state.recieverName,
      donorId: this.state.userId,
      requestStatus: 'Donor Interested',
    });

    this.props.navigation.navigate('MyDonations');

  }

  getRecieverDetails = async () => {
    db.collection("users")
      .where("emailId", "==", this.state.recieverId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            recieverName: doc.data().firstName,
            recieverContact: doc.data().mobileNumber,
            recieverAddress: doc.data().address,
          });
        });
      });

    db.collection("requestedBooks")
      .where("requestId", "==", this.state.requestId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({ recieverRequestDocId: doc.id });
        });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.1, }}>
          <Header
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="#2536dd"
                size={28}
                iconStyle={{ paddingBottom: 15}}
                onPress={() => this.props.navigation.goBack()}
              />  
            }

            containerStyle={{height: 70, justifyContent: 'center', textAlign: 'center'}}
            centerComponent={{
              text: "Donate Books",
              style: { color: "white", fontSize: 28, fontWeight: "bold", paddingBottom: 20 },
            }}
            backgroundColor="#1eabcf"
          />
        </View>
  
        <View style={{ flex: 0.3, marginTop: 15}}>
          <Card title={'Book Information'} titleStyle={{ fontsize: 20}}>
            <Card>
              <Text style={{fontWeight: 'bold'}}>Name: {this.state.bookName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight: 'bold'}}>Reason: {this.state.reasonForRequset}</Text>
            </Card>
          </Card>
        </View>
        <View style={{ flex: 0.3, marginTop: 60}}>
          <Card title={'Reciever Information'} titleStyle={{ fontsize: 20}}>
            <Card>
              <Text style={{fontWeight: 'bold'}}>Name: {this.state.recieverName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight: 'bold'}}>Contact: {this.state.recieverContact}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight: 'bold'}}>Address: {this.state.recieverContact}</Text>
            </Card>
          </Card>
        </View>

        <View style={styles.buttonContainer}>
          {this.state.userId !== this.state.recieverId ? (
            <TouchableOpacity style={styles.button} onPress={() => {
              this.updateBooksStatus()
              //move to donation screen
            }}>
              <Text style={styles.buttonText}>I want to Donate</Text>
            </TouchableOpacity>
          ) : (null)}
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: { 
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.3, 
    marginTop: 80
  },
  button: {
    width: '50%',
    height: 45,
    backgroundColor: "#1c70bf",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12
  },
  buttonText: {
    color: '#ddd7ff',
    fontSize: 19,
  }
});
