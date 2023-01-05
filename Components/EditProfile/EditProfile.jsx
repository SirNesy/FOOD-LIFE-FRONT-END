import { Image, View, Text, TextInput, Pressable, Button, StyleSheet, ImageBackground} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext/UserContext";
import { getUser, patchUser } from "../../Utils";
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import Gradient from "../../assets/Gradient.png";
import AddPhoto from "../../assets/AddPhoto.png";
import Icon from "react-native-vector-icons/Feather";

const EditProfile = ({navigation}) => {
  const storage = getStorage();
  const { user } = useContext(UserContext);
  const [image, setImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [imageBlob, setImageBlob] = useState(null);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUser(user).then((res) => { 
      const pathReference = ref(storage, `/${user}.jpg`);
      console.log(res)
      setFirstName(res.firstName)
      setLastName(res.lastName)
      setBio(res.bio)
      if (res.profile_pic) {
        getDownloadURL(pathReference).then((url) => {
        setImage(url)
        setIsLoading(false);
      });
      } else {
        setIsLoading(false);
      }
      
    });
    
  }, [])
  
    
    const storageRef = ref(storage, `/${user}.jpg`)
    const handleSubmit = () => {
        if(imageBlob) {
          uploadBytes(storageRef, imageBlob).then(snapshot => {
          })
        }
        patchUser({firstName, lastName, bio, image, userId: user});
        
        
        navigation.navigate("My Profile");
    }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        if (!result.canceled) {
          setImage(result.assets[0].uri)
          const response = await fetch(result.assets[0].uri);
          const blob = await response.blob();
          setImageBlob(blob);
        }
      };

  return (
    <View style={styles.container}>
      <ImageBackground source={Gradient} style={styles.background}>
      {loading ? (
    <Text>loading....</Text>
  ) : ( <>
      <Pressable style={styles.imgPressable}
          onPress={pickImage}
        >
          <Icon style={styles.icon} name="edit-2" color="#FFF" size={40} />
          
          {image ? <Image source={{ uri: image }} style={styles.image}/> : <Image style={styles.image} source={AddPhoto} />}
          
        </Pressable>
      <TextInput style={styles.input} value={firstName}
          placeholder={"First Name"}
          onChangeText={(text) => setFirstName(text)}
          autoCapitalize={"none"}></TextInput>
      <TextInput style={styles.input} value={lastName}
          placeholder={"Last Name"}
          onChangeText={(text) => setLastName(text)}
          autoCapitalize={"none"}></TextInput>
      <TextInput style={styles.inputBio} value={bio}
          placeholder={"Tell us about yourself!"}
          onChangeText={(text) => setBio(text)}
          autoCapitalize={"none"}></TextInput>
        <Pressable style={({ pressed }) => [
            pressed ? styles.buttonPressed : styles.button,
          ]}
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text>Submit</Text>
        </Pressable></>)}
        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imgPressable: {
    height: 200,
    width: 200,
  },
  icon: {
    alignSelf: "flex-end",
    position: "absolute",
    zIndex: 9999,
  },
  
  image: {
    height: "90%",
    width: "90%",
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 150,
    alignSelf: "center",
  },
  input: {
    height: 40,
    width: "80%",
    margin: 15,
    backgroundColor: "#fff",
    textAlign: "left",
    paddingLeft: 10,
    borderRadius: 5,
  },
  inputBio: {
    height: "25%",
    width: "80%",
    margin: 15,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    textAlignVertical: "top",
    borderRadius: 10,
    padding: 10,
  },
  button: {
    marginTop: 15,
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
});

export default EditProfile;
