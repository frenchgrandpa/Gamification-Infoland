<template>
  <div id="app">
    <img width="25%" src="https://www.nvvkveiligheidscongres.nl/cms/multimedia/0000635rjxxcapms/Infoland.jpg">
    <br>
    <hr width="40%"> 
    <br>
    <img width="25%" src="./assets/minigames-logo.png">
    <div class="button-container">
    <br>
    <br>
    <a href="/lobby/hotpotato"><div class="button">Hot Potato</div></a>    
    <button class="button" @click="login">Login test</button>
    </div>
  </div>
</template>

<script>

import Axios from 'axios';

export default {
  name: "App",
  components: {
    
  },
  methods: {
    login(){
      Axios.post('/api/account/login', {
        username: 'berk',
        password: 'test'
      }).then((response) => {
        window.location.href = "/game/hotpotato"
      }).catch((err) => {
        alert(err);
      })
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.button {
  background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
}
</style>
