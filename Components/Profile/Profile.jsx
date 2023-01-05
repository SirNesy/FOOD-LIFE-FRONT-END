import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { UserContext } from "../UserContext/UserContext";
import { getUser } from "../../Utils";
import { useFocusEffect } from "@react-navigation/native";
import Gradient from "../../assets/Gradient.png";
import AddPhoto from "../../assets/AddPhoto.png";
import { ScrollView } from "react-native-gesture-handler";

const Profile = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const storage = getStorage();
  const pathReference = ref(storage, `/${user}.jpg`);
  const [loading, setIsLoading] = useState(true);

  const [userData, setUserData] = useState({});
  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      setTimeout(() => {
        getUser(user).then((res) => {
          if (res.profile_pic) {
            getDownloadURL(pathReference).then((url) => {
              res.profile_pic = url;
              setUserData(res);
              setIsLoading(false);
            });
          } else {
            setUserData(res);
            setIsLoading(false);
          }
        });
      }, 500);
    }, [])
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={Gradient} style={styles.background}>
        {loading ? (
          <Text>loading....</Text>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container2}
          >
            {userData.profile_pic ? (
              <Image
                style={styles.image}
                source={{ uri: userData.profile_pic }}
              />
            ) : (
              <Image style={styles.image} source={AddPhoto} />
            )}
            <Text style={styles.nameText}>
              {userData.firstName + " " + userData.lastName}
            </Text>
            <Text style={styles.bioText}>
              {userData.bio
                ? userData.bio
                : "Add a bio to tell us about yourself!"}
            </Text>
          </ScrollView>
        )}
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 200,
  },
  background: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 200,
    aspectRatio: 1,
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 150,
    marginTop: "50%",
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
