import { utilService } from "./util.service.js";
const axios = require("axios").default;
import { httpService } from "./http.service.js";
const KEY = "gToys";
const LABELS = "toy-labels";

export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy,
  getToyCopy,
};

const BASE_URL = process.env.NODE_ENV !== "development" ? "toy" : "toy";

async function query(filterBy = null) {
  console.log('filterBy',filterBy);
  // return axios.get(BASE_URL, {params :filterBy}).then((res) => res.data);
  try {
    return await httpService.get(BASE_URL, filterBy);
  } catch (err) {
    console.log("error:", err);
  }
}

async function getById(id) {
  // return axios.get(BASE_URL + `/${id}`).then((res) => res.data);
  try {
    return await httpService.get(BASE_URL + `/${id}`);
  } catch (err) {
    console.log("error:", err);
  }
}

async function remove(id) {
  // return axios.delete(BASE_URL + `/${id}`).then((res) => res.data);
  try {
    return await httpService.delete(BASE_URL + `/${id}`);
  } catch (err) {
    console.log("error:", err);
  }
}

async function save(toy) {
  // return toy._id
  // ? axios.put(BASE_URL, { toy }).then((res) => res.data)
  //   : axios.post(BASE_URL, { toy }).then((res) => res.data);
  try {
    return toy._id
      ? await httpService.put(BASE_URL, { toy })
      : await httpService.post(BASE_URL, { toy });
  } catch (err) {
    console.log("error:", err);
  }
}

function getEmptyToy() {
  return {
    _id: null,
    title: "",
    isDone: false,
    labels: [],
    importance: 1,
    createdAt: null,
  };
}

function getToyCopy(toyId) {
  const toy = todoService.getById(toyId);
  return JSON.parse(JSON.stringify(toy));
}
