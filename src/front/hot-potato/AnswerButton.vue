<template>
<div id="button">
  <v-btn>{{Answer}}</v-btn>
  
  </div>
</template>

<script>
export default {
  name: "AnswerButton",
  props:{
    Answer:{
      type:String,
     default:'Answer was not loaded correcty!'
      }},
  data() {
    return {
     Nothing

    };
  }
};


</script>

<style>


.v-btn {

}
</style>
