<template>
  <div id="app">    
    <div id="gameinfo">
      <PlayerList id="playerlist"/>
      <Bom id="bom"/>
      <MenuButton id="menubutton"/>
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
export default {
  name: "HotPotato",

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
  background: #b75205;
}

#gameinfo {
  display: flex;
  height: 50%;
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
  order: 1;
  padding-right: 10px;
  height: 125px;
  float: left;
  border: 1px solid;
  border-radius: 20px;
  position: relative;
  top: 2%;
  left: 2%;
}

.vraag {
  height: 49%;
  margin: auto;
}

#vraag {
  margin: auto;
  height: 100%;
  background: #7f5d43;
}

#menubutton {
  order: 4;
  position: relative;
  top: 1em;
  right: 2em;
  width: 5em;
}
</style>
