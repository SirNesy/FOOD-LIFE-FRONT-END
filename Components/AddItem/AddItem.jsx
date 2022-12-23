import React, { useContext, useState } from "react";
import { StyleSheet, Text, Button, TextInput, Alert } from "react-native";
import { patchItem, postItem } from "../../Utils";
import { UserContext } from "../UserContext/UserContext";
import DatePicker from "react-native-modern-datepicker";


const AddItem = ({ navigation, route, setHeaderVisible }) => {
  
  console.log(route.params)
  const { user } = useContext(UserContext);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [itemName, setItemName] = useState(
    !route.params ? "" : route.params.item.itemName
  );
  const [amount, setAmount] = useState(
    !route.params ? "" : route.params.item.amount
  );
  const [expiryDate, setExpiryDate] = useState(
    !route.params ? null : route.params.item.expiryDate
  );

  const handleAddItem = () => {
    postItem(user, itemName, amount, expiryDate).then(() => {
      Alert.alert("Success!", `${itemName} was successfully added to pantry`);
      
      navigation.navigate("Pantry");
    });
  };

  const handleEditItem = (itemId) => {
    patchItem(user, itemId, itemName, amount, expiryDate).then(() => {
      Alert.alert(
        "Success!",
        `${itemName} was successfully updated in your pantry`
      );
      navigation.navigate("Pantry");
    });
  };

  return (
    <>
      {calendarVisible ? (
        <DatePicker
        style={styles.calendar}
          mode="calendar"
          onSelectedChange={(date) => {
            setExpiryDate(date);
            setCalendarVisible(false);
            setHeaderVisible(true)
          }}
        />
      ) : (
        <>
          {!route.params ? <Text>Add Item!</Text> : <Text>Edit Item!</Text>}

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
            showSoftInputOnFocus={false}
            onFocus={() => {
              setCalendarVisible(true)
            setHeaderVisible(false)}}
            onChangeText={(numbers) => setExpiryDate(numbers)}
          />
          <Button
            title={!route.params ? "Add Item" : "Edit Item"}
            onPress={() => {
              !route.params
                ? handleAddItem()
                : handleEditItem(route.params.item.itemId);
            }}
          />
        </>
      )}
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
  calendar: {
    marginTop:"50%"
  }
});
