<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>Volgende keer beter!</p>
    <div><a href="/home"></a></div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {
      msg: "This page is not found, jammer..."
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
    text-align: center;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
