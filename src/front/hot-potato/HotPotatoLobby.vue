<template>
  <v-app>
    <div class="container">
      <h1>{{msg}}</h1>
      <p>{{currentRoute}}</p>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="UserName" :rules="nameRules" :counter="10" label="Name" required></v-text-field>
        <v-select
          v-model="selectedLobby"
          :items="lobbys"
          item-text="text"
          item-value="value"
          label="Lobby"
          name="lobby"
        ></v-select>
        <v-btn v-on:click="submit">submit</v-btn>
        <!--  TODO:     Form submition naar /game/hotpotato?lobby=lobbyname
                                                POST: username
        -->
      </v-form>
    </div>
  </v-app>
</template>


<script>
import vue from "vue";
import axios from "axios";

export default {
  name: "HotPotatoLobby",
  data() {
    return {
      msg: "Hot Potato Lobby",
      currentRoute: window.location.pathname,
      UserName: "",
      valid: true,
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
      selectedLobby: null,
      lobbys: [
        {
          text: "Lobby 0",
          value: 0,
          currentplayers: 0
        },
        {
          text: "Lobby 1",
          value: 1,
          currentplayers: 0
        }
      ],
      optionss: ["Foo", "Bar", "Fizz", "Buzz"]
    };
  },
  methods: {
    submit() {
      console.log(this.selectedLobby);
      if (this.$refs.form.validate()) {
        window.location =
          "/game/hotpotato?name=" +
          this.UserName +
          "&lobby=" +
          this.selectedLobby;
      } else {
        alert("Not validated");
      }
    }
  }
};
</script>


<style lang="css" scoped>
.container {
  text-align: center;
}
</style>