// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'vuetify/dist/vuetify.min.css'
import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App';
import HotPotato from './hot-potato/HotPotato';
import NotFound from './NotFound';
import HotPotatoLobby from './hot-potato/HotPotatoLobby';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('channel_name', function (msg) {
    console.log('message: ' + msg);
});

Vue.config.productionTip = false;

Vue.use(Vuetify);
/* eslint-disable no-new */

const pathNames = {
    general: {
        home: '/',
    },
    lobby: {
        hotpotato: '/lobby/hotpotato',
    },
    game: {
        hotpotato: '/game/hotpotato',
    },
}


let route = {};
route[pathNames.general.home] = App;

//hot potato
route[pathNames.lobby.hotpotato] = HotPotatoLobby;
route[pathNames.game.hotpotato] = HotPotato;

global.app = new Vue({
    el: "#app",
    data: {
        currentRoute: window.location.pathname,

    },
    computed: {
        ViewComponent() {
            return route[this.currentRoute] || NotFound
        }
    },
    render(h) { return h(this.ViewComponent) },
    props: {

    }

});

