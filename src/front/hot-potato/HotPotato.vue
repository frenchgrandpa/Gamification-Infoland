<template>
  
  <div id="app"> 
    <PlayerList id="playerlist"/>   
    <div id="gameinfo">
  
      <Bom id="bom"/>
  
      
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

const socket = io("http://localhost:3000");

socket.on("playerCount", function(msg) {
  console.log(msg);
});
socket.on("question", function(msg) {
  console.log(msg);
  vraag.image = msg.media;
});
socket.on("players", function(msg){
  for(let player of msg)
  {
    console.log(player);
  }
});
socket.on("explosion",function(msg)
{
  if(msg === 'true')
  {
    alert("boooooooom");
  }
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
  background: #429feb ;
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
 margin: auto;
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
