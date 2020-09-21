// 实例化vue根实例
import Vue from 'vue'

// 导入App组件
import App from './App.vue'

// 导入路由文件
import router from './router'

// 导入axios
import  './http/index.js'

// 导入store

import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import glo_loading from './loading/index' //loading组件的简单封装
import {routerLoading, apiLoading} from './config/load' //全局的页面跳转loading是否启用
Vue.prototype.$glo_loading = glo_loading
Vue.prototype.$routerLoading = routerLoading
Vue.prototype.$apiLoading = apiLoading


import '../src/assets/icon/iconfont.css'

Vue.use(ElementUI)

import utils from './utils'
Vue.prototype.$utils = utils

// 创建vue根实例
new Vue({
  el: '#app', // 使用vue接管index.html中id为app的div的内容
  components: {
    // 组件名：组件对象
    App: App  // 变量名与对象名一致时，可简写，即只写App也行
  },
  template: '<App/>',
  router,
  store
})
