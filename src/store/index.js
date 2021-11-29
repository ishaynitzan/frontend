import Vue from "vue";
import Vuex from "vuex";

import { toyService } from "../services/toy.service.js";
import userStore from '../store/userStore.js'
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    toys: [],
    status: {},
    labels: [
      "On wheels",
      "Box game",
      "Art",
      "Baby",
      "Doll",
      "Puzzle",
      "Outdoor",
    ],
    // filterBy: "all",
    filterBy: {},
    isLoading: false,
    search: null,
    lastRemovedToy: null,
    currToy: null,
  },
  getters: {
    toysToShow(state) {
      return JSON.parse(JSON.stringify(state.toys));
    },
    allToys(state) {
      return state.toys;
    },
    getProgress(state) {
      const done = state.toys.filter((toy) => toy.isDone === true);

      return done.length / state.toys.length;
    },
    currToy(state) {
      return state.currToy;
    },
    isLoading(state) {
      return state.isLoading;
    },
    labels(state) {
      return state.labels;
    },
  },
  mutations: {
    setToys(state, { toys }) {
      state.toys = toys;
    },
    addToy(state, { toy }) {
      state.toys.push(toy);
    },

    updateToy(state, { toy }) {
      const idx = state.toys.findIndex((currToy) => currToy._id === toy._id);
      state.toys.splice(idx, 1, toy);
    },

    toggleToy(state, { toy }) {
      const idx = state.toys.findIndex((currToy) => currToy._id === toy._id);
      state.toys.splice(idx, 1, toy);
    },
    remove(state, { id }) {
      const idx = state.toys.findIndex((currToy) => currToy._id === id);
      const toy = state.toys.splice(idx, 1);
      state.lastRemovedToy = toy;
    },
    setFilter(state, { filter }) {
      state.filterBy = filter;
    },
  
    currToy(state, { toyId }) {
      const idx = state.toys.findIndex((toy) => toy._id === toyId);
      state.currToy = state.toys[idx];
    },
    setLoading(state, { isLoading }) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    loadToys({ commit }, { filterBy = null }) {
      console.log('filterBy',filterBy);
      commit({ type: "setLoading", isLoading: true });
      toyService
        .query(filterBy)
        .then((toys) => {
          commit({ type: "setToys", toys });
        })
        .finally(() => {
          commit({ type: "setLoading", isLoading: false });
        });
    },
    toyById({ commit }, { id }) {
      return toyService.getById(id).then((currToy) => {
        commit({ type: "currToy", toyId: id });
        return currToy;
      });
    },
    editToy({ commit }, { toy }) {
      return toyService.save(toy).then((currToy) => {
        if (toy._id) {
          commit({ type: "updateToy", toy: currToy });
        } else {
          commit({ type: "addToy", toy: currToy });
        }
      });
    },
    saveToy({ commit }, { toy }) {
      return toyService.save(toy).then((currToy) => {
        commit({ type: "addToy", toy: currToy });
      });
    },
    removeToy({ commit }, { id }) {
      return toyService.remove(id).then(() => {
        commit("remove", { id });
      });
    },
  },
  modules: {
    userStore
  },
});
