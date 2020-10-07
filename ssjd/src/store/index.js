import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

// 추후 실제 url로 변경할 것
const resourceHost = "http://localhost:3000/api";

const headers = {
  "Content-type": "application/json; charset=UTF-8",
  Accept: "*/*",
  "Access-Control-Allow-Origin": "*",
};

export default new Vuex.Store({
  state: {
    userId: "",
    nickName: "",
    accessToken: null,
    cardImages: [
      "https://cdn.vuetifyjs.com/images/cards/house.jpg",
      "https://cdn.vuetifyjs.com/images/cards/road.jpg",
      "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
      "https://picsum.photos/500/300?image=2",
      "https://picsum.photos/500/300?image=39",
      "https://picsum.photos/500/300?image=60",
    ],
  },
  mutations: {
    LOGIN(state, user) {
      state.accessToken = user.auth_token;
      state.userId = user.data.userId;
      state.nickName = user.data.nickname;
    },
    LOGOUT(state) {
      state.accessToken = undefined;
      state.userId = "";
      state.nickName = "";
    },
    UPDATEUSER(state, user) {
      state.userId = user.data.userId;
      state.nickName = user.data.nickname;
      state.accessToken = user.auth_token;
    },
  },
  actions: {
    LOGIN({ commit }, { nickname, password }) {
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
    UPDATEUSER({ commit }, { nickname, newNickname }) {
      return axios
        .put(
          `${resourceHost}/users/nickname`,
          { nickname, newNickname },
          headers
        )
        .then((data) => {
          commit("UPDATEUSER", data.data);
        });
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
