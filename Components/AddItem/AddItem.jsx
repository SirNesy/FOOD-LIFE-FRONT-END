import React, { useContext, useState } from "react";
import { StyleSheet, Text, Button, TextInput } from "react-native";
// import { postItem } from "../../Utils";
import { UserContext } from "../UserContext/UserContext";

const AddItem = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [itemName, setItemName] = useState("");
  const [amount, setAmount] = useState(0);
  const [expiryDate, setExpiryDate] = useState(0);

  return (
    <>
      <Text>Add Item!</Text>
      <TextInput
        style={styles.input}
        value={itemName}
        placeholder={"Item Name"}
        onChangeText={(text) => setItemName(text)}
        autoCapitalize={"none"}
      />
      <TextInput
        style={styles.input}
        value={amount}
        placeholder={"Amount"}
        keyboardType="numeric"
        onChangeText={(numbers) => setAmount(numbers)}
      />
      <TextInput
        style={styles.input}
        value={expiryDate}
        placeholder={"Expiry Date"}
        keyboardType="numeric"
        onChangeText={(numbers) => setExpiryDate(numbers)}
      />
      {/* <DateTimePicker onChange={console.log("hello")} /> */}
      <Button
        title={"Add Item"}
        onPress={() => {
          handleAddItem();
        }}
      />
    </>
  );
};

export default AddItem;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 30,
    backgroundColor: "#fff",
  },
});
