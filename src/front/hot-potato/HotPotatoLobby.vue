<template>
    <div class="container">
        <h1>{{msg}}</h1>
        <p>{{currentRoute}}</p>
        <v-form v-model="form_info">
            <v-text-field
            v-model="name"
            :counter="10"
            label="Name"
            required
            ></v-text-field>
            <v-select
            v-model="selectedLobby"
            :items="lobbys"
            :rules="[v => !!v || 'Item is required']"
            item-value="text"
            label="Lobby"
            required
            ></v-select>
            <!-- TODO:      put 'available' lobbys in select tag
                -->

            <v-btn>submit</v-btn>
            <!--  TODO:     Form submition naar /game/hotpotato?lobby=lobbyname
                                                POST: username
            -->
        </v-form>
        
    </div>
</template>


<script>
export default {
  name: "HotPotatoLobby",
  data() {
    return {
      msg: "Hot Potato Lobby",
      currentRoute: window.location.pathname,
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
        selectedLobby: {}
      }
    };
  },
  methods: {
    submit: function(e) {}
  }
};
</script>


<style lang="css" scoped>
.container {
  text-align: center;
}
</style>