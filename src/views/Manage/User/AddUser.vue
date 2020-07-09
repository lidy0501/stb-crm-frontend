<template>
  <div class="add-staff">
    <top-head :title="'新增客户'"></top-head>
    <div class="base-info">
      <div class="title">客户基本信息</div>
      <div class="item">
        <left-head class="margin-20" :left-title="'客户姓名'" :necessary="true"></left-head>
        <input placeholder="请输入客户姓名" v-model="userName"/>
        <span class="error-tip">{{errorTips[0]}}</span>
      </div>
      <div class="item">
        <left-head class="margin-20" :left-title="'手机号'" :necessary="true"></left-head>
        <input placeholder="请输入客户手机号" v-model="userPhone"/>
        <span class="error-tip">{{errorTips[1]}}</span>
      </div>
      <div class="item">
        <left-head class="margin-20" :left-title="'公司名称'" :necessary="false"></left-head>
        <input placeholder="请输入客户公司名称，非必填" v-model="company"/>
        <span class="error-tip">{{errorTips[2]}}</span>
      </div>
      <div class="item">
        <left-head class="margin-20" :left-title="'客户邮箱'" :necessary="false"></left-head>
        <input placeholder="请输入客户邮箱，非必填" v-model="userEmail"/>
      </div>
      <!--<div class="item">-->
      <!--<left-head class="margin-20" :left-title="'职务'" :necessary="true"></left-head>-->
      <!--<input placeholder="请输入客户职务" v-model="passWord"/>-->
      <!--<span class="error-tip">{{errorTips[3]}}</span>-->
      <!--</div>-->
      <div class="item2">
        <left-head class="margin-20" :left-title="'备注'" :necessary="false"></left-head>
        <textarea placeholder="请输入客户备注，非必填(限200字)" v-model="remark"/>
      </div>
      <footer-btn @goBack="goBack" @save="save"></footer-btn>
    </div>
    <toast v-if="showToast" :tip-text="operateResult"></toast>
  </div>
</template>

<script>
  import TopHead from '../../../components/TopHead/TopHead.vue'
  import LeftHead from '../../../components/LeftHead/LeftHead.vue'
  import FooterBtn from '../../../components/FooterBtn/FooterBtn.vue'
  import Toast from '../../../components/Toast/Toast.vue'

  export default {
    name: 'AddStaff',
    components: {Toast, LeftHead, TopHead, FooterBtn},
    data() {
      return {
        userName: '',
        company: '',
        userPhone: '',
        userEmail: '',
        remark: '',
        saveFlag: '',
        errorTips: [],
        showToast: false,
        operateResult: ''
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      save() {
        this.saveFlag = true
        this.validateInfo()
        if (!this.saveFlag) return

        this.$http.post('/UserController/addUser', {
          userName: this.userName,
          company: this.company,
          userPhone: this.userPhone,
          userEmail: this.userEmail,
          remark: this.remark
        }).then(res => {
          const data = res.data
          this.operateResult = data.message
          this.showToast = true
          setTimeout(() => {
            this.showToast = false
            if (data.code === 0) {
              this.$router.push('private-user-list')
            }
          }, 2000)
        })
      },
      validateInfo() {
        if (!this.userName) {
          this.$set(this.errorTips, 0, '客户姓名不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 0, '')
          this.saveFlag = true
        }
        if (!this.userPhone) {
          this.$set(this.errorTips, 1, '客户手机号不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 1, '')
        }
        this.$forceUpdate
      }
    },
  }
</script>

<style module lang="stylus">
  .add-staff
    width 100%

  .base-info
    padding 20px
    margin-top 20px
    background-color #fff
    border-radius 5px

  .title
    height 50px
    line-height 50px
    font-size 16px
    font-weight bold

  .margin-20
    margin-right 20px

  .item
    display flex
    align-items center
    margin-bottom 20px

  input
    height 40px
    padding-left 10px
    width 300px

  .item2
    display flex
    margin-bottom 20px

  textarea
    width 800px
    height 80px
    padding 10px
    outline none
    font-size 16px

  .staff-right
    display flex
    flex-wrap wrap
    width 900px

  .right-item
    display flex
    width 150px
    align-items center
    height 20px
    margin-bottom 20px

    i
      font-size 16px
      margin-right 5px

  .selected
    color green

  .un-selected
    color #d7d7d7

  .error-tip
    color #f00
    font-size 12px
    margin-left 20px

</style>