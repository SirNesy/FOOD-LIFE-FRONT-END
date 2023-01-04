import axios from "axios";

const myApi = axios.create({ baseURL: "https://food-life.cyclic.app/api" });

export const postUser = ({
  firstName,
  lastName,
  email,
  userId,
  profile_pic = null,
}) => {
  return myApi
    .post("/users", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      profile_pic: profile_pic,
      userId: userId,
    })
    .then((res) => {
      return res.data.user;
    });
};

export const patchUser = ({
  firstName,
  lastName,
  bio,
  userId
}) => {
  return myApi
    .patch(`/users/${userId}`, {
      firstName: firstName,
      lastName: lastName,
      bio: bio
    })
    .then((res) => {
      return res.data.user;
    });
};

export const getUser = (userId) => {
  return myApi.get(`/users/${userId}`).then((res) => {
    return res.data.user;
  });
};

export const getItems = (userId) => {
  return myApi.get(`/users/${userId}/items`).then((res) => {
    return res.data.items;
  });
};

export const postItem = (userId, itemName, amount, expiryDate) => {
  return myApi
    .post(`/users/${userId}/items`, {
      itemName: itemName,
      amount: amount,
      expiryDate: expiryDate,
    })
    .then((res) => {
      return res.data.item;
    });
};

export const deleteItem = (userId, itemId) => {
  return myApi.delete(`/users/${userId}/items/${itemId}`).then(() => {});
};

export const patchItem = (userId, itemId, itemName, amount, expiryDate) => {
  return myApi
    .patch(`/users/${userId}/items/${itemId}`, {
      itemName: itemName,
      amount: amount,
      expiryDate: expiryDate,
    })
    .then((res) => {
      return res.data.item;
    });
};

export const getSpoonacularRecipes = () => {
  return axios
    .get(
      `https://api.spoonacular.com/food/search?apiKey=b4e5d93ee4364a2f84c5096aff0247d7&number=10`
    )
    .then((res) => {
      return res.data.searchResults[0].results;
    });
};
// Isa : b4e5d93ee4364a2f84c5096aff0247d7

export const getRecipeById = (recipeId) => {
  return axios
    .get(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=b4e5d93ee4364a2f84c5096aff0247d7`
    )
    .then((res) => {
      return res.data;
    });
};
//One : b4e5d93ee4364a2f84c5096aff0247d7

export const getRecipesByIngredient = (ingredients) => {
  return axios
    .get(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=15&apiKey=b4e5d93ee4364a2f84c5096aff0247d7`
    )
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
};

export const getBarcode = (barcode) => {
  return axios
    .get(
      `https://api.barcodelookup.com/v3/products?barcode=${barcode}&formatted=y&key=2wfgf7tqqtfqu6lgp1ss5wd2iamhmp`
    )
    .then((res) => {
      return JSON.parse(res.request._response).products[0].title;
    })
    .catch((err) => {
      if (err.code === 404) {
        return null;
      }
    });
};


export const searchRecipes = (searchTerm) => {
  return axios
    .get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&apiKey=b4e5d93ee4364a2f84c5096aff0247d7&number=100`
    )
    .then((res) => {
      console.log(res.data.results);
      return res.data.results;
    }).catch(err => {
      console.log(err)
    });
};
