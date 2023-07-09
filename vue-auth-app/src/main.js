import { createApp } from 'vue';
import './firebase'; // Importujte firebase.js prije createApp linije

import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
