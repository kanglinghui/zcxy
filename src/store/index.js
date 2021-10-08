import { createStore } from "vuex";

export default createStore({
  state: {
    menuScal: true,
  },
  mutations: {
    SET_MENU_SCAL: (state, status) => {
      state.menuScal = status;
    },
  },
  actions: {},
  modules: {},
});
