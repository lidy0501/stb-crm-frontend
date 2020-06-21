import Vue from 'vue'
import axios from 'axios'

const BASE_URL = 'http://localhost:9911/crm'

// 设置访问根路径
axios.defaults.baseURL = BASE_URL

const baseAxios = axios.create({
  baseURL: BASE_URL
})

// 挂载axios
Vue.prototype.$http = axios

axios.get = (url, params, config) => axios({
  method: 'get',
  params,
  url,
  ...config
})

