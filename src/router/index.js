import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home.vue";
import app from "../pages/toy-app.vue";
import About from "../pages/About.vue";
import edit from "../pages/toy-edit.vue";
import details from "../pages/toy-details.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/app",
    name: "app",
    component: app,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/edit/:toyId?",
    name: "edit",
    component: edit,
  },
  {
    path: "/details/:toyId?",
    name: "details",
    component: details,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
