// 实例化vue根实例
import Vue from 'vue'

// 导入App组件
import App from './App.vue'

// 导入路由文件
import router from './router'

// 导入axios
import http from './http/index.js'

// 创建vue根实例
new Vue({
  el: '#app', // 使用vue接管index.html中id为app的div的内容
  components: {
    // 组件名：组件对象
    App: App  // 变量名与对象名一致时，可简写，即只写App也行
  },
  template: '<App/>',
  router
})
