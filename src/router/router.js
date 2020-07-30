import Vue from "vue";
import VueRouter from "vue-router";
//import loginUtil from "@/util/loginUtil";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

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
  {path: "/preview", meta: {title: "预览"}, component: () => import("@/views/appDetail/Preview")},
];

const router = new VueRouter({
  routes,
});

//const whiteUris = ["/login"]; // 白名单,无需登录即可访问

router.beforeEach((to, from, next) => {
  NProgress.start();
/*  if (whiteUris.indexOf(to.path) !== -1 || loginUtil.isLogin()) {
    // 在白名单当中或者已经登录,放行
    next();
  } else {
    toLogin(to.fullPath);
  }*/
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export const toLogin = () => {
  router.push({
    path: "/login",
  });
};

export default router;