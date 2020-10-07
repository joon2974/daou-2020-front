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
  // 로컬 스토리지에서 토큰 받아와서 있으면 next() 실행하도록 수정하기
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
      console.log(e);
    }
  }
  next("/signin?returnPath=mypage");
};

const routerOptions = [
  { path: "/", component: "BoardView" },
  { path: "/signin", component: "SignInView" },
  { path: "/board", component: "HomeView" },
  { path: "/BJ", component: "BJView" },
  { path: "/mypage", component: "MyPageView", beforeEnter: requiresAuth() },
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
