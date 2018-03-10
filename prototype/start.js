/*global require,console*/
var lsv = require('lsv-interactive');
import Vue from 'vue'
import VueResource from 'vue-resource'

import App from './src/App'

import { sync } from 'vuex-router-sync'
// import router from './src/router'
import store from './src/store'

// const unsync = sync(store, router)

Vue.use(VueResource)

// require("./src/base.css"); // this goes outside the callback since otherwise the interactive sometimes fires before the CSS is fully loaded
// require("./src/global.css");

lsv("ccc", function (interactive) {
  "use strict";

  if (!interactive) {
    console.log("Interactive <%= interactive_id %> not initiated. Exiting.");
    return;
  }

  /* eslint-disable no-new */
  new Vue({
    el: interactive.el,
    store,
    template: '<App />',
    components: {
      App
    }
  })

}, true); // change this last param to true if you want to skip the DOM checks