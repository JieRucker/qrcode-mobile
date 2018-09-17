import Vue from 'vue'
// import Vuex from 'vuex'
const Vuex = require('../../node_modules/vuex/dist/vuex.min.js')

import base from './base/base'
import record from './record/record'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    base,record
  }
})
