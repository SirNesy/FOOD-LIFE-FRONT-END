import React from 'react'
import { Button, StyleSheet, Text, View } from "react-native";

function HomeScreen({ navigation }) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #E8B58D 0%, #B73B51 100%)",
        }}
      >
        <Text>Home Screen</Text>
        <Button title="Sign-in" onPress={() => navigation.navigate("Signin")} />
        <Button title="Sign-up" onPress={() => navigation.navigate("Signup")} />
      </View>
    );
  }

export default HomeScreen