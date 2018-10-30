<template>
  <v-container>
    <v-layout row wrap justify-space-between >
      <v-flex xs12 align-content-center> 
          <!--TODO: CENTER IMAGE!! -->
        <v-img :src="image" :aspect-ratio="16/9" max-width="1080px" style="margin-left: auto; margin-right: auto;">
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
      <v-flex v-for="antwoord in antwoorden" :key="antwoord.id" xs6 py-1 px-2>
        
        <v-btn block>
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
        })
        .catch(err => {});
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

.vraag {
  height: 45%;
  margin-bottom: -3em;
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
