import { Image, Text, View, StyleSheet, ScrollView } from "react-native";
import { getRecipeById } from "../../Utils";
import React from "react";
import { useState, useEffect } from "react";
import RenderHtml from "react-native-render-html";

function SingleRecipe({ route }) {
  const [recipe, setRecipe] = useState({});
  let singleRecipeId = route.params.singleRecipeId;
  useEffect(() => {
    console.log(singleRecipeId);
    getRecipeById(singleRecipeId).then((res) => {
      setRecipe(res);
    });
  }, []);
  const summary = { html: recipe.summary };

  return (
    <ScrollView>
      <Text>{recipe.title}</Text>
      <Image
        style={styles.image}
        source={{ uri: recipe.image }}
        alt="recipe image"
      />
      <Text>
        Summary:
        <RenderHtml source={summary} />
      </Text>

      <Text>Instruction : {recipe.instructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 90,
    width: 90,
  },
});

export default SingleRecipe;
