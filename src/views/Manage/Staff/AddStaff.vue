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
        <input placeholder="请输入员工手机号" v-model.trim="staffPhone" maxlength="11" @input="staffPhone = staffPhone.replace(/[^\d]/g,'')"/>
        <span class="error-tip">{{errorTips[1]}}</span>
      </div>
      <div class="item">
        <left-head class="margin-20" :left-title="'员工账号'" :necessary="true"></left-head>
        <input placeholder="请输入员工账号" v-model="staffCode"/>
        <span class="error-tip">{{errorTips[2]}}</span>
      </div>
      <div class="item">
        <left-head class="margin-20" :left-title="'员工密码'" :necessary="true"></left-head>
        <input placeholder="请输入员工密码" v-model="passWord"/>
        <span class="error-tip">{{errorTips[3]}}</span>
      </div>
      <div class="item">
        <left-head class="margin-20" :left-title="'员工邮箱'" :necessary="true"></left-head>
        <input placeholder="请输入员工邮箱" v-model="staffEmail"/>
        <span class="error-tip">{{errorTips[4]}}</span>
      </div>
      <div class="item2">
        <left-head class="margin-20" :left-title="'备注'" :necessary="false"></left-head>
        <textarea placeholder="请输入员工备注，非必填(限200字)" v-model="remark"/>
      </div>
      <div class="item2">
        <left-head class="margin-20" :left-title="'员工权限'" :necessary="true"></left-head>
        <div class="staff-right">
          <div class="right-item" v-for="(item, index) in staffRights" :key="index">
            <div @click="item.selected = !item.selected">
              <i class="iconfont icon-xuanzhong selected" v-if="item.selected"></i>
              <i class="iconfont icon-weixuanzhong un-selected" v-else></i>
            </div>
            <span>{{item.rightName}}</span>
          </div>
          <div class="error-tip">{{errorTips[5]}}</div>
        </div>
      </div>
      <footer-btn @goBack="goBack" @save="save"></footer-btn>
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
        staffId: this.$route.params.staffId || '0', // 表示没有staffId, 为新增
        staffName: '',
        staffCode: '',
        passWord: '',
        staffPhone: '',
        staffEmail: '',
        remark: '',
        staffRights: [],
        saveFlag: '',
        errorTips: [],
        rights: [],
        canOperate: true
      }
    },
    mounted() {
      this.initStaffInfo()
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      save() {
        if (this.staffId === localStorage.getItem('token') ) {
          this.$store.commit(OPEN_TOAST, '不能编辑本人信息')
          return
        }
        this.validateInfo()
        if (!this.saveFlag) return
        if (!this.canOperate) return
        this.canOperate = false
        this.$http.post('/StaffController/saveStaff', {
          staffId: this.staffId,
          staffName: this.staffName,
          staffCode: this.staffCode,
          passWord: this.passWord,
          staffPhone: this.staffPhone,
          staffEmail: this.staffEmail,
          remark: this.remark,
          rightVoList: this.staffRights
        }).then(res => {
          const data = res.data
          this.$store.commit(OPEN_TOAST, data.message)
          this.canOperate = true
          if (data.code === 0) {
            setTimeout(() => {
              this.$router.push('/manage/staff-list')
            }, 2100)
          }
        })
      },
      init() {
        this.$http.post('/RightController/getAll').then(res => {
          const data = res.data
          this.rights = data
        })
      },
      initStaffInfo() {
        this.$http.get(`/StaffController/findStaffInfoById/${this.staffId}`).then(res => {
          const data = res.data
          this.staffId = data.staffId || '0'
          this.staffName = data.staffName
          this.staffCode = data.staffCode
          this.passWord = data.passWord
          this.staffPhone = data.staffPhone
          this.staffEmail = data.staffEmail
          this.remark = data.remark
          this.staffRights = data.rightVoList
        })
      },
      validateInfo() {
        this.saveFlag = true
        if (!this.staffName) {
          this.$set(this.errorTips, 0, '员工姓名不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 0, '')
        }
        if (!this.staffPhone) {
          this.$set(this.errorTips, 1, '员工手机号不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 1, '')
        }
        if (!this.staffCode) {
          this.$set(this.errorTips, 2, '员工账号不能为空')
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
        if (!this.staffEmail) {
          this.$set(this.errorTips, 4, '员工邮箱不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 4, '')
        }
        if (!this.validateRights()) {
          this.$set(this.errorTips, 5, '请选择员工权限')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 5, '')
        }
        this.$forceUpdate
      },
      validateRights() {
        let list = this.staffRights.filter(x => x.selected)
        return list.length > 0
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