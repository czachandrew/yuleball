import { AwkwardApi } from "@/api/AwkwardApi";
import { defineStore } from "pinia";

const api = new AwkwardApi();

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
    async login(email: string, password: string) {
      try {
        const tokens = await api.login(email, password);
        const details = await api.currentUser();
        console.log("Sending to the management call");
        this.manageLoginSuccess(details);
        console.log(tokens);
        console.log(details);
        return tokens;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    manageLoginSuccess(user: User) {
      console.log("i am manageing the success of this login");
      console.log(user);
      localStorage.setItem("yuleuser", user.first_name);
      this.user = user;
      this.loggedIn = true;
    },
    manageLogout() {
      this.user = null;
      this.loggedIn = false;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
  },
});
