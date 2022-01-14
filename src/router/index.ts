import Login from "@/views/Login.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import HouseCup from "../views/HouseCup.vue";
import Maze from "../views/Maze.vue";
import ScanManager from "../views/ScanManager.vue";
import Admin from "../views/Admin.vue";
import Register from "../views/Register.vue";
import StaffVue from "@/views/Staff.vue";
import QrCodePrint from "@/components/admin/QrCodePrint.vue";
import Print from "@/views/Print.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/cup",
    name: "HouseCup",
    component: HouseCup,
  },
  {
    path: "/maze",
    name: "Maze",
    component: Maze,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/scan/:slug",
    props: true,
    name: "Scan",
    component: ScanManager,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/staff",
    name: "Staff",
    component: StaffVue,
  },
  {
    path: "/print/:size/:help/:anchor/",
    name: "Print",
    component: QrCodePrint,
  },
  {
    path: "/printall",
    name: "Print All",
    component: Print,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
