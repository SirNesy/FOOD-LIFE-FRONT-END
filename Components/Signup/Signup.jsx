import React, { useState } from "react";
import { Alert, Button, StyleSheet, TextInput } from "react-native";
import { auth } from "../../firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { postUser } from "../../Utils";

export default function Signup({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnPress = () => {
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        postUser({ firstName, lastName, email, userId: user.uid });
        Alert.alert(
          "Success!",
          `User ${firstName + lastName} was successfully created`
        );
        navigation.navigate("Pantry");
      }
    );
  };

  return (
    <>
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
