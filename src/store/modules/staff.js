const state = {
  token: '',
  staff: '',
  staffName: ''
}

const mutations = {
  // set
  SET_TOKEN: (state, token) => {
    state.token = token
    localStorage.setItem('token', token)
  },
  SET_STAFF: (state, staff) => {
    state.staff = staff
    sessionStorage.setItem('staff', JSON.stringify(staff))
  },
  REMOVE_INFO: state => {
    state.token = ''
    state.staff = ''
    state.staffName = ''
    localStorage.setItem('token', '')
    sessionStorage.setItem('staff', JSON.stringify(''))
    localStorage.setItem('staffName', '')
    // localStorage.clear() // 不知道要不要 请谨慎使用,它会清空所有的本地存储数据
    // sessionStorage.clear() // 不知道要不要 请谨慎使用,它会清空所有的本地存储数据
    localStorage.removeItem('token')
    localStorage.removeItem('staffName')
    sessionStorage.removeItem('staff')
  },
  SET_STAFF_NAME: (state, staffName) => {
    state.staffName = staffName
    localStorage.setItem('staffName', staffName)
  }
}

const getters = {
  // get, 其实通过state也能获取到信息，不一定要是用get来获取
  staff: state =>  state.staff,
  staffName: state => state.staffName,
  token: state => state.token,
}

export default {
  state,
  getters,
  mutations
}