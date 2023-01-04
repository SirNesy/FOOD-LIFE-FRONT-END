import React, { useContext, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  Pressable,
  Image,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseconfig";
import { UserContext } from "../UserContext/UserContext";
import Gradient from "../../assets/Gradient.png";
import Logo from "../../assets/Logo.png";

const Signin = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (!email) {
      Alert.alert("Sign in failed", "Please enter your Email Address");
    } else if (!password) {
      Alert.alert("Sign in failed", "Please enter your Password");
    } else {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user.uid);
        navigation.navigate("Drawers");
      })
      .catch((err) => {
        let message = "";
        if (err.code === "auth/invalid-email") {
          message = "Invalid Email"
        } else if (err.code === "auth/wrong-password") {
          message = "Incorrect Password"
        } else if (err.code === "auth/user-not-found") {
          message = "Email s Not Registered"
        } else if (err.code === "auth/too-many-requests") {
          message = "Too Many Attempts: Try Again in a Minute"
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
            handleSignIn();
          }}
        >
          <Text style={styles.text}>Sign In</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
};

export default Signin;

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
