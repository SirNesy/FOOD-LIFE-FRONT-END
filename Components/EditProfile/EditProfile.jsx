import { View, Text, TextInput, Pressable, Button, Image} from "react-native";
import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext/UserContext";
import { patchUser } from "../../Utils";
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, putFile} from "firebase/storage";

const EditProfile = () => {
  const { user } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
    const storage = getStorage();
    const storageRef = ref(storage, `/${user}.jpg`)

    const handleSubmit = () => {
        patchUser({firstName, lastName, bio, userId: user});
        uploadBytes(storageRef, image).then(snapshot => {
            console.log("uploaded a file!")
        })
    }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          const response = await fetch(result.assets[0].uri)
          const blob = await response.blob();
          setImage(blob);
        }
        
      };

  return (
    <View>
      <Text>EditProfile</Text>
      <TextInput value={firstName}
          placeholder={"First Name"}
          onChangeText={(text) => setFirstName(text)}
          autoCapitalize={"none"}></TextInput>
      <TextInput value={lastName}
          placeholder={"Last Name"}
          onChangeText={(text) => setLastName(text)}
          autoCapitalize={"none"}></TextInput>
      <TextInput value={bio}
          placeholder={"Tell us about yourself!"}
          onChangeText={(text) => setBio(text)}
          autoCapitalize={"none"}></TextInput>
          <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <Pressable
          
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text>Submit</Text>
        </Pressable>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
};

export default EditProfile;
