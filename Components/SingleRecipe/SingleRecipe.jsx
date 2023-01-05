import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  useWindowDimensions,
} from "react-native";
import { getRecipeById } from "../../Utils";
import React from "react";
import { useState, useEffect } from "react";
import RenderHtml from "react-native-render-html";
import Gradient from "../../assets/Gradient.png";

function SingleRecipe({ route }) {
  const [recipe, setRecipe] = useState({});
  const [loading, setIsLoading] = useState(true);
  const { width } = useWindowDimensions();

  let singleRecipeId = route.params.singleRecipeId;
  useEffect(() => {
    getRecipeById(singleRecipeId).then((res) => {
      setRecipe(res);
      setIsLoading(false);
    });
  }, []);

  const summary = { html: recipe.summary };
  const instructions = { html: recipe.instructions };

  return (
    <View style={styles.container}>
      <ImageBackground source={Gradient} style={styles.background}>
      {loading ? (
    <Text>loading....</Text>
  ) : (
        <ScrollView
        showsVerticalScrollIndicator = {false}
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
            <Text style={styles.ingredients}> INGREDIENTS </Text>
            {recipe.extendedIngredients.map((ingredient) => {
              return (
                <Text key={`${ingredient.id}${ingredient.name}`}>
                  {ingredient.name} : {ingredient.amount} {ingredient.unit}
                </Text>
              );
            })}
          </View>

          <View style={styles.summary}>
            <Text style={styles.ingredients}>SUMMARY</Text>
            <RenderHtml
              source={summary}
              contentWidth={width}
              enableExperimentalMarginCollapsing={true}
            />
          </View>
          <Text style={styles.instruction}>INSTRUCTIONS </Text>
          <RenderHtml
            source={instructions}
            contentWidth={width}
            enableExperimentalMarginCollapsing={true}
          />
        </ScrollView>)}
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
    paddingBottom: 200,
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
    height: 250,
    aspectRatio: 1,
    
    borderRadius: 10,
    borderWidth:5,
    borderColor: "#fff",
    alignSelf: "center",
  },
  title: {
    marginTop: 15,
    fontWeight: "800",
    fontSize: 30,
  },
  inglist: {
    marginTop: 15,
    alignItems: "center",
  },
  ingredients: {
    marginBottom: 15,
    fontWeight: "500",
    fontSize: 20,
  },
  summary: {
    marginTop: 15,
    alignItems: "center",
    
  },
  scroll: {
    height: "100%",
  },
  instruction: {
    fontWeight: "500",
    fontSize: 20,
    marginTop: 15,
    marginBottom: 15,
  },
});

export default SingleRecipe;
