import { View, Text, Image, StyleSheet} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { UserContext } from '../UserContext/UserContext'
import { getUser } from '../../Utils';

const Profile = () => {
    const { user } = useContext(UserContext);
    const storage = getStorage();
    const pathReference = ref(storage, `/${user}.jpg`);

    const [userData, setUserData] = useState({})
    useEffect(() => {
      getUser(user).then((res) => {
        
        
        getDownloadURL(pathReference).then(url => {
            res.profile_pic = url
            console.log(res)
            setUserData(res)
        }
        
      )})
    }, [])
    
  return (
    <View>
        <Image style={styles.image} source={{uri: userData.profile_pic}}/>
      <Text>{userData.firstName + " " + userData.lastName}</Text>
      <Text>{userData.bio ? userData.Bio : "Add a bio to tell us about yourself!"}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    image: {
      height: 90,
      width: 90,
    },
    searchBar: {
      alignSelf: "center",
      marginTop: "10%",
      width: "80%",
      textAlign: "center",
      backgroundColor: "white",
      height: 30,
    },
    container: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    container2: {
      marginTop: "20%",
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
    list: {
      height: 40,
      width: "80%",
      marginTop: 25,
    },
    item: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#fff",
      borderRadius: 5,
      margin: 5,
    },
    recipetitle: {
      width: 0,
      flexGrow: 1,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default Profile