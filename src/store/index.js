import Vue from 'vue'
import Vuex from 'vuex'

import staffModule from './modules/staff'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    staffModule
  }
})