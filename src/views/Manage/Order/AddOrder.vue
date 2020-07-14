<template>
  <div class="add-staff">
    <top-head :title="'新增订单'"></top-head>
    <div class="base-info">
      <div class="title">订单基本信息</div>
      <div class="layer">
        <div class="item">
          <left-head class="margin-20" :left-title="'产品名称'" :necessary="true"></left-head>
          <input placeholder="请输入产品名称" v-model="productName"/>
          <span class="error-tip">{{errorTips[0]}}</span>
        </div>
        <div class="item">
          <left-head class="margin-20" :left-title="'产品规格'" :necessary="false"></left-head>
          <input placeholder="请输入产品规格，非必填" v-model="productSpe"/>
        </div>
      </div>

      <div class="layer">
        <div class="item">
          <left-head class="margin-20" :left-title="'产品数量'" :necessary="false"></left-head>
          <input placeholder="请输入产品数量，非必填" v-model="productNum" @input="productNum = productNum.replace(/[^\d]/g, '')"/>
        </div>
        <div class="item">
          <left-head class="margin-20" :left-title="'物流单号'" :necessary="false"></left-head>
          <input placeholder="请输入物流单号，非必填" v-model="deliveryNo"/>
        </div>
      </div>

      <div class="layer">
        <div class="item">
          <left-head class="margin-20" :left-title="'客户'" :necessary="false"></left-head>
          <div class="search-user">
            <input placeholder="请输入客户名查询客户，非必填" v-model.trim="userName" @input="searchUser"/>
            <div class="user-list" v-if="showUserBox">
              <div v-if="!userList.length" class="no-list">未查到客户</div>
              <div v-for="(item, index) in userList" :key="index" class="user-item" @click="selectUser(item)">
                {{item.userName}} {{item.company}}
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <left-head class="margin-20" :left-title="'公司'" :necessary="false"></left-head>
          <input placeholder="请输入公司，非必填" v-model="company"/>
        </div>
      </div>

      <div class="layer">
        <div class="item">
          <left-head class="margin-20" :left-title="'订单总金额'" :necessary="false"></left-head>
          <input placeholder="请输入订单总金额，非必填" v-model="totalFee" class="money-input"
                 @input="totalFee = totalFee.replace(/[^\d]/g, '')"/> &nbsp;元
        </div>
        <div class="item">
          <left-head class="margin-20" :left-title="'交期'" :necessary="false"></left-head>
          <input placeholder="请输入交期，如：2020-01-01，非必填" v-model="deliveryTime"/>
        </div>
      </div>

      <div class="layer">
        <div class="item">
          <left-head class="margin-20" :left-title="'首付金额'" :necessary="false"></left-head>
          <input placeholder="请输入首付金额，非必填" v-model="downPayFee" class="money-input"
                 @input="downPayFee = downPayFee.replace(/[^\d]/g, '')"/> &nbsp;元
        </div>

        <div class="item">
          <left-head class="margin-20" :left-title="'付款方式'" :necessary="false"></left-head>
          <input placeholder="请输入付款方式，非必填" v-model="payType"/>
        </div>
      </div>
      <div class="layer">
        <div class="item">
          <left-head class="margin-20" :left-title="'尾款'" :necessary="false"></left-head>
          <input placeholder="请输入尾款，非必填" v-model="finalPayFee" class="money-input"
                 @input="finalPayFee = finalPayFee.replace(/[^\d]/g, '')"/> &nbsp;元
        </div>
      </div>

      <div class="item2">
        <left-head class="margin-20" :left-title="'付款进度'" :necessary="false"></left-head>
        <textarea placeholder="请输入付款进度，非必填(限200字)" v-model="payProgress"/>
      </div>
      <div class="item2">
        <left-head class="margin-20" :left-title="'付款记录'" :necessary="false"></left-head>
        <textarea placeholder="请输入付款记录，非必填(限200字)" v-model="payRecord"/>
      </div>
      <div class="item2">
        <left-head class="margin-20" :left-title="'备注'" :necessary="false"></left-head>
        <textarea placeholder="请输入客户备注，非必填(限200字)" v-model="remark"/>
      </div>
      <footer-btn @goBack="goBack" @save="save"></footer-btn>
    </div>
  </div>
</template>

<script>
  import TopHead from '../../../components/TopHead/TopHead.vue'
  import LeftHead from '../../../components/LeftHead/LeftHead.vue'
  import FooterBtn from '../../../components/FooterBtn/FooterBtn.vue'
  import lodash from 'lodash'
  import {OPEN_TOAST} from '../../../store/constants/home'


  export default {
    name: 'AddOrder',
    components: {LeftHead, TopHead, FooterBtn},
    data() {
      return {
        orderId: this.$route.params.orderId,
        productName: '',
        productSpe: '',
        productNum: 1,
        deliveryNo: '',
        userName: '',
        userId: '',
        company: '',
        totalFee: '',
        downPayFee: '',
        finalPayFee: '',
        deliveryTime: '',
        payProgress: '',
        payRecord: '',
        payType: '',
        showUserBox: false,
        remark: '',
        saveFlag: '',
        errorTips: [],
        userList: []
      }
    },
    mounted() {
      let _this = this
      document.addEventListener('click', function (e) {
        let flag = e.target.contains(document.getElementsByClassName('user-list')[0])
        if (flag) {
          _this.showUserBox = false
        }
      })
      if (_this.orderId) { // 编辑
        this.init()
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      init() {
        this.$http.post('/OrderController/selectOrderByOrderId/' + this.orderId).then(res => {
          const data = res.data
          Object.assign(this, data)
        })
      },
      save() {
        this.saveFlag = true
        this.validateInfo()
        if (!this.saveFlag) return
        this.$http.post('/OrderController/addOrder', {
          orderId: this.orderId,
          productName: this.productName,
          productSpe: this.productSpe,
          productNum: +this.productNum,
          deliveryNo: this.deliveryNo,
          userId: this.userId,
          userName: this.userId ? this.userName : '',
          company: this.company,
          totalFee: +this.totalFee,
          downPayFee: +this.downPayFee,
          finalPayFee: this.finalPayFee,
          deliveryTime: this.deliveryTime,
          payType: this.payType,
          payProgress: this.payProgress,
          payRecord: this.payRecord,
          remark: this.remark
        }).then(res => {
          const data = res.data
          this.$store.commit(OPEN_TOAST, data.message)
          if (data.code === 0) {
            setTimeout(() => {
              this.$router.push('/manage/order-list')
            }, 2100)
          }
        })
      },
      validateInfo() {
        if (!this.productName) {
          this.$set(this.errorTips, 0, '产品名称不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 0, '')
          this.saveFlag = true
        }
        this.$forceUpdate
      },
      selectUser(item) {
        this.userName = item.userName
        this.userId = item.userId
        this.showUserBox = false
      },
      searchUser: lodash.debounce(function () {
        this.showUserBox = true
        if (!this.userName) return
        this.$http.post('/OrderController/selectAllUserVoLikeUserName/' + this.userName).then(res => {
          const data = res.data
          this.userList = data
        })
      }, 500)
    },
  }
</script>

<style module lang="stylus" scoped>
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

  .layer
    display flex
    justify-content space-between

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
    width 85.3%
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

  .search-user
    position relative

  .user-list
    position absolute
    width 313px
    height 250px
    left 0
    top 45px
    background-color #fff
    border 1px solid #d0d0d0
    border-radius 5px
    overflow auto

  .user-item
    height 30px
    line-height 30px

    &:hover
      background-color #edf6f6

  .no-list
    height 100%
    font-size 18px
    line-height 250px
    color #f0f0f0
    text-align center

  .money-input
    width 280px


</style>