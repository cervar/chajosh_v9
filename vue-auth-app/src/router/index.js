import { createRouter, createWebHashHistory } from 'vue-router';
import RegisterComponent from '../components/RegisterComponent.vue';
import LoginComponent from '../components/LoginComponent.vue';
import TodoListComponent from '@/components/TodoListComponent.vue';


const routes = [
  {
    path: '/todo',
    name: 'Todo',
    component: TodoListComponent,
    meta: { requiresAuth: true } // Opciono, ako želite zaštititi rutu za prijavljene korisnike
  },
  { path: '/register', component: RegisterComponent },
  { path: '/login', component: LoginComponent }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
