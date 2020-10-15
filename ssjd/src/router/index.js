import Vue from "vue";
import VueRouter from "vue-router";
import jwt from "jsonwebtoken";
import store from "../store/index";
import { jwtSalt } from "../../secretStrings";

Vue.use(VueRouter);

// 인증한 필요한 페이지의 인증을 처리
const requiresAuth = () => (from, to, next) => {
  const token = store.state.accessToken;
  const isAuthenticated = token === undefined ? false : true;
  // 여기서 expired 됐으면 vuex에 있는 것들 다 지우기
  if (isAuthenticated) {
    try {
      const decoded = jwt.verify(token, jwtSalt.salt);
      console.log(`exp: ${decoded.exp}`);
      if (
        decoded.User.userId === store.state.userId &&
        decoded.User.nickname === store.state.nickName &&
        Date.now() < decoded.exp * 1000 // Date.now() >= decoded.exp * 1000 이면 토큰 만료된 것.
      )
        return next();
    } catch (e) {
      store.state.accessToken = null;
      store.state.userId = "";
      store.state.nickName = "";
      console.log(e);
      alert("토큰이 만료되었습니다. 재로그인 해주세요!");
    }
  }
  next(`/signin?returnPath=${from.path.replace("/", "")}`);
};

const routerOptions = [
  { path: "/", component: "BoardView" },
  { path: "/signin", component: "SignInView" },
  { path: "/create", component: "CreatePostView", beforeEnter: requiresAuth() },
  { path: "/mypage", component: "MyPageView", beforeEnter: requiresAuth() },
  { path: "/chat/:postId", component: "BoardDetailView" },
  { path: "/test", component: "TestView" },
  { path: "/info", component: "CSRFView"},
  { path: "*", component: "NotFound" },
];

const routes = routerOptions.map((route) => {
  return {
    ...route,
    component: () => import(`../views/${route.component}.vue`),
  };
});

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
