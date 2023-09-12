<template>
  <div class="decor">
    <div class="form-left-decoration"></div>
    <div class="form-right-decoration"></div>
    <div class="circle"></div>
    <div class="form-inner">
      <h3>Управление сокращенными URL</h3>

      <!-- Форма для создания нового URL -->
      <form @submit.prevent="createShortURL">
        <div>
          <label for="longURL">Длинный URL:</label>
          <input
            type="text"
            id="longURL"
            v-model="newURL.longURL"
            placeholder="Длинный URL"
            required
          />
        </div>
        <div>
          <label for="slug">Сокращенный URL (slug):</label>
          <input
            type="text"
            id="slug"
            v-model="newURL.slug"
            placeholder="Сокращенный URL"
            required
          />
        </div>
        <input type="submit" value="Создать" />
      </form>

      <!-- Список существующих сокращенных URL -->
      <ul>
        <li v-for="url in shortURLs" :key="url.id">
          {{ url.longURL }} - {{ url.shortURL }}
          <button @click="editShortURL(url)">Редактировать</button>
          <button @click="deleteShortURL(url)">Удалить</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useAuth0 } from '@auth0/auth0-vue'; 

export default {
  name: "URLManagement",
  data() {
    return {
      newURL: {
        longURL: "",
        slug: "",
      },
      shortURLs: [], // Список сокращенных URL
    };
  },
  methods: {
    async createShortURL() {
      try {
        const { isAuthenticated, loginWithRedirect } = useAuth0(); // Получение функций аутентификации из Auth0

        if (!isAuthenticated) {
          // Если пользователь не аутентифицирован, перенаправление на страницу входа
          await loginWithRedirect();
          return;
        }

        // Отправка данных на бэкэнд для создания нового сокращенного URL
        const response = await axios.post("/api/shorturls", {
          longURL: this.newURL.longURL,
          slug: this.newURL.slug,
        });

        // Обработка успешного ответа от бэкенда и добавление нового сокращенного URL в список.
        const newShortURL = response.data; // Предполагается, что сервер вернул созданный сокращенный URL
        this.shortURLs.push(newShortURL);

        // Очистка полей ввода.
        this.newURL.longURL = "";
        this.newURL.slug = "";
      } catch (error) {
        console.error("Ошибка при создании сокращенного URL:", error);
        // Обработка ошибок
      }
    },

    async editShortURL(url) {
      try {
        // Отправка данных на бэкэнд для редактирования сокращенного URL
        await axios.put(`/api/shorturls/${url.id}`, { longURL: url.longURL });

        // Обработка успешного редактирования сокращенного URL, если это необходимо.
      } catch (error) {
        console.error("Ошибка при редактировании сокращенного URL:", error);
        // Обработка ошибок
      }
    },

    async deleteShortURL(url) {
      try {
        // Отправка запроса на бэкэнд для удаления сокращенного URL
        await axios.delete(`/api/shorturls/${url.id}`);

        // Удаление сокращенного URL из списка после успешного удаления.
        const index = this.shortURLs.indexOf(url);
        if (index !== -1) {
          this.shortURLs.splice(index, 1);
        }
      } catch (error) {
        console.error("Ошибка при удалении сокращенного URL:", error);
        // Обработка ошибок
      }
    },
  },
};
</script>


<style scoped>
.decor {
  position: relative;
  max-width: 600px;
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

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  padding: 6px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
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
