<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
      <br>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase'; // Uvozimo auth modul iz firebase.js datoteke

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async register() {
      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        alert('Registration successful');
        // Dodajte dodatnu logiku ili prijelaz na drugu rutu nakon registracije
      } catch (error) {
        alert('Registration failed: ' + error.message);
      }
    }
  }
};
</script>
