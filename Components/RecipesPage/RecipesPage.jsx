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
  ImageBackground,
  Pressable,
} from "react-native";
import Gradient from "../../assets/Gradient.png";

import { getSpoonacularRecipes, searchRecipes } from "../../Utils";

function RecipesPage({ navigation, searchToggle, setSearchToggle }) {
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
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={Gradient} style={styles.background}>
        {searchToggle ? null : (
          <TextInput
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
        )}
        <View style={styles.container2}>
          {recipes.length > 0 ? (
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
                          {recipeData.item.name
                            ? recipeData.item.name
                            : recipeData.item.title}
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
          ) : (
            <Text>Oops! No recipes by that name</Text>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 90,
    width: 90,
    margin: 5,
  },
  searchBar: {
    alignSelf: "center",
    marginTop: "10%",
    width: "80%",
    textAlign: "center",
    backgroundColor: "white",
    height: 30,
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    marginTop: "20%",
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
    marginTop: 25,
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

export default RecipesPage;
