import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Pantry from "../Pantry/Pantry";
import RecipesPage from "../RecipesPage/RecipesPage";
import HomeScreen from "../HomeScreen/HomeScreen";
import Icon from "react-native-vector-icons/AntDesign";
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
              name="search1"
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
            style={styles.icon}
            name="edit"
            size={30}
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
    flex: 1,
    backgroundColor: '#00000000',
    alignItems: "center",
  },
});

export default DrawerNavigator;
