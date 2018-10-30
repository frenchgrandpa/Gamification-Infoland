<template>
  <div id="app">    
    <div id="gameinfo">
      <PlayerList id="playerlist"/>
      <Bom id="bom"/>
  
      <MenuButton id="menubutton"/>
      <v-alert>{{lobby}}</v-alert>
    </div>
    <div class="vraag">
      <Vraag id="vraag"/>
    </div>
  </div>
</template>

<script>
import Vraag from "./Vragen";
import Bom from "./Bom";
import PlayerList from "./PlayerList";
import MenuButton from "./MenuButton";
import Vuetify from "vuetify";

import io from "socket.io-client";

const socket = io("http://localhost:3000/");

socket.on("channel_name", function(msg) {
  console.log("message: " + msg);
});

export default {
  name: "HotPotato",
  data() {
    return {
      lobby: ""
    };
  },
  components: {
    Vraag,
    Bom,
    PlayerList,
    MenuButton
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
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 0px;
  height: 100%;
  background: #425beb ;
}

#gameinfo {
  display: flex;
}

#bom {
  margin: auto;
  order: 2;
  position: relative;
  border: 2px solid;
  height: 10em;
  width: 10em;
}

#playerlist {

}

.vraag {
  margin: auto;
}

#vraag {
  margin: auto;
  background: #80ccff;
}

#menubutton {
  order: 4;
  position: relative;
  top: 1em;
  right: 2em;
  width: 5em;
}
</style>
