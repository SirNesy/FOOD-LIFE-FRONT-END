import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text, FlatList } from "react-native";
import { getSpoonacularRecipes } from "../../Utils";

function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    getSpoonacularRecipes().then((res) => {
      setRecipes(res);
    });
  }, []);

  return (
    <>
      <FlatList
        data={recipes}
        renderItem={(recipeData) => {
          return (
            <View style={styles.item}>
              <Image
                style={styles.image}
                source={{ uri: recipeData.item.image }}
              />
              <Text>{recipeData.item.name}</Text>
            </View>
          );
        }}
        keyExtractor={(item) => {
          return item.id;
        }}
      />
    </>
  );
}

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

export default RecipesPage;
