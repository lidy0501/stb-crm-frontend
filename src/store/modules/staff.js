const state = {
  token: '',
  staff: JSON.parse(sessionStorage.getItem('staff'))
}

const mutations = {
  // set
  SET_TOKEN: (state, token) => {
    state.token = token
    localStorage.setItem('token', token)
  },
  SET_STAFF: (state, staff) => {
    state.staffInfo = staff
    sessionStorage.setItem('staff', JSON.stringify(staff))
  },
  REMOVE_INFO: state => {
    state.token = ''
    state.staff = ''
    localStorage.setItem('token', '')
    sessionStorage.setItem('staff', JSON.stringify(''))
  }
}

const getters = {
  // get, 其实通过state也能获取到信息，不一定要是用get来获取
  getStaff: state => {
    return state.staff
  }
}

export default {
  state,
  getters,
  mutations
}