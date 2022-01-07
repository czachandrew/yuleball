import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./main.css";
import "tw-elements";

const pinia = createPinia();

const app = createApp(App);
app.use(pinia).use(router).mount("#app");
