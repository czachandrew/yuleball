import { createStore } from "vuex";
import { housecup } from "./housecup";

export default createStore({
  state: {
    test: "this is a test",
    toasts: Array<{ title: string; timestamp: string; message: string }>(),
  },
  mutations: {
    addToast(state, toast) {
      state.toasts.push(toast);
    },
    destroyToast(state, index) {
      state.toasts.splice(index, 1);
    },
  },
  actions: {},
  modules: {
    housecup: housecup,
  },
});
