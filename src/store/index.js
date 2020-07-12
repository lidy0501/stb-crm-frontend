import Vue from 'vue'
import Vuex from 'vuex'

import staffModule from './modules/staff'
import dialogModule from './modules/dialogbox'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    staffModule,
    dialogModule
  }
})