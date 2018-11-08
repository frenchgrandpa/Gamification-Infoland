<template>
    <div class="container">
        <h1>{{msg}}</h1>
        <p>{{currentRoute}}</p>
        <v-form @submit.prevent="submit">
            <v-text-field
            v-model="name"
            :counter="10"
            label="Name"
            required
            ></v-text-field>
            <v-select
            v-model="selectedLobby"
            :rules="[v => !!v || 'Item is required']"
            :options="lobbys"
            label="text"
            required
            ></v-select>
            <input type="hidden" 
            <v-btn type="submit">submit</v-btn>
            <!--  TODO:     Form submition naar /game/hotpotato?lobby=lobbyname
                                                POST: username
            -->

            
        </v-form>
    </div>
</template>


<script>
import vue from 'vue' 
import vSelect from 'vue-select'
import axios from 'axios'
vue.component("v-select", vSelect);

export default {
  name: "HotPotatoLobby",
  data() {
   return {
      msg: "Hot Potato Lobby",
      currentRoute: window.location.pathname,
      name: "",
      selectedLobby: [] ,
      lobbys: [
        {
          text: "lobby1",
          currentplayers: 2
        },
        {
          text: "lobby2",
          currentplayers: 0
        }
      ],
      form_info: {
        name: "",
      selectedLobby: [] ,
            
        },
    };
  },
  methods: {
    submit() {
      var config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      }

      axios({
        method: 'post',
        url: "/game/hotpotato/" + this.selectedLobby.text,
        data: {
          name: this.name
        }, config
      });  

      /*axios.post("/game/hotpotato?lobby=" + this.selectedLobby.text, {name: this.name})
          .then(res => {
             window.location = "localhost:7000/game/hotpotato"
             print(selectedLobby.name);
          })
          .catch(err => {});*/
    }
  }
};
</script>


<style lang="css" scoped>
.container {
  text-align: center;
}
</style>
