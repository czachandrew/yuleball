import { defineStore } from "pinia";

interface Toast {
  id: string;
  title: string;
  message: string;
  timestamp: string;
}

interface User {
  email: string;
  first_name: string;
  house: { name: string; points: number };
  is_champion: boolean;
}

interface State {
  test: string;
  toasts: Toast[];
  user: User | null;
  loggedIn: boolean;
}

export const useStore = defineStore("main", {
  state: (): State => ({
    test: "this is a test",
    toasts: Array<Toast>(),
    loggedIn: false,
    user: null,
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
