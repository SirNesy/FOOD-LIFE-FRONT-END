import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { UserContext } from "../UserContext/UserContext";
import { getUser } from "../../Utils";
import { useFocusEffect } from "@react-navigation/native";
import Gradient from "../../assets/Gradient.png";
import { ScrollView } from "react-native-gesture-handler";

const Profile = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const storage = getStorage();
  const pathReference = ref(storage, `/${user}.jpg`);

  const [userData, setUserData] = useState({});
  useFocusEffect(
    React.useCallback(() => {
      getUser(user).then((res) => {
        getDownloadURL(pathReference).then((url) => {
          res.profile_pic = url;
          console.log(res);
          setUserData(res);
        });
      });
    }, [])
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={Gradient} style={styles.background}>
        <ScrollView contentContainerStyle={styles.container2}>
        <Image style={styles.image} source={{ uri: userData.profile_pic }} />
        <Text style={styles.nameText}>
          {userData.firstName + " " + userData.lastName}
        </Text>
        <Text style={styles.bioText}>
          {userData.bio ? userData.bio : "Add a bio to tell us about yourself!"}
        </Text>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 200,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "25%",
    aspectRatio: 1,
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 150,
    marginTop: "50%"
    
  },
  nameText: {
    height: 40,
    width: "80%",
    margin: 15,
    fontSize: 32,
    textAlign: "center",
  },
  bioText: {
    margin: 30,
    Color: "#fff",
    justifyContent: "flex-start",
    textAlignVertical: "top",
    borderRadius: 10,
    paddingLeft: 10,
  },
});

export default Profile;
