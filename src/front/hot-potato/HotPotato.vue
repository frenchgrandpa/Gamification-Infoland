<template>
  
  <div id="app"> 
    <PlayerList id="playerlist"/>   
    <div id="gameinfo">
  
      <Bom :fase="BombState" id="bom"></Bom>
  
      
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

global.socket = io("http://localhost:3000");

global.socket.on("playerCount", function(msg) {
  console.log(msg);
});
global.socket.on("question", function(msg) {
  console.log(msg);
  app.$children[0].getQuestion(msg);
});
global.socket.on("players", function(players) {
  console.log(players);
});
global.socket.on("explosion", function(msg) {
  app.$children[0].BombState = 4;
});
global.socket.on("correct", function(msg) {
  if (msg === "true") {
    alert("Antwoord is goed");
  } else {
    alert("Antwoord was fout");
  }
});

export default {
  name: "HotPotato",
  data() {
    return {
      lobby: "",
      question: "hey",
      BombState: 1
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
    },
     getBombState: function(state) {
      this.BombState = state;
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
