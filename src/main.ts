import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./main.css";
import "tw-elements";

createApp(App).use(createPinia()).use(router).mount("#app");
