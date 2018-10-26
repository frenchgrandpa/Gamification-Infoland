<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-img :src="image" :aspect-ratio="16/9">
               <v-layout pa-2 column fill-height class="lightbox white--text">
          <v-spacer></v-spacer>
          <v-flex shrink>
            <div id="subheadinggame">
              <p >
              {{vraag}}
              </p>
            </div>
          </v-flex>
        </v-layout>
        </v-img>
              
      </v-flex>

    </v-layout>
    <v-layout row wrap justify-space-between>
      <v-flex v-for="antwoord in antwoorden" xs6 py-1 px-2>
        
        <v-btn block>
          {{antwoord.text}}
        </v-btn>
        
      </v-flex>
   
    </v-layout>
     
  </v-container>
 
</template>

<script>

import Axios from 'axios';
import AnswerButton from "./AnswerButton";
export default {
  name: "Vraag",
  data() {
    return {
      vraag: "Is dit een vraag?",
      antwoorden: [ {text: "Ja"}, {text: "Nee"}, {text: "Misschien"}, {text: "Dit is een antwoord"}],
      image: "https://uploads.codesandbox.io/uploads/user/ae416c95-edc9-4929-bfa4-84a2c042e083/zKY6-thumbnail.png"
    };
  },
   components: {
     AnswerButton
   },
    methods: {
    next() {
      Axios.get('/api/vraag').then((response) =>{
        this.vraag = response.data.text || "";
        this.image = response.data.media || "";
        this.antwoorden = response.data.answers || [];
      }).catch((err) => {
      })
    }
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
.lightbox {
  box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 72px);
}

#subheadinggame {
  font-size: 180%;
}
</style>
