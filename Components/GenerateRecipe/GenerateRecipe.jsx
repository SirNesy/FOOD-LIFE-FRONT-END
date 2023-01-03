import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
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
    <>
      <FlatList
        data={recipes}
        renderItem={(recipeData) => {
          return (
            <View style={styles.item}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SingleRecipe", {
                    singleRecipeId: recipeData.item.id,
                  });
                }}
              >
                <Image
                  style={styles.image}
                  source={{ uri: recipeData.item.image }}
                />
                <Text>{recipeData.item.title}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item) => {
          return item.id;
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 100,
    margin: 30,
    backgroundColor: "#fff",
    display: "flex",
  },
  image: {
    height: 90,
    width: 90,
  },
});

export default GenerateRecipe;
