<template>
  <div class="add-staff">
    <top-head :title="'新增客户'"></top-head>
    <div class="base-info">
      <div class="title">客户基本信息</div>
      <div class="item">
        <left-head class="margin-20" :left-title="'客户编码'" :necessary="true"></left-head>
        <input v-if="!userId" placeholder="请输入客户编码" v-model="userCode"/>
        <div v-else>{{userCode}}</div>
        <span class="error-tip">{{errorTips[0]}}</span>
      </div>
      <div class="item">
        <left-head class="margin-20" :left-title="'客户姓名'" :necessary="true"></left-head>
        <input v-if="!userId" placeholder="请输入客户姓名" v-model="userName"/>
        <div v-else>{{userName}}</div>
        <span class="error-tip">{{errorTips[1]}}</span>
      </div>
      <div class="item">
        <left-head class="margin-20" :left-title="'客户国家'" :necessary="true"></left-head>
        <input v-if="!userId" placeholder="请输入客户国家" v-model="nation"/>
        <div v-else>{{nation}}</div>
        <span class="error-tip">{{errorTips[2]}}</span>
      </div>
      <div class="item">
        <left-head class="margin-20" :left-title="'手机号'" :necessary="true"></left-head>
        <input v-if="!userId" placeholder="请输入客户手机号" v-model.trim="userPhone" maxlength="30"/>
        <div v-else>{{userPhone}}</div>
        <span class="error-tip">{{errorTips[3]}}</span>
      </div>
      <div class="item">
        <left-head class="margin-20" :left-title="'固定电话'" :necessary="true"></left-head>
        <input v-if="!userId" placeholder="请输入客户固定电话" v-model.trim="userTelephone" maxlength="30"/>
        <div v-else>{{userTelephone}}</div>
        <span class="error-tip">{{errorTips[4]}}</span>
      </div>
      <div class="item">
        <left-head class="margin-20" :left-title="'公司名称'" :necessary="true"></left-head>
        <input v-if="!userId" placeholder="请输入客户公司名称" v-model="company"/>
        <div v-else>{{company}}</div>
        <span class="error-tip">{{errorTips[5]}}</span>
      </div>
      <div class="item">
        <left-head class="margin-20" :left-title="'公司职位'" :necessary="true"></left-head>
        <input v-if="!userId" placeholder="请输入客户公司职位" v-model="post"/>
        <div v-else>{{post}}</div>
        <span class="error-tip">{{errorTips[6]}}</span>
      </div>
      <div class="item">
        <left-head class="margin-20" :left-title="'客户公司地址'" :necessary="true"></left-head>
        <input v-if="!userId" placeholder="请输入客户公司地址" v-model="companyAddress"/>
        <div v-else>{{companyAddress}}</div>
        <span class="error-tip">{{errorTips[7]}}</span>
      </div>
      <div class="item">
        <left-head class="margin-20" :left-title="'客户公司网址'" :necessary="true"></left-head>
        <input v-if="!userId" placeholder="请输入客户公司网址" v-model="companyWeb"/>
        <div v-else>{{companyWeb}}</div>
        <span class="error-tip">{{errorTips[8]}}</span>
      </div>
      <div class="item">
        <left-head class="margin-20" :left-title="'客户邮箱'" :necessary="true"></left-head>
        <input v-if="!userId" placeholder="请输入客户邮箱" v-model="userEmail"/>
        <div v-else>{{userEmail}}</div>
        <span class="error-tip">{{errorTips[9]}}</span>
      </div>
      <div class="item2">
        <left-head class="margin-20" :left-title="'备注'" :necessary="false"></left-head>
        <textarea v-if="!userId" placeholder="请输入客户备注" v-model="remark"/>
        <div v-else>{{remark || '--'}}</div>
      </div>
      <footer-btn @goBack="goBack" @save="save" :needSave="!userId"></footer-btn>
    </div>
  </div>
</template>

<script>
  import TopHead from '../../../components/TopHead/TopHead.vue'
  import LeftHead from '../../../components/LeftHead/LeftHead.vue'
  import FooterBtn from '../../../components/FooterBtn/FooterBtn.vue'
  import {OPEN_TOAST} from '../../../store/constants/home'


  export default {
    name: 'AddStaff',
    components: {LeftHead, TopHead, FooterBtn},
    data() {
      return {
        userId: this.$route.params.userId,
        userCode: '',
        userName: '',
        nation: '',
        company: '',
        post: '',
        companyAddress: '',
        companyWeb: '',
        userPhone: '',
        userTelephone: '',
        userEmail: '',
        subtotal: '',
        remark: '',
        operatorId: '',
        saveFlag: true,
        errorTips: [],
        canOperate: true
      }
    },
    mounted() {
      if (this.userId) {
        this.init()
      }
    },
    methods: {
      init() {
        this.$http.post('/UserController/selectUserByUserId/' + this.userId).then(res => {
          this.$glo_loading.loadingHide()
          const data = res.data
          Object.assign(this, data)
        })
      },
      goBack() {
        this.$router.go(-1)
      },
      save() {
        this.saveFlag = true
        this.validateInfo()
        if (!this.saveFlag) return

        this.$http.post('/UserController/addUser', {
          userCode: this.userCode,
          userName: this.userName,
          nation: this.nation,
          company: this.company,
          post: this.post,
          companyAddress: this.companyAddress,
          companyWeb: this.companyWeb,
          userPhone: this.userPhone,
          userTelephone: this.userTelephone,
          userEmail: this.userEmail,
          remark: this.remark
        }).then(res => {
          this.$glo_loading.loadingHide()
          const data = res.data
          this.$store.commit(OPEN_TOAST, data.message)
          if (data.code === 0) {
            this.$router.push('private-user-list')
          }
        })
      },
      validateInfo() {
        if (!this.userCode) {
          this.$set(this.errorTips, 0, '客户编码不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 0, '')
        }
        if (!this.userName) {
          this.$set(this.errorTips, 1, '客户姓名不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 1, '')
        }
        if (!this.nation) {
          this.$set(this.errorTips, 2, '国家不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 2, '')
        }
        if (!this.userPhone) {
          this.$set(this.errorTips, 3, '手机号不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 3, '')
        }
        if (!this.userTelephone) {
          this.$set(this.errorTips, 4, '固定电话不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 4, '')
        }
        if (!this.company) {
          this.$set(this.errorTips, 5, '公司名称不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 5, '')
        }
        if (!this.post) {
          this.$set(this.errorTips, 6, '职位不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 6, '')
        }
        if (!this.companyAddress) {
          this.$set(this.errorTips, 7, '客户公司地址不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 7, '')
        }
        if (!this.companyWeb) {
          this.$set(this.errorTips, 8, '客户公司网址不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 8, '')
        }
        if (!this.userEmail) {
          this.$set(this.errorTips, 9, '邮箱不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 9, '')
        }
        this.$forceUpdate()
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

  //@input="userPhone = userPhone.replace(/[^\d]/g,'')"

</style>