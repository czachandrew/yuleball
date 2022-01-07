import { defineStore } from "pinia";

interface Toast {
  id: string;
  title: string;
  message: string;
  timestamp: string;
}

interface State {
  test: string;
  toasts: Toast[];
}

export const useStore = defineStore("main", {
  state: (): State => ({
    test: "this is a test",
    toasts: Array<Toast>(),
  }),
  actions: {
    addToast(toast: Toast) {
      this.toasts.push(toast);
    },
    destroyToast(toastId: string) {
      const index = this.toasts.findIndex((ele) => ele.id === toastId);
      this.toasts.splice(index, 1);
    },
  },
});
