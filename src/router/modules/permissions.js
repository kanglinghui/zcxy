const permissionsRouters = [
  {
    path: "monitoring",
    name: "Monitoring",
    meta: {
      title: "监控",
    },
    component: () => import("../../views/monitoring"),
  },
  {
    path: "log",
    name: "Log",
    meta: {
      title: "操作日志",
    },
    component: () => import("../../views/log"),
  },
];
export default permissionsRouters;
