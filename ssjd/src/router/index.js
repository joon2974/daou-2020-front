import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routerOptions = [
  { path: "/", component: "HomeView" },
  { path: "/signin", component: "SignInView" },
  { path: "/signup", component: "NotFound" },
  { path: "/mypage", component: "MyPageView", meta: { requiresAuth: true } },
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
