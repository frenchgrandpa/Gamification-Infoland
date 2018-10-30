

<template>
<div class="playerlist">
  <p>Players:</p>
  
  <ul>
    <li v-for="player in players">
    {{player.naam}}
    </li>
  </ul>
</div> 
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
.playerlist {
  background: #ffc16b;
}

ul{
}

li {
  width: 5%;
  padding-left: 0%;
}
</style>
