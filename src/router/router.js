import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    meta: {title: "Main中展示的组件"},
    component: () => import("@/views/main/Main"),
    children: [
      {path: "/", meta: {title: "首页"}, component: () => import("@/views/appList/AppList")},
      {path: "apps/:id", meta: {title: "应用动态"}, component: () => import("@/views/appDetail/AppVersions")},
    ],
  },
  {path: "/login", meta: {title: "登录"}, component: () => import("@/views/main/Login")},
  {path: "/:shortCode", meta: {title: "下载页"}, component: () => import("@/views/appDetail/Preview")},
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export const toLogin = () => {
  router.push({
    path: "/login",
  });
};

export default router;