<template>
  
  <div id="app"> 
    <PlayerList id="playerlist"/>   
    <div id="gameinfo">
  
      <Bom :fase="3" id="bom"></Bom>
  
      
      <v-alert>{{lobby}}</v-alert>
    </div>
    <div class="vraag">
      <Vraag id="vraag" v-bind:question=question />
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
<<<<<<< HEAD
=======
  app.$children[0].getQuestion(msg);
>>>>>>> 72f5e234d0279400b6b17c6138fa0a2473c7fb7a
});
socket.on("players", function(msg) {
  for (let player of msg) {
    console.log(player);
  }
});
socket.on("explosion", function(msg) {
  if (msg === "true") {
    alert("boooooooom");
  }
});

export default {
  name: "HotPotato",
  data() {
    return {
      lobby: "",
      question: "hey"
    };
  },
  components: {
    Vraag,
    Bom,
    PlayerList,
    MenuButton
  },
  methods: {
    greet: function(event) {
      // `this` inside methods points to the Vue instance
      alert("Hello " + this.question + "!");
      // `event` is the native DOM event
      if (event) {
        alert(event.target.tagName);
      }
    },
    getQuestion: function(msg) {
      this.question = msg;
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
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 0px;
  height: 100%;
  background: #429feb;
}

#gameinfo {
  display: flex;
}

#bom {
  margin: auto;
  order: 2;
  position: relative;
 
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
