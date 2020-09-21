import Vue from 'vue'
import axios from 'axios'

//const BASE_URL = 'http://47.114.140.213:9911/crm'  // todo 测试环境别忘了换过来
//const BASE_URL = 'http://47.96.230.123:9911/crm'   // todo 生产环境别忘了换过来

const BASE_URL = 'http://127.0.0.1:9911/crm'         // todo 开发环境

// 设置访问根路径
axios.defaults.baseURL = BASE_URL
axios.defaults.withCredentials=true // 解决跨域
//axios.defaults.headers.common['token'] = window.localStorage.getItem('token')

import glo_loading from '../loading/index' //loading组件的简单封装
import {apiLoading} from '../config/load' //全局的页面跳转loading是否启用

axios.interceptors.request.use(
    config => {
      // 在发送请求之前做些什么
      apiLoading ? glo_loading.loadingShow() : ''//全局loading是否启用
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

// 添加响应拦截器
// axios.interceptors.response.use(
//     function (response) {
//       // 对响应数据做点什么
//       if(response.status == 200){
//         //return response.data;
//       }else{
//         Promise.reject();
//       }
//     }, function (error) {
//       // 对响应错误做点什么
//       console.log(error);
//       //apiLoading ? glo_loading.loadingHide() : ''
//       return Promise.reject(error);
//     }
// )

// 挂载axios
Vue.prototype.$http = axios

