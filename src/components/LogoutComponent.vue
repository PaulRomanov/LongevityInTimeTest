<template>
  <div class="decor">
    <div class="form-left-decoration"></div>
    <div class="form-right-decoration"></div>
    <div class="circle"></div>
    <div class="form-inner">
      <h2>Выход из системы</h2>
      <p>Вы уверены, что хотите выйти из системы?</p>
      <button @click="logout">Выйти</button>
    </div>
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  name: 'LogoutComponent',
  methods: {
    async logout() {
    try {
      const { logout } = useAuth0();
      await logout({ returnTo: 'Адрес_перенаправления_после_выхода' });
    } catch (error) {
      console.error('Ошибка при выходе из системы:', error);
    }
  },
  },
};
</script>

<style scoped>
.decor {
  position: relative;
  max-width: 400px;
  margin: 50px auto;
  background: white;
  border-radius: 30px;
  padding: 50px;
}

.form-left-decoration,
.form-right-decoration {
  content: "";
  position: absolute;
  width: 50px;
  height: 20px;
  background: #ff4500;
  border-radius: 20px;
}

.form-left-decoration {
  bottom: 60px;
  left: -30px;
}

.form-right-decoration {
  top: 60px;
  right: -30px;
}

.form-left-decoration:before,
.form-left-decoration:after,
.form-right-decoration:before,
.form-right-decoration:after {
  content: "";
  position: absolute;
  width: 50px;
  height: 20px;
  border-radius: 30px;
  background: white;
}

.form-left-decoration:before {
  top: -20px;
}

.form-left-decoration:after {
  top: 20px;
  left: 10px;
}

.form-right-decoration:before {
  top: -20px;
  right: 0;
}

.form-right-decoration:after {
  top: 20px;
  right: 10px;
}

.form-inner {
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.circle {
  position: absolute;
  bottom: 80px;
  left: -55px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
}

form-inner p {
  margin-bottom: 20px;
}

button {
  padding: 12px 20px;
  background-color: #ff4500;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #d63400;
}
.form-inner h2 {
  margin-top: 0;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 24px;
  color: #707981;
  display: flex;
  justify-content: center;
}
</style>
