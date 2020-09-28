import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

// 추후 실제 url로 변경할 것
const resourceHost = "http://localhost:3000/api";

export default new Vuex.Store({
  state: {
    userId: "",
    nickName: "",
    accessToken: null,
  },
  mutations: {
    LOGIN(state, user) {
      state.accessToken = user.accessToken;
      state.userId = user.id;
      state.nickName = user.nickName;
    },
    LOGOUT(state) {
      state.accessToken = null;
    },
  },
  actions: {
    LOGIN({ commit }, { nickName, pwd }) {
      console.log(`닉네임: ${nickName}, 비번: ${pwd}`);
      return axios
        .post(`${resourceHost}/login`, { nickName, pwd })
        .then((data) => commit("LOGIN", data));
    },
    LOGOUT({ commit }) {
      commit("LOGOUT");
    },
  },
  modules: {},
});
