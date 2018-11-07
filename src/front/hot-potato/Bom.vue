<template>
<div class="bom">
  <v-img :src=drawImage(fase) id="bomimg"/>

</div>
</template>

<script>
export default {
  props: ['fase'],
  name: "Bom",
  data() {
    return {
       imagefase3: "https://i.imgur.com/gobDNXH.png",
       imagefase2: "https://i.imgur.com/ckot7p0.png",
       imagefase1: "https://i.imgur.com/1r7Kpdf.png",
   
    }

   
  },
      methods:
    {
       drawImage: function(number)
       {
         if (number==1)
         {
         return "https://i.imgur.com/1r7Kpdf.png";
         }
          else if (number==2)
         {
         return "https://i.imgur.com/ckot7p0.png";
         }
           else if (number==3)
         {
         return "https://i.imgur.com/gobDNXH.png"
         }
          else if (number==4)
         {
         return "https://i.imgur.com/JSvptGR.png"
         }
       }
    }
};
</script>

<style>
.bom {

  height: 30%;
  width: 30%;
}

  #bomimg {
    height: 100%;
    width: 100%;
  }
  </style>
