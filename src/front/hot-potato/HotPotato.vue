<template>
  <div id="app">
 <v-container fluid grid-list-xl>
      <v-layout row wrap>

        <v-flex xs12 md4>
            <PlayerList :id="PlayerList" :playerWithBomb="PlayerWithBomb" v-on:clickedHelp="showHelp"/>
        </v-flex>

        <v-flex xs12 md4>
            <div id="gameinfo">
                <Bom :fase="BombState" id="bom"></Bom>
            </div>
        </v-flex>
 

      </v-layout>
      <HelpModal v-if="showModal" @close="showModal = false">
        <v-img slot="body" :src="helpimgw" aspect-ratio="0.85" height="400" contain="true"/>
      </HelpModal>

    <!-- gameIsOver werkt niet goed-->
    <div v-if="gameOver">
      <v-alert v-model="alert" :value="false" type="warning" dismissible>Game-over!<br>{{PlayerWithBomb}} has lost!</v-alert>
      <v-btn @click="returnToLobby">Back to the lobby</v-btn>
    </div>
    <div class="vraag" v-bind:class="[blauwe, {succes: answercorrect}, {error: answerwrong}]" v-else-if="question != null">
      <Vraag id="vraag" v-bind:question="question" v-bind:btndisabled="answerButtonDisabled" />
    </div>
    <div v-else>
      <v-btn v-on:click="startGame">Play!</v-btn>
    </div>
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
import { setTimeout } from "timers";

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

function getQueryFromURL(url, query) {
  if (url.indexOf(query + "=") == -1) return "";
  return url.split(query + "=")[1].split("&")[0];
}

if (window.location.href.indexOf('game/hotpotato') > -1) {
  if (getQueryFromURL(window.location.href, 'lobby') === "" || getQueryFromURL(window.location.href, 'name') === "")	
    window.location.replace(window.location.origin + '/lobby/hotpotato');

  Axios.get("/api/isrunning/" + getQueryFromURL(window.location.href, 'lobby')).then((response) => {
    if (response.data)
      window.location.replace(window.location.origin + '/lobby/hotpotato');
    else {
}});

global.socket = io(window.location.origin + window.location.pathname + "/" + getQueryFromURL(window.location.href, 'lobby'));
      console.log(window.location.origin + window.location.pathname);

global.socket.on("explosion", function(msg) {
  app.$children[0].BombState = 4;
  app.$children[0].gameOver(true);
  
});
global.socket.on("answerResult", function(msg) {
  if (msg) {
    app.$children[0].resetAlert();
    app.$children[0].answercorrect = true;
    setTimeout(function(){app.$children[0].answercorrect = false},2500);
  } else {
    app.$children[0].resetAlert();
    app.$children[0].answerwrong = true;
    setTimeout(function(){app.$children[0].answerwrong = false},5000);
  }
});

      global.socket.on("playerCount", function(msg) {
        console.log(msg);
      });


      //var hp = app.$children[0];

      

      global.socket.emit('name', getQueryFromURL(decodeURIComponent(window.location.href), 'name'));

      global.socket.on("playerCount", function(msg) {
        console.log(msg);
      });


      global.socket.on("gameStart", function(msg) {
        app.$children[0].startGame();
      });
      global.socket.on("question", function(msg) {
        console.log(msg);
        app.$children[0].getQuestion(msg);
      });
      global.socket.on("gameEnd", function(end) {
        if (end) {
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
        app.$children[0].BombState = state;
      });
      global.socket.on("bomb", function(id) {
        app.$children[0].getPlayerWithBomb(pList[id]);
        console.log(id + "has the bomb!");
        if (global.socket.id == id) {
            window.navigator.vibrate([200, 200]);
          app.$children[0].answerButtonDisabled = false;
        } else {
          app.$children[0].answerButtonDisabled = true;
        }
      });
      global.socket.on("explosion", function(msg) {
        app.$children[0].BombState = 4;
        app.$children[0].gameOver = true;
      });
      global.socket.on("answerResult", function(msg) {
        if (msg) {
          app.$children[0].audioCorrect.play();
          app.$children[0].resetAlert();
          app.$children[0].answercorrect = true;
          // todo: maak hier een variable van
        } else {
          app.$children[0].audioWrong.play();
          app.$children[0].resetAlert();
          app.$children[0].answerwrong = true;
          if ((app.$children[0].PlayerWithBomb == pList[global.socket.id])) {
            app.$children[0].answerButtonDisabled = true;
            setTimeout(function() {
              app.$children[0].answerButtonDisabled = false;
            }, 5000);
          }
        }
        document.getElementById("app").scrollTop = document.getElementById("app").scrollHeight;
      });
    }




export default {
  name: "HotPotato",
  data() {
    return {
      audioCorrect: new Audio(
        "http://www.orangefreesounds.com/wp-content/uploads/2014/10/Correct-answer.mp3"
      ),
      audioWrong: new Audio(
        "http://www.orangefreesounds.com/wp-content/uploads/2014/08/Wrong-answer-sound-effect.mp3"
      ),
      lobby: "",
      question: null,
      BombState: 1,
      PlayerList: null,
      gameOver: false,
      alert: false,
      answercorrect: false,
      answerwrong: false,
      PlayerWithBomb: null,
      answerButtonDisabled: false,
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
    initAudio: function() {
      // this.audioCorrect = new Audio("http://www.orangefreesounds.com/wp-content/uploads/2014/10/Correct-answer.mp3");
      // this.audioWrong   = new Audio("http://www.orangefreesounds.com/wp-content/uploads/2014/08/Wrong-answer-sound-effect.mp3");
      this.audioCorrect.preload = "auto";
      this.audioWrong.preload = "auto";
    },
    greet: function(event) {
      // `this` inside methods points to the Vue instance
      alert("Hello " + this.question + "!");
      // `event` is the native DOM event
      
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
      Axios.get(
        "/api/startgame/" + getQueryFromURL(window.location.href, "lobby")
      );
      this.audioCorrect.play();
      this.gameOver = false;
    },
    getPlayerWithBomb: function(id) {
      this.PlayerWithBomb = id;
    },
    gameOver: function(end) {
      this.gameOver = end;
      console.log(this.gameOver);
    },
    resetAlert: function() {
      this.alert = false;
      this.answercorrect = false;
      this.answerwrong = false;
    },
    returnToLobby: function() {
      
       window.location =
          "../lobby/hotpotato"
  
    },
    showHelp: function()
    {
      console.log("show it godamnit");
      console.log(this.gameOver);
      this.showModal = true;
    }
    
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
  overflow-y: auto;
  overflow-x: hidden;
}

html {
  overflow: hidden;
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
}

#menubutton {
  order: 4;
  position: relative;
  top: 1em;
  right: 2em;
  width: 5em;
}
.v-alert {
  color: black;
}
.warning {
  background-color: yellow;
}
.blauwe {
    
  background: #80ccff;
}
.succes {
  background-color: green;
}
.error {
  background-color: red;
}
</style>