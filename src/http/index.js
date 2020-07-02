import Vue from 'vue'
import axios from 'axios'

//const BASE_URL = 'http://47.114.140.213:9911/crm'  // todo 别忘了换过来
const BASE_URL = 'http://localhost:9911/crm'

// 设置访问根路径
axios.defaults.baseURL = BASE_URL
axios.defaults.withCredentials=true // 解决跨域


const baseAxios = axios.create({
  baseURL: BASE_URL
})

// 挂载axios
Vue.prototype.$http = axios

