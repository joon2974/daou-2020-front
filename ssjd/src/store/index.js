import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		userId: "",
		nickName: ""
	},
	mutations: {
		setUser(state, user) {
			state.userId = user.id;
			state.nickName = user.nickName;
		}
	},
	actions: {},
	modules: {}
});
