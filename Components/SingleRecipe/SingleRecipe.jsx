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
  const instructions = { html: recipe.instructions };
  return loading ? (
    <Text>loading....</Text>
  ) : (
    <View style={styles.container}>
      <ImageBackground source={Gradient} style={styles.background}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          <Image
            style={styles.image}
            source={{ uri: recipe.image }}
            alt="recipe image"
          />
          <Text style={styles.title}>{recipe.title}</Text>

          <View style={styles.inglist}>
            <Text style={styles.ingredients}> INGREDIENTS: </Text>
            {recipe.extendedIngredients.map((ingredient) => {
              return (
                <Text key={ingredient.id}>
                  {ingredient.name} : {ingredient.amount} {ingredient.unit}
                </Text>
              );
            })}
          </View>

          <View style={styles.summary}>
            <Text style={styles.ingredients}>
              SUMMARY:
              <RenderHtml source={summary} />
            </Text>
          </View>

          <Text style={styles.instruction}>
            Instruction : 
            <RenderHtml source={instructions} />
          </Text>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
    paddingBottom: 50,
  },
  scrollView: {
    height: "70%",
    width: "90%",
    margin: 20,
    alignSelf: "center",
    padding: 20,
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
    marginTop: 80,
    borderRadius: 5,
    alignSelf: "center",
  },
  title: {
    fontWeight: "800",
    fontSize: 30,
  },
  inglist: {
    alignItems: "center",
  },
  ingredients: {
    fontWeight: "500",
  },
  summary: {
    margin: 1,
  },
  scroll: {
    height: "100%",
  },
  instruction: {
    marginBottom: 10,
  },
});

export default SingleRecipe;
