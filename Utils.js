import axios from "axios";

const myApi = axios.create({ baseURL: "http://localhost:9494" });

export const postUser = ({
  firstName,
  lastName,
  email,
  userId,
  profile_pic = null,
}) => {
  return myApi
    .post("http://192.168.0.193:9494/api/users", {
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
