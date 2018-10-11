<template>
<div class="menubutton">
  <!--<button type="button" class="button"><img :src="image" class="button"/></button>-->
  <input type="image" :src="image" class="button"/>
</div>

</template>
<script>
export default {
  name: "MenuButton",
  data() {
    return {
      image: "https://uploads.codesandbox.io/uploads/user/ae416c95-edc9-4929-bfa4-84a2c042e083/a_m--menubutton.png"
    };
  }
};
</script>

<style>
.menubutton {
 width: 40%;
 height: 40%;
}

.button {
  width: 90px;
  height: 90px;
}
</style>
