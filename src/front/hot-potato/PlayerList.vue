

<template>
<v-container >


<v-flex xs12 sm4 offset-sm50>
 <v-card class="elevation-10">
    <v-toolbar color="light-blue" dark>
            <v-toolbar-side-icon></v-toolbar-side-icon>
  
            <v-toolbar-title>Players</v-toolbar-title>
  
            <v-spacer></v-spacer>
  
            <v-btn icon>
              <v-icon>mdi-anchor</v-icon>
            </v-btn>
          </v-toolbar>
 <v-list>
                 <v-subheader>
                   Name
                 </v-subheader>
            <v-list-tile
<<<<<<< HEAD
              v-for="player in players"
              
              :key="player.naam"
              
=======
               v-for="player in players" :key="player.naam"
>>>>>>> cac18b90b30ffd70e0d39f01589fb4d133f0ead6
            >
           
              <v-list-tile-content>
                <v-list-tile-title v-text="player.naam" v-bind:id="player.naam">{{player.naam}}</v-list-tile-title>
              </v-list-tile-content>
              
            </v-list-tile>
          </v-list>
</v-card>
</v-flex>

</v-container>
</template>


<script>
export default {
  name: "PlayerList",
  props: ["players"],
};
</script>

<style>

</style>
