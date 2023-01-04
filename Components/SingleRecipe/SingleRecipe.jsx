import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { getRecipeById } from "../../Utils";
import React from "react";
import { useState, useEffect } from "react";
import RenderHtml from "react-native-render-html";
import Gradient from "../../assets/Gradient.png";

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

  return loading ? (
    <Text>loading....</Text>
  ) : (
    <View style={styles.container}>
      <ImageBackground source={Gradient} style={styles.background}>
        <ScrollView>
          <Image
            style={styles.image}
            source={{ uri: recipe.image }}
            alt="recipe image"
          />
          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.ingredients}> INGREDIENTS: </Text>
          <View>
            {recipe.extendedIngredients.map((ingredient) => {
              return (
                <Text key={ingredient.id}>
                  {ingredient.name} : {ingredient.amount} {ingredient.unit}
                </Text>
              );
            })}
          </View>

          <Text>
            Summary:
            <RenderHtml source={summary} />
          </Text>

          <Text>Instruction : {recipe.instructions}</Text>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
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
  image: {
    height: "30%",
    width: "65%",
    margin: 70,
    borderRadius: 5,
  },
  title: {
    fontWeight: "800",
    fontSize: 30,
  },
  ingredients: {
    fontWeight: 500,
  },
});

export default SingleRecipe;
