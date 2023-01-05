import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Pantry from "../Pantry/Pantry";
import RecipesPage from "../RecipesPage/RecipesPage";
import HomeScreen from "../HomeScreen/HomeScreen";
import Icon from "react-native-vector-icons/Feather";
import Profile from "../Profile/Profile";
const Drawer = createDrawerNavigator();

const DrawerNavigator = ({navigation}) => {
  const [searchToggle, setSearchToggle] = useState(true);
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        options={{
          headerTransparent: true,
          headerRight: () => (
            <Icon.Button
            iconStyle={styles.icon}
            backgroundColor={"#00000000"}
              name="search"
              size={20}
              onPress={() => {
                setSearchToggle(false);
              }}
            ></Icon.Button>
          ),
          headerTitle: "",
          headerShown: searchToggle,
        }}
        name="RecipesPage"
      >
        {(props) => (
          <RecipesPage
            {...props}
            setSearchToggle={setSearchToggle}
            searchToggle={searchToggle}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="My Profile"
        
        options={{ headerTransparent: true, headerRight: () => (
          <Icon.Button
            iconStyle={styles.icon}
            name="edit-2"
            size={20}
            backgroundColor={"#00000000"}
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
          ></Icon.Button>
        )} }
        component={Profile}
      />
      <Drawer.Screen
        name="Pantry"
        options={{ headerTransparent: true }}
        component={Pantry}
      />

      <Drawer.Screen
        options={{ headerShown: false, swipeEnabled: false }}
        name="Log Out"
        component={HomeScreen}
      />
    </Drawer.Navigator>
  );
};
const styles = StyleSheet.create({
  icon: {
    color: "#000"
  },
});

export default DrawerNavigator;
