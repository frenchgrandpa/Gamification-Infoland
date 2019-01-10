<template>
  <v-container class="elevation-24">
    <v-layout row wrap justify-space-between>
      <v-flex xs12 align-content-center>
        <v-img
          :src="question.media"
          max-width="600px"
          style="margin-left: auto; margin-right: auto;"
        >
          <v-layout pa-2 column fill-height class="lightbox white--text">
            <v-spacer></v-spacer>
            <v-flex shrink>
              <div id="subheadinggame">
                <p class="nowrap">{{question.text}}</p>
              </div>
            </v-flex>
          </v-layout>
        </v-img>
        <p v-if="question.correctanswers === 1">Geef {{question.correctanswers}} antwoord</p>
        <p v-else>Geef {{question.correctanswers}} antwoorden</p>
      </v-flex>
      <v-flex v-for="antwoord in question.answers" :key="antwoord.id" xs12 sm6 py-1 px-2>
        <v-btn
          v-if="question.correctanswers > 1"
          block
          v-on:click="answerMultiple(antwoord.id)"
          v-bind:id="antwoord.id"
          :disabled="isSelected(antwoord.id) || isDisabled(antwoord.id)"
        >
          <p class="nowrap">{{antwoord.text}}</p>
          <!--TODO: Button disablen wanneer hierop gedrukt is en een popup met het aantal antwoorden dat gegeven moet worden-->
        </v-btn>
        <v-btn
          v-else
          block
          v-on:click="answer(antwoord.id)"
          v-bind:id="antwoord.id"
          v-bind:disabled="isDisabled(antwoord.id)"
        >
          <p class="nowrap">{{antwoord.text}}</p>
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
  props: ["question", "btndisabled"],
  data() {
    return {
      vraag: "Is dit een vraag?",
      selectedAnswers: [],
      antwoorden: [],
      image: ""
    };
  },
  components: {
    AnswerButton
  },
  computed: {},
  methods: {
    isSelected: function(id) {
      return this.selectedAnswers.includes(id);
    },
    isDisabled(id) {
      console.log("check " + id);

      this.selectedAnswers.forEach(function(item, index) {
        console.log(index);
      });

      if (this.selectedAnswers.includes(id)) {
        return true;
      } else if (this.btndisabled) {
        console.log(id + " disabled nothing to answer");
        return true;
      } else {
        console.log(id + " displayed");
        return false;
      }
    },
    next() {
      Axios.get("/api/vraag")
        .then(response => {
          this.vraag = response.data.text || "";
          this.image = response.data.media || "";
          this.antwoorden = response.data.answers || [];
          //this.correctanswers = response.data.correctanswers || "";
        })
        .catch(err => {});
    },
    answer(id) {
      console.log("hello");
      global.socket.emit("answer", [id]);
    },
    answerMultiple(id) {
      console.log("added " + id);
      this.selectedAnswers.push(id);
      console.log(
        "Aantal gegeven antwoorden: " +
          this.selectedAnswers.length +
          ". Aantal totale antwoorden: " +
          this.question.correctanswers
      );
      if (this.selectedAnswers.length >= this.question.correctanswers) {
        console.log("answered " + this.selectedAnswers.length);
        global.socket.emit("answer", this.selectedAnswers);
        this.selectedAnswers = [];
      }
    }
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

.nowrap {
  white-space: normal;
  margin-bottom: 0;
}
</style>
