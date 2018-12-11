<template>
  
  <div id="app"> 
    <PlayerList :id="PlayerList" :playerWithBomb="PlayerWithBomb"/>   
    <div id="gameinfo">
  
      <Bom :fase="BombState" id="bom"></Bom>
  
      
      <v-alert>{{lobby}}</v-alert>
    </div>

    <div id="info-modal">
      <button slot="header" id="show-modal" @click="showModal = true">Help</button>
    <modal v-if="showModal" @close="showModal = false">
      <!--<img id="helpimg" slot="body" srcset="../assets/info-480w.png 480w,
                                            ../assets/bomtemp.png 625w"
                                      sizes="(max-width: 850px) 480px,
                                            625px"   >-->
                                            <v-img slot="body" :src=helpimgw aspect-ratio=0.85 height=400 contain=true /> 
    </modal>
    </div>

    <!-- gameIsOver werkt niet goed-->
    <div v-if="gameOver">
    <v-alert v-model="alert" :value="false" type="warning" dismissible>
        Game-over!
        </v-alert>
    </div>
    <div class="vraag" v-else-if="question != null">
      <Vraag id="vraag" v-bind:question=question />
    </div>
    <div v-else>
        <v-btn v-on:click="startGame">Play!</v-btn>
    </div>
    <v-alert v-model="answercorrect" :value="false" type="succes" dismissible>
        Correct answer!
        </v-alert>
    <v-alert v-model="answerwrong" :value="false" type="error" dismissible>
        Wrong answer!
        </v-alert>
  </div>
</template>

<script>
import Vraag from "./Vragen";
import Bom from "./Bom";
import PlayerList from "./PlayerList";
import HelpModal from "./HelpModal";
import MenuButton from "./MenuButton";
import Vuetify from "vuetify";
import Vuex from "vuex";

import io from "socket.io-client";
import Axios from "axios";
import { setTimeout } from 'timers';

// const store = new Vuex.Store({
//   state: {
//     BombState: 1,
//     PlayerList: null,
//     gameOver: false,
//     alert: false,
//     answercorrect: false,
//     answerwrong:false,
//   },
//   mutations: {
//     increment (state) {
//       return;
//     }
//   }
// });

if (window.location.href.indexOf('game/hotpotato') > -1 && (getQueryFromURL(window.location.href, 'lobby') === "" || getQueryFromURL(window.location.href, 'name') === ""))
  window.location.replace(window.location.origin + '/lobby/hotpotato');

function getQueryFromURL(url, query) {
    if (url.indexOf(query + '=') == -1)
        return "";
    return url.split(query + '=')[1].split('&')[0];
}

global.socket = io(window.location.origin + window.location.pathname + "/" + getQueryFromURL(window.location.href, 'lobby'));



  global.socket.emit('name', getQueryFromURL(window.location.href, 'name'));


global.socket.on("playerCount", function(msg) {
  console.log(msg);
});
global.socket.on("question", function(msg) {
  console.log(msg);
  app.$children[0].getQuestion(msg);
});
global.socket.on("gameEnd", function(end) {
  if(end)
  {
    app.$children[0].resetAlert();
    app.$children[0].alert = true;
    app.$children[0].gameOver = true;
  }
});
let pList = [];
global.socket.on("players", function(players) {
  console.log(players);
  pList = players;
  app.$children[0].getPlayerList(players);

});
global.socket.on("bombState", function(state) {
 
    app.$children[0].BombState =state;

});
global.socket.on("bomb", function(id) {
 app.$children[0].getPlayerWithBomb(pList[id]);
 console.log(id+"has the bomb!");

});
global.socket.on("explosion", function(msg) {
  app.$children[0].BombState = 4;
  app.$children[0].gameOver(true);
  
});
global.socket.on("answerResult", function(msg) {
  if (msg) {
    app.$children[0].resetAlert();
    app.$children[0].answercorrect = true;
  } else {
    app.$children[0].resetAlert();
    app.$children[0].answerwrong = true;
  }
});



export default {
  name: "HotPotato",
  data() {
    return {
      lobby: "",
      question: null,
      BombState: 1,
      PlayerList: null,
      gameOver: false,
      alert: false,
      answercorrect: false,
      answerwrong:false,
      PlayerWithBomb:null,

      endGame: false,
      showModal: false,
      helpimgw: "https://i.imgur.com/ZU7BBQV.png"
    };
  },
  components: {
    Vraag,
    Bom,
    PlayerList,
    MenuButton,
    HelpModal
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
    },
    getPlayerList: function(pl) {
      this.PlayerList = pl;
    },
    startGame: function() {
      Axios.get("/api/startgame/" + getQueryFromURL(window.location.href, 'lobby'));
    },
    getPlayerWithBomb: function(id) 
     {
      this.PlayerWithBomb=id;
      
    },
    gameOver: function(end) {
      this.gameOver = end;
      console.log(this.gameOver);
    },
    resetAlert: function(){
      this.alert = false;
      this.answercorrect = false;
      this.answerwrong = false;
    },
  },
  computed: {
    gameIsOver: function() {
      // Weet niet of dit werkt.
      console.log(this.gameOver + "; comp");
      return this.gameOver;
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
.v-alert{
  color:black;
}
.warning{
  background-color: yellow;
}
.succes{
  background-color: green;
}
.error{
  background-color: red;
}

</style>