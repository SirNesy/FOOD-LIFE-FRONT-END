import * as React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserProvider } from "./Components/UserContext/UserContext";
import Signin from "./Components/Signin/Signin";
import Signup from "./Components/Signup/Signup";
import Pantry from "./Components/Pantry/Pantry";
import AddItem from "./Components/AddItem/AddItem";
import RecipesPage from "./Components/RecipesPage/RecipesPage";
import Icon from "react-native-vector-icons/AntDesign";
import BarcodeScanner from "./Components/BarcodeScanner/BarcodeScanner";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import SingleRecipe from "./Components/SingleRecipe/SingleRecipe";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #E8B58D 0%, #B73B51 100%)",
      }}
    >
      <Text>Home Screen</Text>
      <Button title="Sign-in" onPress={() => navigation.navigate("Signin")} />
      <Button title="Sign-up" onPress={() => navigation.navigate("Signup")} />
      <Button
        title="RecipesPage"
        onPress={() => navigation.navigate("RecipesPage")}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [headerVisible, setHeaderVisible] = React.useState(true);
  const [expoPushToken, setExpoPushToken] = React.useState("");
  const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Pantry" component={Pantry} />
          <Stack.Screen
            name="AddItem"
            options={({ navigation }) => ({
              headerShown: headerVisible,
              headerRight: () => (
                <Icon.Button
                  name="camera"
                  size={10}
                  onPress={() => {
                    navigation.navigate("BarcodeScanner");
                  }}
                ></Icon.Button>
              ),
            })}
          >
            {(props) => (
              <AddItem
                {...props}
                setHeaderVisible={setHeaderVisible}
                schedulePushNotification={schedulePushNotification}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="RecipesPage" component={RecipesPage} />
          <Stack.Screen name="SingleRecipe" component={SingleRecipe} />
          <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

async function schedulePushNotification(item, expiryDate) {
  let triggerDate = new Date(expiryDate);
  const trigger = new Date(triggerDate.getTime() - 1000 * 60 * 60 * 12);
  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: `Oh No! Your ${item} will expire tomorrow! 😲`,
      body: `Here are 10 recipes that include ${item}`,
      data: { data: "goes here" },
    },
    trigger,
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
