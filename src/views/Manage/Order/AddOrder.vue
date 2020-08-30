<template>
  <div class="add-staff">
    <top-head :title="'新增订单'"></top-head>
    <div class="base-info">
      <div class="title">订单基本信息</div>
      <div class="layer">
        <div class="item">
          <left-head class="margin-20" :left-title="'产品名称'" :necessary="true"></left-head>
          <input placeholder="请输入产品名称" v-model="productName" v-if="orderState === '0'"/>
          <div v-else class="length1">{{productName}}</div>
          <span class="error-tip">{{errorTips[0]}}</span>
        </div>
        <div class="item">
          <left-head class="margin-20" :left-title="'产品规格'" :necessary="true"></left-head>
          <input placeholder="请输入产品规格" v-model="productSpe" v-if="orderState === '0'"/>
          <div v-else class="length2">{{productSpe || '--'}}</div>
          <span class="error-tip">{{errorTips[1]}}</span>
        </div>
      </div>

      <div class="layer">
        <div class="item">
          <left-head class="margin-20" :left-title="'产品数量'" :necessary="true"></left-head>
          <input placeholder="请输入产品数量" v-if="orderState === '0'"
                 v-model="productNum" @input="productNum = productNum.replace(/[^\d]/g, '')"/>
          <div v-else class="length1">{{productNum || '--'}}</div>
          <span class="error-tip">{{errorTips[2]}}</span>
        </div>
        <div class="item">
          <left-head class="margin-20" :left-title="'物流单号'" :necessary="true"></left-head>
          <input placeholder="请输入物流单号" v-model="deliveryNo" v-if="orderState === '0'"/>
          <div v-else class="length2">{{deliveryNo || '--'}}</div>
          <span class="error-tip">{{errorTips[3]}}</span>
        </div>
      </div>

      <div class="layer">
        <div class="item">
          <left-head class="margin-20" :left-title="'客户'" :necessary="true"></left-head>
          <div class="search-user" v-if="orderState === '0'">
            <input placeholder="请输入客户名查询客户" v-model.trim="userName" @input="searchUser"/>
            <div class="user-list" v-if="showUserBox">
              <div v-if="!userList.length" class="no-list">未查到客户</div>
              <div v-for="(item, index) in userList" :key="index" class="user-item" @click="selectUser(item)">
                {{item.userName}} {{item.company}}
              </div>
            </div>
          </div>
          <div v-else class="length1">{{userName || '--'}}</div>
        </div>
        <div class="item">
          <left-head class="margin-20" :left-title="'公司'" :necessary="true"></left-head>
          <input placeholder="请输入公司" v-model="company" v-if="orderState === '0'"/>
          <div v-else class="length2">{{company || '--'}}</div>
          <span class="error-tip">{{errorTips[4]}}</span>
        </div>
      </div>

      <div class="layer">
        <div class="item">
          <left-head class="margin-20" :left-title="'订单总金额'" :necessary="true"></left-head>
          <input placeholder="请输入订单总金额" v-model="totalFee" class="money-input"
                 @input="totalFee = totalFee.replace(/[^\d]/g, '')" v-if="orderState === '0'"/>
          <div v-else>{{totalFee}}</div>
          <span>&nbsp;元</span>
          <span class="error-tip">{{errorTips[5]}}</span>
        </div>
        <div class="item">
          <left-head class="margin-20" :left-title="'交期'" :necessary="true"></left-head>
          <input placeholder="请输入交期，如：2020-01-01" v-model="deliveryTime" v-if="orderState === '0'"/>
          <div v-else class="length2">{{deliveryTime || '--'}}</div>
          <span class="error-tip">{{errorTips[6]}}</span>
        </div>
      </div>

      <div class="layer">
        <div class="item">
          <left-head class="margin-20" :left-title="'首付金额'" :necessary="true"></left-head>
          <input placeholder="请输入首付金额" v-model="downPayFee" class="money-input"
                 @input="downPayFee = downPayFee.replace(/[^\d]/g, '')" v-if="orderState === '0'"/>
          <div v-else>{{downPayFee}}</div>
          <span>&nbsp;元</span>
          <span class="error-tip">{{errorTips[7]}}</span>
        </div>

        <div class="item">
          <left-head class="margin-20" :left-title="'付款方式'" :necessary="true"></left-head>
          <input placeholder="请输入付款方式" v-model="payType" v-if="orderState === '0'"/>
          <div v-else class="length2">{{payType || '--'}}</div>
          <span class="error-tip">{{errorTips[8]}}</span>
        </div>
      </div>
      <div class="layer">
        <div class="item">
          <left-head class="margin-20" :left-title="'尾款'" :necessary="true"></left-head>
          <input placeholder="请输入尾款" v-model="finalPayFee" class="money-input"
                 @input="finalPayFee = finalPayFee.replace(/[^\d]/g, '')" v-if="orderState === '0'"/>
          <div v-else>{{finalPayFee}}</div>
          <span>&nbsp;元</span>
          <span class="error-tip">{{errorTips[9]}}</span>
        </div>
        <div class="item">
          <left-head class="margin-20" :left-title="'付款进度'" :necessary="false"></left-head>
        </div>
      </div>

      <!--      <div class="item2">-->
      <!--        <left-head class="margin-20" :left-title="'付款进度'" :necessary="false"></left-head>-->
      <!--        <textarea placeholder="请输入付款进度" maxlength="200" v-model="payProgress" v-if="orderState === '0'"/>-->
      <!--        <div v-else class="length3">{{payProgress || '&#45;&#45;'}}</div>-->
      <!--      </div>-->
      <div class="item2">
        <left-head class="margin-20" :left-title="'付款记录'" :necessary="false"></left-head>
        <textarea placeholder="请输入付款记录" maxlength="200" v-model="payRecord" v-if="orderState === '0'"/>
        <div v-else class="length3">{{payRecord || '--'}}</div>
      </div>
      <div class="item2">
        <left-head class="margin-20" :left-title="'备注'" :necessary="false"></left-head>
        <textarea placeholder="请输入客户备注" maxlength="200" v-model="remark" v-if="orderState === '0'"/>
        <div v-else class="length3">{{remark || '--'}}</div>
      </div>
      <footer-btn @goBack="goBack" @save="save" :needSave="orderState === '0'"></footer-btn>
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
        orderState: '0', // 默认未完成
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
        userList: [],
        canOperate: true // 可以操作
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
        _this.init()
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
        if (!this.canOperate) return
        this.canOperate = false
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
              this.canOperate = true
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
        }
        if (!this.productSpe) {
          this.$set(this.errorTips, 1, '产品规格不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 1, '')
        }
        if (!this.productNum) {
          this.$set(this.errorTips, 2, '产品数量不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 2, '')
        }
        if (!this.deliveryNo) {
          this.$set(this.errorTips, 3, '物流单号不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 3, '')
        }
        if (!this.company) {
          this.$set(this.errorTips, 4, '公司不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 4, '')
        }
        if (!this.totalFee) {
          this.$set(this.errorTips, 5, '订单总金额不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 5, '')
        }
        if (!this.deliveryTime) {
          this.$set(this.errorTips, 6, '交期不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 6, '')
        }
        if (!this.downPayFee) {
          this.$set(this.errorTips, 7, '首付金额不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 7, '')
        }
        if (!this.payType) {
          this.$set(this.errorTips, 8, '付款方式不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 8, '')
        }
        if (!this.finalPayFee) {
          this.$set(this.errorTips, 9, '尾款不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 9, '')
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

  .length1
    width 280px

  .length2
    width 270px

  .length3
    width 85.2%

  .text-flow
    word-break break-all
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
</style>