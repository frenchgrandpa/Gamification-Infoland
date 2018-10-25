<template>
    <div class="container">
        <h1>{{msg}}</h1>
        <p>{{currentRoute}}</p>
        <div v-if="lobbys.length">
            <div v-for="lobby in lobbys">
                <v-btn v-on:click="greet">{{lobby.name}} --- Online: {{lobby.currentplayers}}</v-btn>
            </div>
        </div>
        <div v-else>
            <p>No available lobbys</p>
        </div>
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
          name: "lobby1",
          currentplayers: 2
        },
        {
          name: "lobby2",
          currentplayers: 0
        }
      ]
    };
  },
  methods: {
    greet: function() {
      var name = prompt("Please enter your name:", "Your name");
      this.currentRoute = name;
    }
  }
};
</script>

<style lang="css" scoped>
.container {
  text-align: center;
}
</style>
