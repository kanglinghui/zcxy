import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  ElCheckbox,
  ElDialog,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElInput,
  ElMenu,
  ElForm,
  ElTable,
  ElTableColumn,
  ElTabs,
  ElTabPane,
  ElSubmenu,
  ElTooltip,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElFormItem,
  ElMenuItem,
  ElMenuItemGroup,
  ElOption,
  ElPopover,
  ElOptionGroup,
  ElCheckboxButton,
  ElCheckboxGroup,
  ElButton,
  ElSelect,
  ElInfiniteScroll,
  ElMessage,
  ElLoading,
  ElMessageBox,
  ElAvatar,
  ElNotification,
  ElPagination,
  ElCard,
  ElLink,
  ElScrollbar,
} from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

import locale from "element-plus/lib/locale/lang/zh-cn";
import "./assets/styles/common.css";
import "./assets/styles/common.scss";
import VueParticles from "vue-particles";

// import "element-plus/packages/theme-chalk/src/base.scss";

const app = createApp(App);
const plugins = [
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
];
const components = [
  ElCheckbox,
  ElDialog,
  ElInput,
  ElMenu,
  ElForm,
  ElTable,
  ElTableColumn,
  ElSubmenu,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTooltip,
  ElPopover,
  ElDropdown,
  ElTabs,
  ElTabPane,
  ElDropdownItem,
  ElDropdownMenu,
  ElFormItem,
  ElMenuItem,
  ElMenuItemGroup,
  ElOption,
  ElOptionGroup,
  ElCheckboxButton,
  ElCheckboxGroup,
  ElButton,
  ElSelect,
  ElAvatar,
  ElPagination,
  ElCard,
  ElLink,
  ElScrollbar,
];

app.config.globalProperties.$ELEMENT = { locale, size: "mini" };
components.forEach((component) => {
  app.use(component);
});

plugins.forEach((plugin) => {
  app.use(plugin);
});

app.use(store).use(router).use(VueParticles).mount("#app");
