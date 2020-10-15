import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "vuetify/dist/vuetify.min.css";
import router from "./router";
import store from "./store";
import VueCookies from "vue-cookies";
import "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/components/prism-c";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

Vue.config.productionTip = false;
Vue.use(VueCookies);

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
