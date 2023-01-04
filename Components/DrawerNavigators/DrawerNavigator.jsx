import React, { useState } from "react";
import { View, Text, Button } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Pantry from "../Pantry/Pantry";
import RecipesPage from "../RecipesPage/RecipesPage";
import HomeScreen from "../HomeScreen/HomeScreen";
import Icon from "react-native-vector-icons/AntDesign";
const Drawer = createDrawerNavigator();


const DrawerNavigator = () => {
  const [searchToggle, setSearchToggle] = useState(true)
  return (
    <Drawer.Navigator>
      <Drawer.Screen options={{headerTransparent:true, headerRight: () => (
      <Icon.Button
      name="search1"
      size={20}
      onPress={() => {
        setSearchToggle(false);
      }}
    ></Icon.Button>), headerShown: searchToggle}} name="RecipesPage">{(props) => (
      <RecipesPage
        {...props}
        setSearchToggle={setSearchToggle}
        searchToggle={searchToggle}
      />
    )}</Drawer.Screen>
      <Drawer.Screen options={{headerShown:false}} name="Pantry" component={Pantry} />
      <Drawer.Screen options={{headerShown:false, swipeEnabled:false}} name="Log Out" component={HomeScreen} />
    </Drawer.Navigator>
  )
}


export default DrawerNavigator;