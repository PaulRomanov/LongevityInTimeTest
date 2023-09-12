import { createRouter, createWebHistory } from "vue-router";
import RegistrationComponent from "../components/RegistrationComponent.vue";
import LoginComponent from "../components/LoginComponent.vue";
import UserProfile from "../components/UserProfile.vue";
import URLManagement from "../components/URLManagement.vue";
import LogoutComponent from "../components/LogoutComponent.vue";

const routes = [
  { path: "/", redirect: "/registration" },
  {
    path: "/registration",
    name: "Registration",
    component: RegistrationComponent,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginComponent,
  },
  {
    path: "/user-profile",
    name: "UserProfile",
    component: UserProfile,
  },
  {
    path: "/url-management",
    name: "URLManagement",
    component: URLManagement,
  },
  {
    path: "/logout",
    name: "Logout",
    component: LogoutComponent,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
