import React from 'react'
import { Button, StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import Gradient from "../../assets/Gradient.png"
function HomeScreen({ navigation }) {
    return (
      <View 
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          
        }}
      >
        <ImageBackground source={Gradient} style={{width: '100%', height: '100%'}}>
          
        <Text>Home Screen</Text>
        <Button className="bg-gradient-to-r from-red-800 via-yellow-600 to-yellow-500" title="Sign-in" onPress={() => navigation.navigate("Signin")} />
        <Button title="Sign-up" onPress={() => navigation.navigate("Signup")} />
        </ImageBackground>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    text: {
      color: "white",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0"
    }
  });
  
export default HomeScreen