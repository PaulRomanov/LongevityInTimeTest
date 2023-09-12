<template>
  <div class="wrapper">
    <div class="wrapper_nav">
      <router-link class="nav-link" to="/registration" active-class="active">
        Регистрация
      </router-link>
      <router-link class="nav-link" to="/login" active-class="active"> Вход </router-link>
      <router-link class="nav-link" to="/user-profile" active-class="active">
        Профиль
      </router-link>
      <router-link class="nav-link" to="/url-management" active-class="active">
        Управление URL
      </router-link>
      <router-link class="nav-link" to="/logout" active-class="active">
        Выход
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import RegistrationComponent from "./components/RegistrationComponent.vue";
import LoginComponent from "./components/LoginComponent.vue";
import UserProfile from "./components/UserProfile.vue";
import URLManagement from "./components/URLManagement.vue";
import LogoutComponent from "./components/LogoutComponent.vue";

export default {
  name: "App",
  components: {
    RegistrationComponent,
    LoginComponent,
    UserProfile,
    URLManagement,
    LogoutComponent,
  },
};
</script>

<style>
.wrapper {
  background-color: #f69a73;
  height: 100vh;
}

.wrapper_nav {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.nav-link {
  text-decoration: none;
  background-color: #fff;
  color:  #f69a73;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: bold;
  margin: 10px;
}

.nav-link:hover {
  background-color: #f76a2d;
  color:  #fff;
}
.active {
  background-color: #f76a2d;
  color:  #fff;
}

.active:hover {
  background-color: #f75c19;
}

.active-link {
  font-weight: bold; 
  color: #fff;
}
</style>
