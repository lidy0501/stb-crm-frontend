<template>
  <div class="add-staff">
      <div class="title">
        <div class="title-name">公司客户列表</div>
        <div class="search-box">
          <div class="input-sty">
            <i class="iconfont icon-sousuo"></i>
            <input type="text" v-model="searchValue" placeholder="客户姓名/手机号/公司"/>
          </div>
          <div class="btn-search" @click="search">查询</div>
        </div>
      </div>
      <div class="list-container">
      <div class="list-title">
        <span class="col1 padL10">客户编码</span>
        <span class="col2">客户姓名</span>
        <span class="col3">客户手机号</span>
        <span class="col3">固定电话</span>
        <span class="col4">客户邮箱</span>
        <span class="col5">国家</span>
        <span class="col6">所属公司</span>
        <span class="col7">公司职位</span>
        <span class="col8">公司地址</span>
        <span class="col9">公司网址</span>
        <span class="col10">跟进人</span>
        <span class="col11">已跟进天数</span>
        <span class="col12">客户备注</span>
        <span class="col13">操作</span>
      </div>
      <div class="list-content">
        <div class="list-item" v-for="item in userList" :key="item.userId">
          <span class="col1 padL10">{{item.userCode}}</span>
          <span class="col2">{{item.userName}}</span>
          <span class="col3">{{item.userPhone || '--'}}</span>
          <span class="col3">{{item.userTelephone || '--'}}</span>
          <span class="col4" :title="item.userEmail">{{item.userEmail || '--'}}</span>
          <span class="col5" :title="item.nation">{{item.nation || '--'}}</span>
          <span class="col6" :title="item.company">{{item.company || '--'}}</span>
          <span class="col7" :title="item.post">{{item.post || '--'}}</span>
          <span class="col8" :title="item.companyAddress">{{item.companyAddress || '--'}}</span>
          <span class="col9" :title="item.companyWeb">{{item.companyWeb || '--'}}</span>
          <span class="col10">{{item.operatorId}}</span>
          <span class="col11">{{item.days}}</span>
          <span class="col12" :title="item.remark">{{item.remark || '--'}}</span>
          <span class="col13">
            <span class="delete-btn common-btn" @click="deleteUser(item)">删除</span>
            <span class="common-btn" @click="changeUserType(item)">公有化</span>
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
              const data = res.data
              this.$store.commit(OPEN_TOAST, data.message)
              if (data.code === 0) {
                setTimeout(() => {
                  this.init()
                }, 2100)
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
              const data = res.data
              this.$store.commit(OPEN_TOAST, data.message)
              if (data.code === 0) {
                setTimeout(() => {
                  this.init()
                }, 2100)
              }
            })
          }
        })
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
    width 10%

  .col2
    width 10%

  .col3
    width 15%

  .col4
    width 20%

  .col5
    width 10%

  .col6
    width 15%
  .col7
    width 15%
  .col8
    width 15%
  .col9
    width 15%
  .col10
    width 15%
  .col11
    width 15%
  .col12
    width 15%

  .padL10
    padding-left 10px

  .delete-btn
    margin-right 30px !important

  .common-btn
    display inline-block
    padding 0 5px
    height 30px
    color #3cb371
    text-align center
    line-height 30px
    border 1px solid #3cb371
    border-radius 5px
    margin auto 0
    cursor pointer

  .text-flow
    word-break break-all
    overflow hidden
    text-overflow ellipsis
    white-space nowrap




</style>