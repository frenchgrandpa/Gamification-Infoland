<template>
<div class="bom">
  <img :src="image" id="bomimg"/>
</div>
</template>

<script>
export default {
  name: "Bom",
  data() {
    return {
      image: "https://uploads.codesandbox.io/uploads/user/ae416c95-edc9-4929-bfa4-84a2c042e083/y7M0-bomtemp.PNG"
    };
  }
};
</script>

<style>
.bom {
  background-color: yellow;
  color: black;
  height: 30%;
  width: 30%;
}

#bomimg {
  height: 100%;
  width: 100%;
}
</style>
