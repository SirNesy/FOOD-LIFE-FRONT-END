import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, FlatList, View, Button,
  ImageBackground,
  Pressable,
  Image} from "react-native";
import { deleteItem, getItems } from "../../Utils";
import { UserContext } from "../UserContext/UserContext";
import Icon from "react-native-vector-icons/AntDesign";
import { useIsFocused } from "@react-navigation/native";
import Gradient from "../../assets/Gradient.png";
import Logo from "../../assets/Logo.png";

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
        <>
          <Button
            title={"Add-Item"}
            onPress={() => {
              navigation.navigate("AddItem");
            }}
          />
          <Button
            title={"Generate-Recipe"}
            onPress={() => {
              navigation.navigate("GenerateRecipe", { ingredients: pantry });
            }}
          />
          <FlatList
            data={pantry}
            renderItem={(itemData) => {
              return (
                <View style={styles.item}>
                  <Text>Item Name: {itemData.item.itemName}</Text>
                  <Text>Amount: {itemData.item.amount}</Text>
                  <Text>Expiry Date: {itemData.item.expiryDate}</Text>
                  <Icon.Button
                    name="edit"
                    backgroundColor="#3b5998"
                    size={10}
                    onPress={() => {
                      navigation.navigate("AddItem", {
                        item: itemData.item,
                      });
                    }}
                  ></Icon.Button>
                  <Icon.Button
                    name="delete"
                    backgroundColor="#3b5998"
                    size={10}
                    onPress={() => {
                      handleDeleteItem(itemData.item.itemId);
                    }}
                  ></Icon.Button>
                </View>
              );
            }}
            keyExtractor={(item) => {
              return item.itemId;
            }}
          />
        </>
      )}</ImageBackground>
    </View>
  );
};

export default Pantry;

const styles = StyleSheet.create({
  item: {
    height: 100,
    margin: 30,
    backgroundColor: "#fff",
  },
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
