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
      `https://api.spoonacular.com/food/search?apiKey=a9abf0d5fdeb4803b73a7c04f59572dd&number=10`
    )
    .then((res) => {
      return res.data.searchResults[0].results;
    });
};

export const getBarcode = (barcode) => {
  return axios
    .get(`https://api.barcodelookup.com/v3/products?barcode=${barcode}&formatted=y&key=2wfgf7tqqtfqu6lgp1ss5wd2iamhmp`)
    .then((res) => {
      return (JSON.parse(res.request._response).products[0].title)
    }).catch(err => {
      if (err.code === 404) {
        return null;
      }
    })
}