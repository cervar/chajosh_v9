import { createRouter, createWebHashHistory } from 'vue-router';
import RegisterComponent from '../components/RegisterComponent.vue';
import LoginComponent from '../components/LoginComponent.vue';

const routes = [
  { path: '/register', component: RegisterComponent },
  { path: '/login', component: LoginComponent }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
