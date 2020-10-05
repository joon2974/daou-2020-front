import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 인증한 필요한 페이지의 인증을 처리
const requiresAuth = () => (from, to, next) => {
  const token = localStorage.accessToken;
  const isAuthenticated = token === undefined ? false : true;
  // 세션 스토리지에서 토큰 받아와서 있으면 next() 실행하도록 수정하기
  if (isAuthenticated) return next();
  next("/signin?returnPath=mypage");
};

const routerOptions = [
  { path: "/", component: "HomeView" },
  { path: "/signin", component: "SignInView" },
  { path: "/signup", component: "NotFound" },
  { path: "/board", component: "BoardView" },
  { path: "/BJ", component: "BJView" },
  { path: "/mypage", component: "MyPageView", beforeEnter: requiresAuth() },
  { path: "/chat/:postId", component: "BoardDetailView" },
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
