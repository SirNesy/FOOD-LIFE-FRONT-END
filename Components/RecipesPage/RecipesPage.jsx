import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  SearchBar,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getSpoonacularRecipes } from "../../Utils";

function RecipesPage({ navigation }) {
  const nav = useNavigation();

  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    getSpoonacularRecipes().then((res) => {
      setRecipes(res);
    });
  }, []);

  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch(search);
  };
  useEffect(() => {
    nav.setOptions({
      header: () => {
        return (
          <SafeAreaView>
            <TextInput
              placeholder="Type Here..."
              onChangeText={updateSearch}
              value={search}
            />
          </SafeAreaView>
        );
      },
    });
  }, [nav]);

  {
    /* <SearchBar
      placeholder="Type Here..."
      onChangeText={updateSearch}
      value={search}
    /> */
  }

  return (
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
                <Text>{recipeData.item.name}</Text>
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
