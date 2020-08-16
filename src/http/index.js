import Vue from 'vue'
import axios from 'axios'

//const BASE_URL = 'http://47.114.140.213:9911/crm'  // todo 测试环境别忘了换过来
const BASE_URL = 'http://47.96.230.123:9911/crm'   // todo 生产环境别忘了换过来

//const BASE_URL = 'http://127.0.0.1:9911/crm'         // todo 开发环境

// 设置访问根路径
axios.defaults.baseURL = BASE_URL
axios.defaults.withCredentials=true // 解决跨域
//axios.defaults.headers.common['token'] = window.localStorage.getItem('token')

axios.interceptors.request.use(
    config => {
      if (localStorage.getItem('token')) {
        //token字段是要和后端协商好的
        config.headers.common["token"] = localStorage.getItem('token');
        // debugger
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
)

// 挂载axios
Vue.prototype.$http = axios

