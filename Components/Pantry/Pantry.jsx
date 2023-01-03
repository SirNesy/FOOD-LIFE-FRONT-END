import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, FlatList, View, Button } from "react-native";
import { deleteItem, getItems } from "../../Utils";
import { UserContext } from "../UserContext/UserContext";
import Icon from "react-native-vector-icons/AntDesign";
import { useIsFocused } from "@react-navigation/native";

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
    <>
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
      )}
    </>
  );
};

export default Pantry;

const styles = StyleSheet.create({
  item: {
    height: 100,
    margin: 30,
    backgroundColor: "#fff",
  },
});
