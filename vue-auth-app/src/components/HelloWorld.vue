<template>
  <div class="info">
    <p>Aplikaciju izradio:</p>
    <ul>
      <li>Ime: {{ name }}</li>
     <!-- <li>Email: {{ email }}</li> 
       <li>Telefon: {{ phone }}</li> -->
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Dino Červar'
     // email: 'vaš@email.com',
      // phone: '123-456-789' 
    };
  }
};
</script>

<style>
.info {
  background-color: #f0f0f0;
  padding: 20px;
  border-top: 1px solid #ccc;
  text-align: center;
}
</style>
