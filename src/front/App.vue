<template>
  <v-app id="app">
      <v-content>
        <img width="25%" src="https://i.imgur.com/jSAixTv.png">
        <br>
        <hr width="100%"> 
        <br>
        <img width="25%" src="./assets/minigames-logo.png">
        <div class="button-container">
            <br>
            <br>  
        </div>
      </v-content>
    <v-container fluid grid-list-xl>
      <v-layout row justify-space-between>
        <v-flex xs2>
        </v-flex>
        <v-flex xs6>
               <v-card color="cyan darken-2" class="white--text">
                <v-layout>
                  <v-flex xs5>
                    <v-img
                      src="https://www.gingersoftware.com/content/wp-content/uploads/smoking_hot_potato_by_louiseloo-d7lou54.jpg"
                      height="125px"
                      contain
                    ></v-img>
                  </v-flex>
                  <v-flex xs7>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">Hot Potato</div>
                        <div>Beantwoord de vragen voordat de aardappel ontploft</div>
                        <div>(2019)</div>
                      </div>
                    </v-card-title>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-card-actions class="pa-3">
                 Play this game
                  <v-spacer></v-spacer>
                     <a href="/lobby/hotpotato" style="text-decoration:none">
                       <v-icon large color="teal darken-2" >play_arrow</v-icon>
                     </a>    
                </v-card-actions>
              </v-card>
        </v-flex>
        <v-flex xs2>
        </v-flex>
      </v-layout>
  </v-app>
</template>

<script>
import Axios from "axios";

export default {
  name: "App",
  components: {},
  methods: {
    login() {
      Axios.post("/api/account/login", {
        username: "berk",
        password: "test"
      })
        .then(response => {
          window.location.href = "/game/hotpotato?naam=testmeneer";
        })
        .catch(err => {
          alert(err);
        });
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
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
