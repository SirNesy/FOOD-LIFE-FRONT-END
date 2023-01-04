import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  ImageBackground,
  Pressable,
} from "react-native";
import { deleteItem, getItems } from "../../Utils";
import { UserContext } from "../UserContext/UserContext";
import Icon from "react-native-vector-icons/AntDesign";
import { useIsFocused } from "@react-navigation/native";
import Gradient from "../../assets/Gradient.png";

const Pantry = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [pantry, setPantry] = useState([]);
  const [counter, setCounter] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    getItems(user).then((itemsFromApi) => {
      setPantry(itemsFromApi);
      setIsLoading(false);
    });
  }, [counter, isFocused]);

  const handleDeleteItem = (itemId) => {
    deleteItem(user, itemId).then(() => {
      setCounter((prev) => {
        return prev + 1;
      });
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={Gradient} style={styles.background}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <View style={styles.container2}>
            <Pressable
              style={({ pressed }) => [
                pressed ? styles.buttonPressed : styles.button,
              ]}
              onPress={() => {
                navigation.navigate("AddItem");
              }}
            >
              <Text style={styles.text}>Add-Item</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                pressed ? styles.buttonPressed : styles.button,
              ]}
              title={"Generate-Recipe"}
              onPress={() => {
                navigation.navigate("GenerateRecipe", { ingredients: pantry });
              }}
            >
              <Text style={styles.text}>Generate-Recipe</Text>
            </Pressable>
            <FlatList
              style={styles.list}
              data={pantry}
              renderItem={(itemData) => {
                return (
                  <View style={styles.item}>
                    <View>
                      <Text>ITEM NAME: {itemData.item.itemName}</Text>
                      <Text>AMOUNT: {itemData.item.amount}</Text>
                      <Text>EXPIRY: {itemData.item.expiryDate}</Text>
                    </View>
                    <View style={styles.listButtons}>
                      <Icon.Button
                        name="edit"
                        style={styles.listButton}
                        size={15}
                        onPress={() => {
                          navigation.navigate("AddItem", {
                            item: itemData.item,
                          });
                        }}
                      ></Icon.Button>
                      <Icon.Button
                        name="delete"
                        style={styles.listButton}
                        size={15}
                        onPress={() => {
                          handleDeleteItem(itemData.item.itemId);
                        }}
                      ></Icon.Button>
                    </View>
                  </View>
                );
              }}
              keyExtractor={(item) => {
                return item.itemId;
              }}
            />
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default Pantry;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    marginTop:"20%",
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
    marginTop: 20,
    backgroundColor: "#F4F6F4",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 32,
    elevation: 3,
    width: "60%",
    height: 40,
  },
  buttonPressed: {
    marginTop: 20,
    backgroundColor: "#F4F6F4",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 32,
    elevation: 3,
    width: "58%",
    height: 35,
  },
  text: {
    color: "#3B2314",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  list: {
    height: 40,
    width: "80%",
    marginTop: 25,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 5,
    margin: 5,
    
  },
  listButtons: {
    flex: 1,
    alignItems: "flex-end",
    margin: 5,
  },
  listButton: {
    backgroundColor: "#3b5998",
  },
});
