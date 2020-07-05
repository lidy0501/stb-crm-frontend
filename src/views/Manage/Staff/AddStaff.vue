<template>
  <div class="add-staff">
    <top-head :title="'新增员工'"></top-head>
    <div class="base-info">
      <div class="title">员工基本信息</div>
      <div class="item">
        <left-head class="margin-20" :left-title="'员工姓名'" :necessary="true"></left-head>
        <input placeholder="请输入员工姓名" v-model="staffName"/>
        <span class="error-tip">{{errorTips[0]}}</span>
      </div>
      <div class="item">
        <left-head class="margin-20" :left-title="'手机号'" :necessary="true"></left-head>
        <input placeholder="请输入员工手机号" v-model="staffPhone"/>
        <span class="error-tip">{{errorTips[1]}}</span>
      </div>
      <div class="item">
        <left-head class="margin-20" :left-title="'员工工号'" :necessary="true"></left-head>
        <input placeholder="请输入员工工号" v-model="staffCode"/>
        <span class="error-tip">{{errorTips[2]}}</span>
      </div>
      <div class="item">
        <left-head class="margin-20" :left-title="'员工密码'" :necessary="true"></left-head>
        <input placeholder="请输入员工密码" v-model="passWord"/>
        <span class="error-tip">{{errorTips[3]}}</span>
      </div>
      <div class="item">
        <left-head class="margin-20" :left-title="'员工邮箱'" :necessary="false"></left-head>
        <input placeholder="请输入员工邮箱，非必填" v-model="staffEmail"/>
      </div>
      <div class="item2">
        <left-head class="margin-20" :left-title="'备注'" :necessary="false"></left-head>
        <textarea placeholder="请输入员工备注，非必填(限200字)" v-model="remark"/>
      </div>
      <div class="item2">
        <left-head class="margin-20" :left-title="'员工权限'" :necessary="true"></left-head>
        <div class="staff-right">
          <div class="right-item" v-for="(item, index) in rights" :key="index">
            <div @click="item.selected = !item.selected">
              <i class="iconfont icon-xuanzhong selected" v-if="item.selected"></i>
              <i class="iconfont icon-weixuanzhong un-selected" v-else></i>
            </div>
            <span>{{item.rightName}}</span>
          </div>
          <div class="error-tip">{{errorTips[4]}}</div>
        </div>
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
        staffName: '',
        staffCode: '',
        passWord: '',
        staffPhone: '',
        staffEmail: '',
        remark: '',
        staffRights: [],
        saveFlag: '',
        errorTips: [],
        showToast: false,
        rights: [],
        operateResult: ''
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      goBack() {

      },
      save() {
        this.saveFlag = true
        this.getStaffRights()
        this.validateInfo()
        if (!this.saveFlag) return

        this.$http.post('/StaffController/addStaff', {
          staffName: this.staffName,
          staffCode: this.staffCode,
          passWord: this.passWord,
          staffPhone: this.staffPhone,
          staffEmail: this.staffEmail,
          remark: this.remark,
          rightVoList: this.staffRights
        }).then(res => {
          const data = res.data
          this.operateResult = data.message
          this.showToast = true
          setTimeout(() => {
            this.showToast = false
          }, 2000)
          // todo 返回列表
        })
      },
      init() {
        this.$http.post('/RightController/getAll').then(res => {
          const data = res.data
          this.rights = data
        })
      },
      validateInfo() {
        if (!this.staffName) {
          this.$set(this.errorTips, 0, '员工姓名不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 0, '')
          this.saveFlag = true
        }
        if (!this.staffPhone) {
          this.$set(this.errorTips, 1, '员工手机号不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 1, '')
        }
        if (!this.staffName) {
          this.$set(this.errorTips, 2, '员工工号不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 2, '')
        }
        if (!this.passWord) {
          this.$set(this.errorTips, 3, '员工密码不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 3, '')
        }
        if (!this.staffRights.length) {
          this.$set(this.errorTips, 4, '请选择员工权限')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 4, '')
        }
        this.$forceUpdate
      },
      getStaffRights() {
        this.staffRights = this.rights.filter(x => x.selected)
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