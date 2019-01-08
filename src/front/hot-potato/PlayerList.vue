

<template>
<v-container >


<v-flex xs12 sm4 offset-sm50>
 <v-card class="elevation-10">
    <v-toolbar color="light-blue" dark>
            <v-toolbar-side-icon></v-toolbar-side-icon>
  
            <v-toolbar-title>Players</v-toolbar-title>
  
            <v-spacer></v-spacer>
  
            <v-btn icon>
              <v-icon>info</v-icon>
            </v-btn>
          </v-toolbar>
 <v-list>
            <v-list-tile
               v-for="playerid in id" :key="playerid">
          
              <v-list-tile-content>
                <v-list-tile-title v-text="playerid" v-bind:id="playerid">
                  
                  {{playerid}}
                  </v-list-tile-title>
              </v-list-tile-content>
              
               <v-list-tile-avatar v-if="playerid==playerWithBomb">
                <img src="https://i.imgur.com/7WBNNfa.png">
              </v-list-tile-avatar>
            </v-list-tile>
          </v-list>
</v-card>
</v-flex>

</v-container>
</template>


<script>
export default {
  name: "PlayerList",
  props: ["id","playerWithBomb"],
  computed:
  {
    hasBomb:function(inputid)
    {
      if(inputid===this.$props.playerWithBomb)
      {
        console.log("Id van speler met bom: "+this.$props.playerWithBomb+": id van speler: "+id)
        return true;
      }
    }
}

  //players: [],
};
</script>

<style>
</style>
