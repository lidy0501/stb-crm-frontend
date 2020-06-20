import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 导入页面组件
import Error from '../components/Error.vue'
import TodoList from '../views/MainTodo/TodoList.vue'
import Login from '../views/Login/Login.vue'


export const routerMap = [
  {
    name: 'error',
    path: '/404',
    component: Error
  },
  {
    path: '*',
    redirect:'404'
  },
  // {
  //   name: 'todo-list',
  //   path: '/todo-list',
  //   component: TodoList
  // },
  {
    path: '/',
    redirect:'login'
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  }
]

const router = new Router({
  routes: routerMap
})

export default router
