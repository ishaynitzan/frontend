const axios = require("axios").default;
import { httpService } from "./http.service.js";

export const userService = {
  login,
  logout,
  signup,
};

const STORAGE_KEY = "loggedinUser";

const BASE_URL = process.env.NODE_ENV !== "development" ? "auth" : "auth";

async function login(username, password) {
  try {
    const user = await httpService.post(BASE_URL + "/login", {
      username,
      password,
    });
    var userPrint = JSON.parse(JSON.stringify(user))
    delete userPrint._id
    console.log("Login user:", userPrint);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  } catch (err) {
    console.log(err);
    eventBus.$emit("show-msg", { txt: "Invalid User/Password" });
  }
}
async function signup(username, password, fullname) {
  try {
    const newUser = await httpService.post(BASE_URL + "/signup", {
      username,
      password,
      fullname,
    });
    console.log("New user:", newUser);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    return newUser;
  } catch (err) {
    console.log(err);
    eventBus.$emit("show-msg", { txt: "Signup failed" });
    // return axios
    //   .post( BASE_URL + "/signup", { username, password })
    //   .then((res) => res.data)
    //   .then((user) => {
    //     console.log("New user:", user);
    //     sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    //     return user;
    //   });
  }
}

async function logout() {
  try {
    const user = await httpService.post("/logout");
    console.log(`${user} has logout.`)
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.log(err);
    eventBus.$emit("show-msg", { txt: "Logout failed" });
  }
}
