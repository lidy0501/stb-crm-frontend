<template>
  <div class="add-staff">
    <div class="title">
      <div class="title-name">公司客户列表</div>
      <div class="search-box">
        <div class="input-sty">
          <i class="iconfont icon-sousuo"></i>
          <input type="text" v-model="searchValue" placeholder="客户姓名/手机号/公司/地区"/>
        </div>
        <div class="btn-search" @click="search">查询</div>
        <div class="btn-export" @click="exportUserInfo">导出</div>
      </div>
    </div>
    <div class="list-container">
      <div class="list-title">
        <span class="col1 padL10">编码</span>
        <span class="col2">姓名</span>
        <span class="col3">手机号</span>
        <span class="col4">邮箱</span>
        <span class="col5">公司</span>
        <span class="col6">地区</span>
        <span class="col7">职位</span>
        <span class="col8">跟进人</span>
        <span class="col9">跟进天数</span>
        <span class="col10">操作</span>
      </div>
      <div class="list-content">
        <div class="list-item" v-for="item in userList" :key="item.userId">
          <span class="col1 padL10">{{item.userCode}}</span>
          <span class="col2">{{item.userName}}</span>
          <span class="col3">{{item.userPhone || '--'}}</span>
          <span class="col4" :title="item.userEmail">{{item.userEmail || '--'}}</span>
          <span class="col5" :title="item.company">{{item.company || '--'}}</span>
          <span class="col6" :title="item.region">{{item.region || '--'}}</span>
          <span class="col7" :title="item.post">{{item.post || '--'}}</span>
          <span class="col8">{{item.operatorName}}</span>
          <span class="col9">{{item.followDays}}</span>
          <span class="col10">
            <span class="common-btn margR5" @click="$router.push(`add-user/${item.userId}`)">详情</span>
            <span class="common-btn margR5" @click="changeUserType(item)">公有化</span>
            <span class="common-btn" @click="deleteUser(item)">删除</span>
          </span>
        </div>
        <QuickPager :page="page" @QuickPager="QuickPager"></QuickPager>
      </div>
    </div>
  </div>
</template>

<script>
  import TopHead from '../../../components/TopHead/TopHead.vue'
  import QuickPager from '../../../components/QuickPager/QuickPager.vue'
  import {OPEN_TIP_OPERATE_BOX, OPEN_TOAST} from '../../../store/constants/home'


  export default {
    name: 'PrivateUserList',
    components: {TopHead, QuickPager},
    data() {
      return {
        loginStaff: JSON.parse(window.sessionStorage.getItem('staff')),
        searchValue: '',
        userList: [],
        page: {
          startIndex: 0,
          currentPage: 1,
          pageRows: 10,
          totalPages: 1,
          totalRows: 0
        }
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.$http.post('/UserController/queryPrivateUser', {
          searchValue: this.searchValue,
          startIndex: this.page.startIndex
        }).then(res => {
          const data = res.data
          this.userList = data.list
          this.page = data.page
          this.page.currentPage = Math.floor(data.page.startIndex / data.page.pageRows) + 1
          this.$glo_loading.loadingHide()
        })
      },
      search() {
        // todo
        this.page = {
          startIndex: 0,
          currentPage: 1,
          pageRows: 10,
          totalPages: 1,
          totalRows: 0
        }
        this.init()
      },
      QuickPager(page) {
        this.page.startIndex = page.startIndex
        this.page.pageRows = page.pageRows
        this.page.currentPage = page.currentPage
        this.init()
      },
      deleteUser(user) {
        this.$store.commit(OPEN_TIP_OPERATE_BOX, {
          tipText: '确定要删除' + user.userName + '吗？',
          sureCallback: () => {
            this.$http.post('/UserController/deleteUserById/' + user.userId).then(res => {
              this.$glo_loading.loadingHide()
              const data = res.data
              this.$store.commit(OPEN_TOAST, data.message)
              if (data.code === 0) {
                this.init()
              }
            })
          }
        })
      },
      changeUserType(user) {
        this.$store.commit(OPEN_TIP_OPERATE_BOX, {
          tipText: '确定要将' + user.userName + '移至公共区吗？',
          sureCallback: () => {
            this.$http.post('/UserController/changeUserType/' + user.userId).then(res => {
              this.$glo_loading.loadingHide()
              const data = res.data
              this.$store.commit(OPEN_TOAST, data.message)
              if (data.code === 0) {
                this.init()
              }
            })
          }
        })
      },
      exportUserInfo() {
        if (process.env.NODE_ENV === 'development') {
          console.log(1)
          location.href = 'http://localhost:9911/crm/UserController/exportUserInfo?id=' + this.loginStaff.staffId + '&searchValue=' + this.searchValue
        } else if (process.env.NODE_ENV === 'none') { // 测试
          console.log(2)
          location.href = 'http://47.114.140.213:9911/crm/UserController/exportUserInfo?id=' + this.loginStaff.staffId + '&searchValue=' + this.searchValue
        } else if (process.env.NODE_ENV === 'production') {
          console.log(3)
          location.href = 'http://stbcrm.top:9911/crm/UserController/exportUserInfo?id=' + this.loginStaff.staffId + '&searchValue=' + this.searchValue
        }

      }
    }
  }
</script>

<style module lang="stylus" scoped>
  .add-staff
    width 100%

  .title
    background-color #fff
    padding 0 20px
    height 60px
    border-radius 5px
    display flex
    align-items center
    justify-content space-between


  .title-name
    font-size 18px
    font-weight bold

  .search-box
    display flex
    align-items center


  .input-sty
    width 280px
    display flex
    height 40px
    align-items center
    border 1px solid #f0f0f0
    border-radius 5px
    margin-right 20px
    padding 0 10px

    i
      color #d7d7d7

    input
      outline none
      border none

  .btn-search
    height 40px
    background-color mediumseagreen
    color #fff
    width 80px
    text-align center
    line-height 40px
    font-size 16px
    border-radius 5px
    cursor pointer
    font-weight 200

  .btn-export
    height 40px
    background-color orange
    color #fff
    width 80px
    text-align center
    line-height 40px
    font-size 16px
    border-radius 5px
    cursor pointer
    font-weight 200
    margin-left 20px


  .list-container
    margin-top 20px
    background-color #fff
    border-radius 5px

  .list-title
    height 50px
    display flex
    line-height 50px
    background-color #f0f4f6
    font-weight bold

  .list-content
    height 560px
    overflow-y auto

    &::-webkit-scrollbar
      display none

  .list-item
    display flex
    height 45px
    line-height 45px
    border-bottom 1px solid #f0f0f0
    font-size 14px

    > span
      word-break break-all
      overflow hidden
      text-overflow ellipsis
      white-space nowrap

    &:hover
      background-color #edf6f6


  .col1
    width 6%

  .col2
    width 10%

  .col3
    width 10%

  .col4
    width 13%

  .col5
    width 13%

  .col6
    width 10%

  .col7
    width 5%

  .col8
    width 7%

  .col9
    width 7%


  .padL10
    padding-left 10px

  .common-btn
    display inline-block
    padding 0 5px
    height 30px
    color #3cb371
    text-align center
    line-height 30px
    border 1px solid #3cb371
    border-radius 5px
    cursor pointer

  .margR5
    margin-right 5px

  .text-flow
    word-break break-all
    overflow hidden
    text-overflow ellipsis
    white-space nowrap


</style>