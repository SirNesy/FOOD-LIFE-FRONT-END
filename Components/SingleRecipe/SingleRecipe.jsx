import { Image, Text, View, StyleSheet, ScrollView } from "react-native";
import { getRecipeById } from "../../Utils";
import React from "react";
import { useState, useEffect } from "react";
import RenderHtml from "react-native-render-html";

function SingleRecipe({ route }) {
  const [recipe, setRecipe] = useState({});
  const [loading, setIsLoading] = useState(true);

  let singleRecipeId = route.params.singleRecipeId;
  useEffect(() => {
    getRecipeById(singleRecipeId).then((res) => {
      setRecipe(res);
      setIsLoading(false);
    });
  }, []);
  const summary = { html: recipe.summary };
  //   console.log(ingredientArray[0].name);
  //   let ingredientArray = [...recipe.extendedIngredients];

  return loading ? (
    <Text>loading....</Text>
  ) : (
    <ScrollView>
      <Text>{recipe.title}</Text>
      <Image
        style={styles.image}
        source={{ uri: recipe.image }}
        alt="recipe image"
      />
      <Text> Ingredients: </Text>
      {recipe.extendedIngredients.map((ingredient) => {
        return (
          <Text>
            {ingredient.name} : {ingredient.amount} {ingredient.unit}
          </Text>
        );
      })}
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
