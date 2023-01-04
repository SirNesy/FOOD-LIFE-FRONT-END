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

import { getSpoonacularRecipes, searchRecipes } from "../../Utils";

function RecipesPage({ navigation, searchToggle, setSearchToggle}) {
  

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
  const handleSubmit = () => {
    searchRecipes(search).then((res) => {
      setRecipes(res);
    })
  }

  return (
    <>
      { searchToggle ? null
             : <TextInput
              style={styles.searchBar}
              placeholder="Type Here..."
              onChangeText={updateSearch}
              value={search} 
              autoFocus={true}
              onBlur={() => {
                setSearchToggle(true);
              }}
              onSubmitEditing={handleSubmit}
              />
              
              }
      {recipes.length > 0 ? <FlatList
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
                <Text>{recipeData.item.name ? recipeData.item.name : recipeData.item.title}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item) => {
          return item.id;
        }}
      /> : <Text>Oops! No recipes by that name</Text>}
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
  searchBar: {
    alignSelf: "center",
    marginTop: "10%",
    width: "80%",
    textAlign: "center",
    backgroundColor: "white",
    height: 30
  }
});

export default RecipesPage;
