

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
               v-for="player in id" :key="player"
            >
          
              <v-list-tile-content>
                <v-list-tile-title v-text="player" v-bind:id="player">{{player}}</v-list-tile-title>
              </v-list-tile-content>
              
               <v-list-tile-avatar v-if="player===playerWithBomb">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6vA0FamPqZ1oPp8B6GViZ0I3xlLaN8JpxROySg5ozAuPoIrpU">
              </v-list-tile-avatar>
              <h3>
            {{playerWithBomb}}
            </h3>
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
