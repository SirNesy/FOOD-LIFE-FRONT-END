import React, { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  TextInput,
  View,
  ImageBackground,
  Pressable,
  Text,
  Image,
} from "react-native";
import { auth } from "../../firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { postUser } from "../../Utils";
import Gradient from "../../assets/Gradient.png";
import Logo from "../../assets/Logo.png";
export default function Signup({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnPress = () => {
    if (!firstName || !lastName) {
      Alert.alert("Sign up failed", "Please enter your name");
    } else if (!email) {
      Alert.alert("Sign up failed", "Please enter an Email Address");
    } else if (!password) {
      Alert.alert("Sign up failed", "Please enter a Password");
    } else {
      let message = "";
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          postUser({ firstName, lastName, email, userId: user.uid });
          Alert.alert(
            "Success!",
            `User ${firstName + lastName} was successfully created`
          );
          navigation.navigate("Home");
        })
        .catch((err) => {
          if (err.code === "auth/invalid-email") {
            message = "Invalid Email";
          } else if (err.code === "auth/weak-password") {
            message = "Password must be at least 6 characters";
          } else if (err.code === "auth/email-already-in-use") {
            message = "Email is already in use";
          } else if (err.code === "auth/too-many-requests") {
            message = "Too Many Attempts: Try Again in a Minute";
          }
          Alert.alert("Sign in failed", message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={Gradient} style={styles.background}>
        <Image style={styles.image} source={Logo} />
        <TextInput
          style={styles.input}
          value={firstName}
          placeholder={"First name"}
          onChangeText={(text) => setFirstName(text)}
          autoCapitalize={"none"}
        />
        <TextInput
          style={styles.input}
          value={lastName}
          placeholder={"Last name"}
          onChangeText={(text) => setLastName(text)}
          autoCapitalize={"none"}
        />
        <TextInput
          style={styles.input}
          value={email}
          placeholder={"Email"}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize={"none"}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder={"Password"}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Pressable
          style={({ pressed }) => [
            pressed ? styles.buttonPressed : styles.button,
          ]}
          onPress={() => {
            handleOnPress();
          }}
        >
          <Text style={styles.text}>Sign Up</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "80%",
    margin: 15,
    backgroundColor: "#fff",
    textAlign: "center",
    borderRadius: 5,
  },
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
    marginTop: 30,
    backgroundColor: "#F4F6F4",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    width: "40%",
    height: 56,
  },
  buttonPressed: {
    marginTop: 30,
    backgroundColor: "#F4F6F4",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    width: "38%",
    height: 48,
  },
  image: {
    justifyContent: "center",
    width: "75%",
    height: "25%",
    marginBottom: 20,
    resizeMode: "contain",
  },
  text: {
    color: "#3B2314",
    fontSize: 16,

    fontWeight: "bold",
    textAlign: "center",
  },
});
