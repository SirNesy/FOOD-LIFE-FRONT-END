import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Alert,
  View,
  ImageBackground,
  Pressable,
} from "react-native";
import { patchItem, postItem } from "../../Utils";
import { UserContext } from "../UserContext/UserContext";
import DatePicker from "react-native-modern-datepicker";
import Gradient from "../../assets/Gradient.png";

const AddItem = ({
  navigation,
  route,
  setHeaderVisible,
  schedulePushNotification,
}) => {
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
    postItem(user, itemName, amount, expiryDate).then(async () => {
      Alert.alert("Success!", `${itemName} was successfully added to pantry`);
      await schedulePushNotification(itemName, expiryDate);
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
    <View style={styles.container}>
      <ImageBackground source={Gradient} style={styles.background}>
        {calendarVisible ? (
          <DatePicker
            style={styles.calendar}
            mode="calendar"
            onSelectedChange={(date) => {
              setExpiryDate(date);
              setCalendarVisible(false);
              setHeaderVisible(true);
            }}
          />
        ) : (
          <>
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
                setCalendarVisible(true);
                setHeaderVisible(false);
              }}
              onChangeText={(numbers) => setExpiryDate(numbers)}
            />
            <Pressable
              style={({ pressed }) => [
                pressed ? styles.buttonPressed : styles.button,
              ]}
              onPress={() => {
                !route.params
                  ? handleAddItem()
                  : handleEditItem(route.params.item.itemId);
              }}
            >
              <Text style={styles.text}>
                {!route.params ? "Add Item" : "Edit Item"}
              </Text>
            </Pressable>
          </>
        )}
      </ImageBackground>
    </View>
  );
};

export default AddItem;

const styles = StyleSheet.create({
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
  text: {
    color: "#3B2314",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  calendar: {
    marginTop: "50%",
  },
});
