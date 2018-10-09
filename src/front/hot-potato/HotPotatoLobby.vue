<template>
    <div class="container">
        <h1>Hot Potato Lobby</h1>
        <p>{{currentRoute}}</p>
    </div>
</template>


<script>
    export default {
        name: "HotPotatoLobby",
        data() {
            return {
                msg: "Hot Potato Lobby",
                currentRoute: data.currentRoute,
            };
        }
    };
</script>

<style lang="css" scoped>
    .container {
        text-align: center;
    }
</style>
