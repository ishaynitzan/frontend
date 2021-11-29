import Vue from "vue";
import Vuex from "vuex";

import { userService } from "../services/user.service.js";

Vue.use(Vuex);

export default{
  strict: true,
  state: {
   user : null
  },
  getters: {
  },
  mutations: {
    setUser(state, { currUser }) {
      state.user = currUser;
    }
  },
  actions: {
    async setLogin({ commit }, { user }) {
    
      try{
        const currUser = await userService.login(user.username, user.password)
        commit({type: "setUser", currUser})
        return currUser
      }catch(err){
        console.log('login store front:', err)
      }

    },
  },
};
