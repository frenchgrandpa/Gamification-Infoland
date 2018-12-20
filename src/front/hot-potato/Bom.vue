<template>
<div class="bom">
  <h1>{{computedTime}}</h1>
  <v-img :src=drawImage(fase) id="bomimg" class="shakingimage" v-bind:class="shaketype"/>
 <audio autoplay hidden>
  
  <v-source src="../assets/Sound/backgroundmusic.mp3" type="audio/mpeg"/>
</audio>
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
   computed: {
     shaketype:function(){
      
         return 'shakeimage'+this.fase;
       
     },
    computedPercentage: {
      get(){
        return (this.fase-1)*25;
      },
      set(newVal)
      {
        this.percentage= newVal*25;
      }
    },
    computedTime:function()
    {
        
    
      
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
         return "https://i.imgur.com/gobDNXH.png";
         }
          else if (number==4)
         {
           var audio = new Audio('https://archive.org/download/explosion_239/DIEXPLOS.mp3')
           audio.play();
         return "https://i.imgur.com/JSvptGR.png"
         }
       },
       faseToPercentile: function(number)
       {
           
         this.percentage= (number)*25;
         return number*25;
         
       },
       dance:function()
       {
         var date = new Date();
         var now = date.getTime(); 
         var then=now+1000;
         if(then===now)
         {
           return "hoi"
        }
        else
        {
          return "noi"
        }
         
      
         
       },
         PlaySound: function(number)
         {
             if (number==4)
            {
             var audio = new Audio("../assets/Sound/backgroundmusic.mp3")
             audio.play();
            
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
  .rotate {
    transform: rotate(20deg);
} 
.shakeimage4 {
   
}
.shakeimage3 {
    animation: shake2 0.5s; 
    animation-iteration-count: infinite; 
}
.shakeimage2 {  
    animation: shake 3s; 
    animation-iteration-count: infinite; 
}
.shakeimage1 {
 
}

@keyframes shake {  
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
} 
@keyframes shake2 {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
} 
  </style>
