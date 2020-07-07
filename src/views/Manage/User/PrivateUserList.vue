<template>
  <div class="add-staff">
      <div class="title">
        <div class="title-name">公司客户列表</div>
        <div class="search-box">
          <div class="input-sty">
            <i class="iconfont icon-sousuo"></i>
            <input type="text" v-model="searchValue" placeholder="客户姓名/手机号"/>
          </div>
          <div class="btn-search" @click="search">查询</div>
        </div>
      </div>
      <div class="list-container">
      <div class="list-title">
        <span class="col1 padL10">员工姓名</span>
        <span class="col2">客户手机号</span>
        <span class="col3">客户邮箱</span>
        <span class="col4">所属公司</span>
        <span class="col5">客户备注</span>
        <span class="col6">操作</span>
      </div>
      <div class="list-content">
        <div class="list-item" v-for="item in userList" :key="item.userId">
          <span class="col1 padL10">{{item.userName}}</span>
          <span class="col2">{{item.userPhone}}</span>
          <span class="col3">{{item.userEmail}}</span>
          <span class="col4" :title="item.company">{{item.company || '--'}}</span>
          <span class="col5" :title="item.remark">{{item.remark || '--'}}</span>
          <span class="col6">
            <span class="delete-btn common-btn" @click="deleteUser(item)">删除</span>
            <span class="common-btn" @click="changeUserType(item)">公有化</span>
          </span>
        </div>
        <QuickPager :page="page" @QuickPager="QuickPager"></QuickPager>
      </div>
    </div>
    <toast v-if="showToast" :tip-text="operateResult"></toast>
    <TipOperateBox v-if="showTipBox" :tipText="tipText" @cancel="showTipBox = false" @confirm="confirmDelete"></TipOperateBox>
  </div>
</template>

<script>
  import TopHead from '../../../components/TopHead/TopHead.vue'
  import Toast from '../../../components/Toast/Toast.vue'
  import TipOperateBox from '../../../components/TipOperateBox/TipOperateBox.vue'
  import QuickPager from '../../../components/QuickPager/QuickPager.vue'

  export default {
    name: 'PrivateUserList',
    components: {Toast, TopHead, TipOperateBox, QuickPager},
    data() {
      return {
        searchValue: '',
        showToast: false,
        showTipBox: false,
        tipText: '',
        operateResult: '',
        userSelected: {},
        userList: [],
        operateType: '删除',
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
        this.operateType = '删除'
        this.userSelected = user
        this.showTipBox = true
        this.tipText = '确定要删除' + user.userName + '吗？'
      },
      changeUserType(user) {
        this.operateType = '公有化'
        this.userSelected = user
        this.showTipBox = true
        this.tipText = '确定要将' + user.userName + '移至公共区吗？'
      },
      confirmDelete() {
        this.showTipBox = false
        if (this.operateType === '删除') {
          this.$http.post('/UserController/deleteUserById/' + this.userSelected.userId).then(res => {
            const data = res.data
            this.operateResult = data.message
            this.showToast = true
            setTimeout(() => {
              this.showToast = false
              this.init()
            }, 2000)
          })
        } else {
          this.$http.post('/UserController/changeUserType/' + this.userSelected.userId).then(res => {
            const data = res.data
            this.operateResult = data.message
            this.showToast = true
            setTimeout(() => {
              this.showToast = false
              this.init()
            }, 2000)
          })
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

    > span
      word-break break-all
      overflow hidden
      text-overflow ellipsis
      white-space nowrap

    &:hover
      background-color #edf6f6


  .col1
    width 15%

  .col2
    width 15%

  .col3
    width 15%

  .col4
    width 20%

  .col5
    width 20%

  .col6
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