import * as types from '../constants/home'

const state = {
  tipOperateInfo: {
    isShow: false,
    tipText: '',
    data: {},
    sureCallback: function () {
    },
    cancelCallback: function () {
    }
  },
  toastInfo: {
    isShow: false,
    text: ''
  }
}

const mutations = {
  [types.OPEN_TIP_OPERATE_BOX](state, tipOperateInfo) {
    state.tipOperateInfo.isShow = true
    state.tipOperateInfo.tipText = tipOperateInfo.tipText
    if (tipOperateInfo.data) {
      state.tipOperateInfo.data = tipOperateInfo.data
    }
    if (tipOperateInfo.sureCallback) {
      state.tipOperateInfo.sureCallback = tipOperateInfo.sureCallback
    } else {
      state.tipOperateInfo.sureCallback = function () {

      }
    }
    if (tipOperateInfo.cancelCallback) {
      state.tipOperateInfo.cancelCallback = tipOperateInfo.cancelCallback
    }
  },
  [types.CLOSE_TIP_OPERATE_BOX](state) {
    state.tipOperateInfo.isShow = false
    state.tipOperateInfo.tipText = ''
    state.tipOperateInfo.cancelCallback && state.tipOperateInfo.cancelCallback(state.tipOperateInfo.data)
  },
  [types.SURE_TIP_OPERATE_BOX](state) {
    state.tipOperateInfo.isShow = false
    state.tipOperateInfo.tipText = ''
    state.tipOperateInfo.sureCallback && state.tipOperateInfo.sureCallback(state.tipOperateInfo.data)
  },
  [types.OPEN_TOAST](state, text) {
    state.toastInfo.isShow = true
    state.toastInfo.text = text
  },
  [types.CLOSE_TOAST](state) {
    state.toastInfo.isShow = false
    state.toastInfo.text = null
  }
}

const getters = {
  tipOperateInfo: state => state.tipOperateInfo,
  toastInfo: state => state.toastInfo
}

export default {
  state,
  mutations,
  getters
}