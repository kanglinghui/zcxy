import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css";
import Layout from "@/Layout";
import { getSession } from "../utils/auth";

import Home from "../views/Home.vue";
// get routes from modules
const modulesFiles = require.context("./modules", true, /\.js$/);
// router for layout
const moduleRoutes = modulesFiles.keys().reduce((moduleRoutes, modulePath) => {
  const value = modulesFiles(modulePath);
  return [...moduleRoutes, ...value.default];
}, []);
const permissionsList = moduleRoutes.map((item) => item.name);
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/i",
    component: Layout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home"),
      },
      {
        path: "admin",
        name: "Admin",
        meta: {
          title: "管理员",
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/admin"),
      },
      {
        path: "institutions",
        name: "Institutions",
        meta: {
          title: "机构管理",
        },
        component: () => import("../views/institutions"),
      },
      ...moduleRoutes,
      //   {
      //     path: "/institutionsEdit",
      //     name: "InstitutionsEdit",
      //     meta: {
      //       title: "机构管理 - 编辑",
      //     },
      //     component: () => import("../views/institutions/detail.vue"),
      //   },
      //   {
      //     path: "monitoring",
      //     name: "Monitoring",
      //     meta: {
      //       title: "监控",
      //     },
      //     component: () => import("../views/monitoring"),
      //   },
      //   {
      //     path: "log",
      //     name: "Log",
      //     meta: {
      //       title: "操作日志",
      //     },
      //     component: () => import("../views/log"),
      //   },
    ],
  },
  {
    path: "/",
    redirect: "/i/admin",
  },
  //   {
  //     path: "/admin",
  //     name: "Admin",
  //     meta: {
  //       title: "管理员",
  //     },
  //     component: () => import(/* webpackChunkName: "about" */ "../views/admin"),
  //   },
  //   {
  //     path: "/institutions",
  //     name: "Institutions",
  //     meta: {
  //       title: "机构管理",
  //     },
  //     component: () => import("../views/institutions"),
  //   },
  {
    path: "/institutionsEdit/:id",
    name: "InstitutionsEdit",
    meta: {
      title: "机构管理 - 编辑",
    },
    component: () => import("../views/institutions/detail.vue"),
  },
  {
    path: "/401",
    name: "NoPermission",
    component: () => import("@/views/error-page/401"),
  },
  {
    path: "/404",
    name: "NotFound",
    component: () => import("@/views/error-page/404"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login"),
  },
  //   {
  //     path: "/monitoring",
  //     name: "Monitoring",
  //     meta: {
  //       title: "监控",
  //     },
  //     component: () => import("../views/monitoring"),
  //   },
  //   {
  //     path: "/log",
  //     name: "Log",
  //     meta: {
  //       title: "操作日志",
  //     },
  //     component: () => import("../views/log"),
  //   },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  { path: "/:pathMatch(.*)*", redirect: { name: "NotFound" } },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// to, from, next
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path === "/login") {
    next();
    return;
  }
  if (getSession("token")) {
    if (getSession("token") === "admin") {
      next();
    } else if (permissionsList.includes(to.name)) {
      next("/401");
    } else {
      next();
    }
  } else {
    next({ path: "/login", replace: true });
  }
});
router.afterEach((to) => {
  document.title = to.meta.title
    ? "自诚星云系统 - " + to.meta.title
    : "自诚星云系统";
  NProgress.done();
});
export { moduleRoutes };
export default router;
