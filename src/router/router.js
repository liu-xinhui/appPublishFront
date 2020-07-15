import Vue from "vue";
import VueRouter from "vue-router";
import loginUtil from "@/util/loginUtil";
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

      {path: "device/DeviceList", meta: {title: "设备管理"}, component: () => import("@/views/device/DeviceList")},
      {path: "user/UserList", meta: {title: "用户管理"}, component: () => import("@/views/user/UserList")},
      {path: "role/RoleList", meta: {title: "角色管理"}, component: () => import("@/views/role/RoleList")},
      {path: "dept/DeptList", meta: {title: "部门管理"}, component: () => import("@/views/dept/DeptList")},
    ],
  },
  {path: "/login", eta: {title: "登录"}, component: () => import("@/views/main/Login")},
];

const router = new VueRouter({
  routes,
});

const whiteUris = ["/login"]; // 白名单,无需登录即可访问

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (whiteUris.indexOf(to.path) !== -1 || loginUtil.isLogin()) {
    // 在白名单当中或者已经登录,放行
    next();
  } else {
    toLogin(to.fullPath);
  }
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