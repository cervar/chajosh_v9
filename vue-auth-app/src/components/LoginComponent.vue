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
import { firebase } from 'firebase/app';



/* eslint-disable */
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert('Login successful');
          // Dodajte dodatnu logiku ili prijelaz na drugu rutu nakon prijave
        })
        .catch((error) => {
          alert('Login failed: ' + error.message);
        });
    }
  }
};
</script>
