import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserProvider } from "./Components/UserContext/UserContext";
import Signin from "./Components/Signin/Signin";
import Signup from "./Components/Signup/Signup";
import AddItem from "./Components/AddItem/AddItem";
import Icon from "react-native-vector-icons/AntDesign";
import BarcodeScanner from "./Components/BarcodeScanner/BarcodeScanner";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import SingleRecipe from "./Components/SingleRecipe/SingleRecipe";
import DrawerNavigator from "./Components/DrawerNavigators/DrawerNavigator";
import HomeScreen from "./Components/HomeScreen/HomeScreen";
import GenerateRecipe from "./Components/GenerateRecipe/GenerateRecipe";
import { StyleSheet } from "react-native";
import EditProfile from "./Components/EditProfile/EditProfile";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Stack = createNativeStackNavigator();

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
        <Stack.Navigator screenOptions={{ headerTransparent: true }}>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{ headerTitle: "" }}
            name="Signin"
            component={Signin}
          />
          <Stack.Screen
            options={{ headerTitle: "" }}
            name="Signup"
            component={Signup}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Drawers"
            component={DrawerNavigator}
          />
          <Stack.Screen
            name="AddItem"
            options={({ navigation }) => ({
              headerTitle: "",
              headerShown: headerVisible,
              headerRight: () => (
                <Icon.Button
                  style={styles.icon}
                  name="camera"
                  size={30}
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

          <Stack.Screen
            options={{ headerTitle: "" }}
            name="SingleRecipe"
            component={SingleRecipe}
          />
          <Stack.Screen
            options={{ headerTitle: "" }}
            name="GenerateRecipe"
            component={GenerateRecipe}
          />
          <Stack.Screen
            options={{ headerTitle: "" }}
            name="BarcodeScanner"
            component={BarcodeScanner}
          />
          <Stack.Screen options={{ headerTitle: "" }} name="EditProfile" component={EditProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    backgroundColor: "#00000000",
    alignItems: "center",
  },
});

// triggerDate.getTime() - 1000 * 60 * 60 * 12
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
