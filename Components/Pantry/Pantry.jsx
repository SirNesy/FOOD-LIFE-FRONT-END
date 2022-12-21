import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, FlatList, View, Button } from "react-native";
import { getItems } from "../../Utils";
import { UserContext } from "../UserContext/UserContext";

const Pantry = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [pantry, setPantry] = useState([]);

  useEffect(() => {
    getItems(user).then((itemsFromApi) => {
      setPantry(itemsFromApi);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Text>Pantry!</Text>
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
          <FlatList
            data={pantry}
            renderItem={(itemData) => {
              return (
                <View style={styles.item}>
                  <Text>Item Name: {itemData.item.itemName}</Text>
                  <Text>Amount: {itemData.item.amount}</Text>
                  <Text>Expiry Date: {itemData.item.expiryDate}</Text>
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
