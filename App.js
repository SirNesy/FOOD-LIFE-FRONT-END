import { StyleSheet, Text, View } from "react-native";
import Signup from "./Components/Signup/Signup";

export default function App() {
  return (
    <View style={styles.container}>
      <Signup />
      <Text>Hello World!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
