import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import Gradient from "../../assets/Gradient.png";
import React, { useState, useEffect } from "react";
import { getRecipesByIngredient } from "../../Utils";

const GenerateRecipe = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  let ingredient = route.params.ingredients;
  const data = ingredient.map((item) => {
    return item.itemName;
  });
  let convert = [];
  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      convert.push(data[i]);
    } else {
      data[i] = "+" + data[i];
      convert.push(data[i]);
    }
  }
  const joinedString = convert.toString();

  useEffect(() => {
    getRecipesByIngredient(joinedString).then((res) => {
      setRecipes(res);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Text> loading...</Text>
  ) : (
    <View style={styles.container}>
      <ImageBackground source={Gradient} style={styles.background}>
        <FlatList
          style={styles.list}
          data={recipes}
          renderItem={(recipeData) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SingleRecipe", {
                    singleRecipeId: recipeData.item.id,
                  });
                }}
              >
                <View style={styles.item}>
                  <View>
                    <Image
                      style={styles.image}
                      source={{ uri: recipeData.item.image }}
                    />
                  </View>
                  <View style={styles.recipetitle}>
                    <Text style={styles.recipetext}>
                      {recipeData.item.title}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => {
            return item.id;
          }}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 90,
    width: 90,
    margin: 5,
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
  list: {
    height: 40,
    width: "80%",
    marginTop: 80,
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
  recipetext: {
    fontWeight: "700",
  },
});

export default GenerateRecipe;
