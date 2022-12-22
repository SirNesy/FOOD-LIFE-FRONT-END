import * as React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserProvider } from "./Components/UserContext/UserContext";
import Signin from "./Components/Signin/Signin";
import Signup from "./Components/Signup/Signup";
import Pantry from "./Components/Pantry/Pantry";
import AddItem from "./Components/AddItem/AddItem";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button title="Sign-in" onPress={() => navigation.navigate("Signin")} />
      <Button title="Sign-up" onPress={() => navigation.navigate("Signup")} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Pantry" component={Pantry} />
          <Stack.Screen name="AddItem" component={AddItem} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
