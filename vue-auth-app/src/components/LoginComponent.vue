<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
      <br>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '@/firebase'; // NE TREBA više import auth iz firebase.js

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      const authInstance = getAuth(); // Dohvatite instancu autentikacije

      try {
        await signInWithEmailAndPassword(authInstance, this.email, this.password);
        alert('Login successful');
        // Dodajte dodatnu logiku ili prijelaz na drugu rutu nakon prijave
      } catch (error) {
        alert('Login failed: ' + error.message);
      }
    }
  }
};
</script>
