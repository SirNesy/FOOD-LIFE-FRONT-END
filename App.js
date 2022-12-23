import * as React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserProvider } from "./Components/UserContext/UserContext";
import Signin from "./Components/Signin/Signin";
import Signup from "./Components/Signup/Signup";
import Pantry from "./Components/Pantry/Pantry";
import AddItem from "./Components/AddItem/AddItem";
import RecipesPage from "./Components/RecipesPage/RecipesPage";
import Icon from "react-native-vector-icons/AntDesign";
import BarcodeScanner from "./Components/BarcodeScanner/BarcodeScanner";


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", background: "linear-gradient(180deg, #E8B58D 0%, #B73B51 100%)"}}>
      <Text>Home Screen</Text>
      <Button title="Sign-in" onPress={() => navigation.navigate("Signin")} />
      <Button title="Sign-up" onPress={() => navigation.navigate("Signup")} />
      <Button
        title="RecipesPage"
        onPress={() => navigation.navigate("RecipesPage")}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [headerVisible, setHeaderVisible] = React.useState(true);
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Pantry" component={Pantry} />
          <Stack.Screen name="AddItem" options={({navigation}) => ({headerShown: headerVisible, headerRight: () => (
            <Icon.Button
            name="camera"
            size={10}
            onPress={() => {
              navigation.navigate("BarcodeScanner");
            }}
          ></Icon.Button>)})}  >
          {(props) => <AddItem {...props} setHeaderVisible={setHeaderVisible} />}
          </Stack.Screen>
          <Stack.Screen name="RecipesPage" component={RecipesPage} />
          <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} />
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
