import React, { useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import { auth } from "../../firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleOnPress = () => {
    console.log("you are inside press");
    // createUserWithEmailAndPassword(auth, username, password).then(
    //   (userCredential) => {
    //     const user = userCredential.user;
    //     console.log(user, "you have signed-up");
    //   }
    // );
  };

  return (
    <>
      <TextInput
        style={styles.input}
        value={username}
        placeholder={"Username"}
        onChangeText={(text) => setUsername(text)}
        autoCapitalize={"none"}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder={"Password"}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        title={"Sign Up"}
        onPress={() => {
          handleOnPress();
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 30,
    backgroundColor: "#fff",
  },
});
