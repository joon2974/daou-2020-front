import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

// 추후 실제 url로 변경할 것
const resourceHost = "http://localhost:3000/api";

const headers = {
  "Content-type": "application/json; charset=UTF-8",
  Accept: "*/*",
  "Access-Control-Allow-Origin": "*",
};

const storage = window.sessionStorage;

export default new Vuex.Store({
  state: {
    userId: "",
    nickName: "",
    accessToken: null,
  },
  mutations: {
    LOGIN(state, user) {
      state.accessToken = user.auth_token;
      state.userId = user.data.userId;
      state.nickName = user.data.nickname;

      storage.setItem("accessToken", user.auth_token);
    },
    LOGOUT(state) {
      state.accessToken = null;
      storage.removeItem("accessToken");
    },
  },
  actions: {
    LOGIN({ commit }, { nickname, password }) {
      console.log(`닉네임: ${nickname}, 비번: ${password}`);
      return axios
        .post(`${resourceHost}/users/login`, { nickname, password }, headers)
        .then((data) => {
          commit("LOGIN", data.data);
          // 로그인 이후 모든 요청의 헤더에 토큰 포함
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${data.data.auth_token}`;
        });
    },
    LOGOUT({ commit }) {
      axios.defaults.headers.common["Authorization"] = undefined;
      commit("LOGOUT");
    },
  },
  modules: {},
});
