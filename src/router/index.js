import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 导入页面组件
import Error from '../components/Error.vue'
import TodoList from '../views/MainTodo/TodoList.vue'
import Login from '../views/Login/Login.vue'
import Manage from '../views/Manage/Manage.vue'
import AddStaff from '../views/Manage/Staff/AddStaff.vue'
import StaffList from '../views/Manage/Staff/StaffList.vue'


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
  },
  {
    name: 'manage',
    path: '/manage',
    component:Manage,
    children: [
      {
        name: 'AddStaff',
        path: 'add-staff',
        component: AddStaff
      },
      {
        name: 'StaffList',
        path: 'staff-list',
        component: StaffList
      }
    ]
  }
]

const router = new Router({
  routes: routerMap
})

// 用于解决报错
const originalPush = Router.prototype.replace
Router.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}




// 挂载导航守卫
router.beforeEach((to, from, next) => {
  console.log(1)
  // to 将要访问
  // from 从哪访问
  // next 接着干的事   next(url) 重定向到url上，    next() 是继续访问to路径
  if (to.path === '/login') return next();
  // 获取staff
  const staff = window.sessionStorage.getItem('staff') //取出员工信息
  if (!staff) return next('/login') // 无值，返回登录页
  next() // 符合要求放行
})

export default router
