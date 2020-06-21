import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    staffInfo: JSON.parse(sessionStorage.getItem('staffInfo'))
  },
  mutations: {
    // set
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem('token', token)
    },
    SET_STAFFINFO: (state, staffInfo) => {
      state.staffInfo = staffInfo
      sessionStorage.setItem('staffInfo', JSON.stringify(staffInfo))
    },
    REMOVE_INFO: state => {
      state.token = ''
      state.staffInfo = ''
      localStorage.setItem('token', '')
      sessionStorage.setItem('staffInfo', JSON.stringify(''))
    }
  },
  getters: {
    // get, 其实通过state也能获取到信息，不一定要是用get来获取
    getStaff: state => {
      return state.staffInfo
    }
  },
  actions: {

  },
  modules: {

  }
})