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
      register() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(() => {
            alert('Registration successful');
            // Dodajte dodatnu logiku ili prijelaz na drugu rutu nakon registracije
          })
          .catch((error) => {
            alert('Registration failed: ' + error.message);
          });
      }
    }
  };
  </script>
  