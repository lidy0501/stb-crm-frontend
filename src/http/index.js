import Vue from 'vue'
import axios from 'axios'

// 挂载axios
Vue.prototype.$http = axios


// 设置访问根路径
axios.defaults.baseURL = 'http://localhost:9911/crm'


