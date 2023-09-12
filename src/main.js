import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; 
import { createAuth0Client } from '@auth0/auth0-spa-js';

const auth0 = await createAuth0Client({
  domain: 'your-auth0-domain', // Замените на фактический домен Auth0
  client_id: 'your-client-id',   // Замените на фактический Client ID вашего приложения

});

const app = createApp(App);
app.use(router); 
app.config.globalProperties.$auth0 = auth0;
app.mount('#app');

