import React, { useContext, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseconfig";
import { UserContext } from "../UserContext/UserContext";

const Signin = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user.uid);
        Alert.alert("Success", `User ${userCredential.user.uid} was signed in`);
        navigation.navigate("Drawers");
      })
      .catch((err) => {
        Alert.alert("Sign in failed", err.message);
      });
  };
  return (
    <>
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
        title={"Sign In"}
        onPress={() => {
          handleSignIn();
        }}
      />
    </>
  );
};

export default Signin;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 30,
    backgroundColor: "#fff",
  },
});
