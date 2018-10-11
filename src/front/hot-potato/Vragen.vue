<template>
  <div class="opdracht">
    <div class="image">
      <img :src="image" id="image"/>
    </div>
    <div class="vraag">
      <p>{{ vraag }}</p> 
    </div>
    <div class="antwoorden">
      <ol class="antwoorden">
        <li v-for="antwoord in antwoorden">
        {{antwoord.waarde}}
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: "Vraag",
  data() {
    return {
      vraag: "Is dit een vraag?",
      antwoorden: [ {waarde: "Ja"}, {waarde: "Nee"}, {waarde: "Misschien"}, {waarde: "Dit is een antwoord"}],
      image: "https://uploads.codesandbox.io/uploads/user/ae416c95-edc9-4929-bfa4-84a2c042e083/zKY6-thumbnail.png"
    };
  }
};
</script>

<style>
.opdracht {
  background-color: white;
  color: black;
  border: 2px solid #4caf50;
  height: 100%;
}

.vraag{
  height: 45%;
  margin-bottom: -3em;
}

ol.antwoorden {
  margin-top: 0em;
  display: flex;
  justify-content: space-between;
  max-width: 80%;
  max-height: 40%
}

#image {
  height: 6em;
}
</style>
