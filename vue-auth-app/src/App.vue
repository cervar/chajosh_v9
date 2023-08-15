<template>
  <div id="app">
    <router-link to="/register">Novi korisnik</router-link> |
    <router-link to="/login">Stari znanac</router-link> |
    <router-link to="/todo">Zadaci</router-link>

    <UserWelcome />

    <div class="logo-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </div>

    <router-view></router-view>
    <HelloWorld /> 
    <FooterComponent/>
  </div>
</template>

<script>
import UserWelcome from '@/components/UserWelcome.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    UserWelcome,
    FooterComponent,
    HelloWorld 
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.logo-container {
  text-align: center;
  margin-top: 20px;
}

.logo {
  width: 150px; /* Prilagodite veličinu loga prema potrebi */
  height: auto; /* Očuva omjer stranica loga */
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
