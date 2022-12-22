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
