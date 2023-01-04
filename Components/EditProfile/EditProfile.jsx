import { View, Text, TextInput, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext/UserContext";
import { patchUser } from "../../Utils";

const EditProfile = () => {
  const { user } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");

    const handleSubmit = () => {
        patchUser({firstName, lastName, bio, userId: user});
    }

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
        <Pressable
          
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text>Submit</Text>
        </Pressable>
    </View>
  );
};

export default EditProfile;
