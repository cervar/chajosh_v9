<template>
    <div class="footer">
      <div class="items">
        <a
          class="item Youtube"
          href="https://www.youtube.com/"
          target="_blank"
        >
          <img class="image" src="../assets/YT.png" />
        </a>
        <a
          class="item GitHub"
          href="https://github.com/cervar"
          target="_blank"
        >
          <img class="image" src="../assets/git.png" />
        </a>
        <a>
        Copyright @ 2023 dino, Inc. All Rights Reserved
        </a>
      </div>
      <HelloWorld /> 
    </div>
  </template>
  
  <script>
  import HelloWorld from '@/components/HelloWorld.vue';
  export default {
    name: "FooterComponent",
    components: {
    HelloWorld 
  }
  };
  </script>
  
  <style>
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    -webkit-box-shadow: 0px -3px 7px 0px rgba(50, 50, 50, 0.53);
    -moz-box-shadow: 0px -3px 7px 0px rgba(50, 50, 50, 0.53);
    box-shadow: 0px -3px 7px 0px rgba(50, 50, 50, 0.53);
    height: 50px;
    background-color: white;
  }
  
  .items {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
  
  .item {
    margin: 10px 50px;
  }
  
  .image {
    width: 30px;
    height: 30px;
  }
  </style>