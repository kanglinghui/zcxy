import { createStore } from "vuex";

export default createStore({
  state: {
    menuScal: true,
    isAdmin: false,
    username: "",
  },
  mutations: {
    SET_MENU_SCAL: (state, status) => {
      state.menuScal = status;
    },
    SET_IS_ADMIN: (state, val) => {
      state.isAdmin = val;
    },
    SET_USER_NAME: (state, name) => {
      state.username = name;
    },
  },
  actions: {},
  modules: {},
});
