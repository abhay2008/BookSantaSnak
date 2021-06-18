import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header, Icon } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

const MyHeader = (props) => {
  return (
    <Header
      backgroundColor="#3497e3"
      centerComponent={{
        text: props.title,
        style: {
          color: "white",
          fontSize: 28,
          height: 70,
          fontWeight: "bold",
          padding: 10,
        },
      }}
      leftComponent={
        <AntDesign name="bars" size={38}
          color="#A42963"
          style={{marginBottom: 7}}
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        />
      }
    />
  );
};
export default MyHeader;
