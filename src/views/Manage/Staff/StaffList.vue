<template>
  <div class="add-staff">
    <top-head :title="'员工列表'"></top-head>
    <div class="list-container">
      <div class="list-title">
        <span class="col1 padL10">员工姓名</span>
        <span class="col2">员工工号</span>
        <span class="col3">员工手机号</span>
        <span class="col4">员工邮箱</span>
        <span class="col5">员工密码</span>
        <span class="col6">员工权限</span>
        <span class="col7">员工备注</span>
        <span class="col8">操作</span>
      </div>
      <div class="list-content">
        <div class="list-item" v-for="item in staffList" :key="item.staffId">
          <span class="col1 padL10">{{item.staffName}}</span>
          <span class="col2">{{item.staffCode}}</span>
          <span class="col3">{{item.staffPhone}}</span>
          <span class="col4" :title="item.staffEmail">{{item.staffEmail || '--'}}</span>
          <span class="col5" :title="item.password">{{item.password}}</span>
          <span class="col6" :title="item.rightNames">{{item.rightNames}}</span>
          <span class="col7" :title="item.remark">{{item.remark || '--'}}</span>
          <span class="col8">
            <span class="delete-btn" @click="deleteStaff(item)">删除</span>
          </span>
        </div>
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

  export default {
    name: 'StaffList',
    components: {Toast, TopHead, TipOperateBox},
    data() {
      return {
        showToast: false,
        showTipBox: false,
        tipText: '',
        operateResult: '',
        staffSelected: {},
        staffList: []
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.$http.post('/StaffController/queryAllStaff').then(res => {
          const data = res.data
          this.staffList = data
        })
      },
      deleteStaff(staff) {
        this.staffSelected = staff
        this.showTipBox = true
        this.tipText = '确定要删除' + staff.staffName + '吗？'
      },
      confirmDelete() {
        this.showTipBox = false
        this.$http.post('/StaffController/deleteStaffById/' + this.staffSelected.staffId).then(res => {
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
</script>

<style module lang="stylus" scoped>
  .add-staff
    width 100%

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
    width 10%

  .col2
    width 10%

  .col3
    width 10%

  .col4
    width 15%

  .col5
    width 10%

  .col6
    width 20%

  .col7
    width 18%

  .padL10
    padding-left 10px

  .delete-btn
    display inline-block
    width 60px
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