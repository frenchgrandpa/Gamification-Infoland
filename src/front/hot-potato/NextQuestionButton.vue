<template>
<div id="button">
  <v-btn>{{Text}}</v-btn>
  
  </div>
</template>

<script>
export default {
  name: "NextQuestionButton",
  props:{
    Text:{
      type:String,
     default:'Text was not loaded correcty!'
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
