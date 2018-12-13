<template>
  <v-container class="elevation-24">
    <v-layout row wrap justify-space-between >
      <v-flex xs12 align-content-center>
        <v-img :src="question.media" :aspect-ratio="16/9" max-width="600px" style="margin-left: auto; margin-right: auto;">
            <v-layout pa-2 column fill-height class="lightbox white--text">
            <v-spacer></v-spacer>
            <v-flex shrink>
                <div id="subheadinggame">
                    <p>
                        {{question.text}}
                    </p>
                </div>
            </v-flex>
        </v-layout>
        </v-img>
      </v-flex>
      <v-flex v-for="antwoord in question.answers" :key="antwoord.id" xs12 sm6 py-1 px-2>
        
        <v-btn block v-on:click = "answer(antwoord.id)" v-bind:id="antwoord.id" v-bind:disabled=btndisabled>
          {{antwoord.text}}
        </v-btn>
        
      </v-flex>
   
    </v-layout>
     
  </v-container>
 
</template>

<script>
import Axios from "axios";
import AnswerButton from "./AnswerButton";
export default {
  name: "Vraag",
  props: ["question","btndisabled"],
  data() {
    return {
      vraag: "Is dit een vraag?",
      antwoorden: [
        {
          text: "Ja",
          id: 0
        },
        {
          text: "Nee",
          id: 1
        },
        {
          text: "Misschien",
          id: 2
        },
        {
          text: "Dit is een antwoord",
          id: 3
        }
      ],
      image:
        "https://uploads.codesandbox.io/uploads/user/ae416c95-edc9-4929-bfa4-84a2c042e083/zKY6-thumbnail.png"
      ,
      correctanswers: 1,
    };
  },
  components: {
    AnswerButton
  },
  methods: {
    next() {
      Axios.get("/api/vraag")
        .then(response => {
          this.vraag = response.data.text || "";
          this.image = response.data.media || "";
          this.antwoorden = response.data.answers || [];
          this.correctanswers = response.data.correctanswers || "";
        })
        .catch(err => {});
    },
    answer(id)
    {
      console.log("hello")
      global.socket.emit('answer',id);
    },
  }
};
</script>

<style>
.opdracht {
  background-color: white;
  color: black;
  border: 2px solid #4caf50;
}

ol.antwoorden {
  margin-top: 0em;
  display: flex;
  justify-content: space-between;
  max-width: 80%;
  max-height: 40%;
}

#image {
  height: 6em;
}
.lightbox {
  box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    transparent 72px
  );
}

#subheadinggame {
  font-size: 180%;
}
</style>
