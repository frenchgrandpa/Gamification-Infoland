// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import HotPotato from './hot-potato/HotPotato';
import NotFound from './NotFound';
import io from 'socket.io-client';
 
const socket = io('http://localhost:3000');

socket.on('channel_name', function(msg){
  console.log('message: ' + msg);
});

Vue.config.productionTip = false;

/* eslint-disable no-new */


const routes = {
  '/': App,
  '/hotpotato': HotPotato,
}

new Vue({
  el: "#app",
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
});
