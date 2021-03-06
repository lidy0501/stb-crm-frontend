import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 导入页面组件
import Error from '../components/Error.vue'
import Login from '../views/Login/Login.vue'
import Manage from '../views/Manage/Manage.vue'
import AddStaff from '../views/Manage/Staff/AddStaff.vue'
import StaffList from '../views/Manage/Staff/StaffList.vue'
import AddUser from '../views/Manage/User/AddUser.vue'
import PrivateUserList from '../views/Manage/User/PrivateUserList.vue'
import PublicUserList from '../views/Manage/User/PublicUserList.vue'
import AddOrder from '../views/Manage/Order/AddOrder.vue'
import OrderDetails from '../views/Manage/Order/OrderDetails.vue'
import OrderList from '../views/Manage/Order/OrderList.vue'
import AddGoods from '../views/Manage/Goods/AddGoods.vue'
import GoodsList from '../views/Manage/Goods/GoodsList.vue'
import SKUSet from '../views/Manage/Goods/SKUSet.vue'
import FinanceManage from '../views/Manage/Finance/FinanceManage.vue'
import AddContract from '../views/Manage/Contract/AddContract.vue'
import ContractList from '../views/Manage/Contract/ContractList.vue'
import DownloadTemplate from '../views/Manage/Contract/DownloadTemplate.vue'
import SystemIntroduction from '../views/Manage/SystemIntroduction.vue'

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
        path: 'add-staff/:staffId?',
        component: AddStaff
      },
      {
        name: 'StaffList',
        path: 'staff-list',
        component: StaffList
      },
      {
        name: 'AddUser',
        path: 'add-user/:userId?',
        component: AddUser
      },
      {
        name: 'PrivateUserList',
        path: 'private-user-list',
        component: PrivateUserList
      },
      {
        name: 'PublicUserList',
        path: 'public-user-list',
        component: PublicUserList
      },
      {
        name: 'AddOrder',
        path: 'add-order/:orderId?',
        component: AddOrder
      },{
        name: 'OrderDetails',
        path: 'order-details/:orderId',
        component: OrderDetails
      },
      {
        name: 'OrderList',
        path:'order-list',
        component: OrderList
      },
      {
        name: 'AddGoods',
        path:'add-goods',
        component: AddGoods
      },
      {
        name: 'GoodsList',
        path:'goods-list',
        component: GoodsList
      },
      {
        name: 'SKUSet',
        path: 'sku-set',
        component: SKUSet
      },
      {
        name: 'FinanceManage',
        path: 'finance-manage',
        component: FinanceManage
      },
      {
        name: 'AddContract',
        path: 'add-contract',
        component: AddContract
      },
      {
        name: 'ContractList',
        path: 'contract-list',
        component: ContractList
      },
      {
        name: 'DownloadTemplate',
        path: 'download-template',
        component: DownloadTemplate
      },
      {
        name: 'SystemIntroduction',
        path: '/system-introduction',
        component: SystemIntroduction
      }
    ]
  }
]

const router = new Router({
  routes: routerMap
})

// 用于解决报错
const originalPush = Router.prototype.push
Router.prototype.push = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}


// import glo_loading from '../loading/index' //loading组件的简单封装的简单封装
// import {routerLoading} from '../config/load' //全局的页面跳转loading是否启用

// 挂载导航守卫
router.beforeEach((to, from, next) => {
  //routerLoading ? glo_loading.loadingShow() : '' //如果全局启用页面跳转则加载loading

  // to 将要访问
  // from 从哪访问
  // next 接着干的事   next(url) 重定向到url上，    next() 是继续访问to路径
  if (to.path === '/login') return next();
  // 获取staff
  const token = window.localStorage.getItem('token') //取出员工信息
  if (!token) return next('/login') // 无值，返回登录页
  next() // 符合要求放行
  //routerLoading ? glo_loading.loadingHide() : ''//关闭loading层
})

export default router
