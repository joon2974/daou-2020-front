import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 인증한 필요한 페이지의 인증을 처리
const requiresAuth = () => (from, to, next) => {
  const isAuthenticated = false;
  if (isAuthenticated) return next();
  next("/signin?returnPath=mypage");
};

const routerOptions = [
  { path: "/", component: "HomeView" },
  { path: "/signin", component: "SignInView" },
  { path: "/signup", component: "NotFound" },
  { path: "/board", component: "BoardView"},
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
