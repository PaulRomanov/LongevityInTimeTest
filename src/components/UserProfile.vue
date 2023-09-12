<template>
  <div class="decor">
    <div class="form-left-decoration"></div>
    <div class="form-right-decoration"></div>
    <div class="circle"></div>
    <div class="form-inner">
      <h3>Управление профилем пользователя</h3>
      <form @submit.prevent="updateUserProfile">
        <div>
          <label for="username">Имя пользователя:</label>
          <input
            type="text"
            id="username"
            v-model="user.username"
            placeholder="Имя пользователя"
            required
          />
        </div>
        <div>
          <label for="email">Адрес электронной почты:</label>
          <input
            type="email"
            id="email"
            v-model="user.email"
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label for="password">Пароль:</label>
          <input
            type="password"
            id="password"
            v-model="user.password"
            placeholder="Пароль"
          />
        </div>
        <input type="submit" value="Сохранить изменения" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async updateUserProfile() {
      try {
        // Отправка данных на бэкэнд для обновления профиля пользователя
          const response = await axios.put('/api/user/profile', this.user);

        // Предположим, что бэкэнд вернул успешный ответ.
        console.log('Профиль пользователя успешно обновлен:', response.data);
      } catch (error) {
        console.error('Ошибка при обновлении профиля пользователя:', error);
        // Обработка ошибок
      }
    },
  },
};
</script>


<style scoped>
.decor {
  position: relative;
  max-width: 400px;
  margin: 50px auto 0;
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
  background: #f69a73;
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

.circle {
  position: absolute;
  bottom: 80px;
  left: -55px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
}

.form-inner input,
.form-inner textarea {
  display: block;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 10px;
  background: #e9eff6;
  line-height: 40px;
  border-width: 0;
  border-radius: 20px;
  font-family: "Roboto", sans-serif;
}

.form-inner input[type="submit"] {
  margin-top: 30px;
  background: #f69a73;
  border-bottom: 4px solid #d87d56;
  color: white;
  font-size: 14px;
}
.form-inner input[type="submit"]:hover {
  cursor: pointer;
  background: #f69267;
  border-bottom: 4px solid #d87d56;
}

.form-inner textarea {
  resize: none;
}

.form-inner h3 {
  margin-top: 0;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 24px;
  color: #707981;
  display: flex;
  justify-content: center;
}
</style>
