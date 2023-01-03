import React, { useContext, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
} from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseconfig";
import { UserContext } from "../UserContext/UserContext";
import Gradient from "../../assets/Gradient.png";
import Logo from "../../assets/Logo.png";


function HomeScreen({ navigation }) {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    signOut(auth).then(() => {
      setUser(null)
    }).catch((err) => {
      Alert.alert("Sign out failed", err.message);
    });
  }, [])
  
  return (
    <View style={styles.container}>
      <ImageBackground source={Gradient} style={styles.background}>
        <Image style={styles.image} source={Logo} />
        
        <Pressable
          style={({ pressed }) => [
            pressed ? styles.buttonPressed : styles.button,
          ]}
          title="Sign-in"
          onPress={() => navigation.navigate("Signin")}
        >
          <Text style={styles.text}>Sign-in</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            pressed ? styles.buttonPressed : styles.button,
          ]}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.text}>Sign-up</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginBottom: 20,
    backgroundColor: "#F4F6F4",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    width: "70%",
    height: "10%",
  },
  buttonPressed: {
    marginBottom: 20,
    backgroundColor: "#F4F6F4",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    width: "69%",
    height: "9%",
  },
  image: {
    justifyContent: "center",
    width: "75%",
    height: "25%",
    marginBottom: 50,
    resizeMode: "contain",
  },
  text: {
    color: "#3B2314",
    fontSize: 24,

    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
