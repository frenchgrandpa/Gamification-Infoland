

<template>
<v-container class="elevation-10">
 <v-card>
 <v-list>
            <v-list-tile
              v-for="player in players"
              :key="player.naam"
            >

              <v-list-tile-content>
                <v-list-tile-title v-text="player.naam"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
</v-card>
</v-container>
</template>


<script>
export default {
  name: "PlayerList",
  data() {
    return {
      players: [{ naam: "piet" }, { naam: "jan" }, {naam: "kees"}]
    };
  }
};
</script>

<style>

</style>
