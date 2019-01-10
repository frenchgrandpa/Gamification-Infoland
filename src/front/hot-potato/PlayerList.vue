

<template>
  <v-container>
    <v-flex>
      <v-card class="elevation-10">
        <v-toolbar color="light-blue" dark>
          <v-toolbar-side-icon v-on:click="toggleList"></v-toolbar-side-icon>

          <v-toolbar-title>Players</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon @click="openHelp()">
            <v-icon>info</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list>
          <v-list-tile
            v-for="playerid in id"
            :key="playerid"
            v-if="enabled==true || playerid==playerWithBomb"
          >
            <v-list-tile-content>
              <v-list-tile-title v-text="playerid" v-bind:id="playerid">{{playerid}}</v-list-tile-title>
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
  props: ["id", "playerWithBomb", "listEnabled"],
  data() {
    return {
      enabled: true
    };
  },
  computed: {
    hasBomb: function(inputid) {
      if (inputid === this.$props.playerWithBomb) {
        console.log(
          "Id van speler met bom: " +
            this.$props.playerWithBomb +
            ": id van speler: " +
            id
        );
        return true;
      }
    }
  },
  methods: {
    toggleList: function() {
      if (this.enabled == true) {
        this.enabled = false;
      } else {
        this.enabled = true;
      }
    },
    openHelp: function()
    {
      console.log("event send");
      this.$emit('clickedHelp');
    },
  }

  //players: [],
};
</script>

<style>
</style>
