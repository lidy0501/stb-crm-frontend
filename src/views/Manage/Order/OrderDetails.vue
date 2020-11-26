<template>
  <div class="order-info">
    <top-head :title="'订单详情'"></top-head>
    <div class="base-info">
      <div class="title">订单基本信息</div>
      <div class="content-item">
        <left-head class="margin-20 marginT5" :left-title="'商品信息'" :necessary="true"></left-head>
        <div class="goods-content">
          <div class="goods-item" v-for="(item, index) in goodsList" :key="index">
            <div>{{item.goodsName}}</div>
            <div>数量：{{item.amount}} {{item.skuUnit}}</div>
            <div>花色：{{item.skuColor}}</div>
          </div>
        </div>
      </div>

      <div class="order-info-item">
        <left-head class="margin-20" :left-title="'订单编码'" :necessary="true"></left-head>
        <div>{{orderCode}}</div>
      </div>

      <div class="item">
        <left-head class="margin-20" :left-title="'客户'" :necessary="true"></left-head>
        <div>{{userName}}</div>
      </div>

      <div class="order-info-item">
        <left-head class="margin-20" :left-title="'公司'" :necessary="true"></left-head>
        <div>{{company}}</div>
      </div>

      <div class="order-info-item">
        <left-head class="margin-20" :left-title="'物流单号'" :necessary="false"></left-head>
        <input placeholder="请输入物流单号" v-model="deliveryNo" v-if="orderState === '0'"></input>
        <div v-else>{{deliveryNo}}</div>
      </div>

      <div class="order-info-item">
        <left-head class="margin-20" :left-title="'订单总金额'" :necessary="true"></left-head>
        <div>{{totalFee}} 元</div>
      </div>

      <div class="order-info-item">
        <left-head class="margin-20" :left-title="'已付金额'" :necessary="true"></left-head>
        <input placeholder="请输入已付金额" v-model="downPayFee" class="money-input"
               @input="verifyInputDownPayFee(downPayFee)" v-if="orderState === '0'"/>
        <div v-else>{{downPayFee}}</div>
        <span>&nbsp;元</span>
        <span class="error-tip">{{errorTips[0]}}</span>
      </div>

      <div class="order-info-item">
        <left-head class="margin-20" :left-title="'未付金额'" :necessary="false"></left-head>
        <input placeholder="0" v-model="finalPayFee" disabled="disabled"/>
        <span>&nbsp;元</span>
      </div>

      <div class="order-info-item">
        <left-head class="margin-20" :left-title="'交期'" :necessary="false"></left-head>
        <input v-if="orderState === '0'" placeholder="请输入交期，如：2020-01-01" v-model="deliveryTime"
               @input="deliveryTime = deliveryTime.replace(/[^\d-]/g, '')"/>
        <div v-else>{{deliveryTime}}</div>
      </div>

      <div class="order-info-item">
        <left-head class="margin-20" :left-title="'付款方式'" :necessary="false"></left-head>
        <input v-if="orderState === '0'" placeholder="付款方式" v-model="payType"/>
        <div v-else>{{payType}}</div>
      </div>

      <div class="content-item">
        <left-head class="margin-20" :left-title="'付款记录'" :necessary="false"></left-head>
        <textarea placeholder="请输入付款记录" maxlength="200" v-model="payRecord" v-if="orderState === '0'"/>
        <div v-else class="length1">{{payRecord || '--'}}</div>
      </div>

      <div class="content-item">
        <left-head class="margin-20" :left-title="'备注'" :necessary="false"></left-head>
        <textarea placeholder="请输入订单备注" maxlength="200" v-model="remark" v-if="orderState === '0'"/>
        <div v-else class="length1">{{remark || '--'}}</div>
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
  import {OPEN_TOAST, OPEN_ERROR_TIP_BOX} from '../../../store/constants/home'
  import SelectGoodsBox from './components/SelectGoodsBox.vue'

  export default {
    name: 'AddOrder',
    components: {LeftHead, TopHead, FooterBtn, SelectGoodsBox},
    data() {
      return {
        orderId: this.$route.params.orderId,
        orderState: '0', // 默认未完成
        orderCode: '',
        deliveryNo: '',
        userName: '',
        userId: '',
        company: '',
        totalFee: '',
        inputDownPayFee: this.downPayFee / 100, // 输入框里的已付款
        downPayFee: '', // 已付金额
        inputFinalPayFee: this.finalPayFee / 100, // 输入框里的未付款
        deliveryTime: '',
        payProgress: '',
        payRecord: '',
        payType: '',
        remark: '',
        saveFlag: '',
        errorTips: [],
        canOperate: true, // 可以操作
        goodsList: []
      }
    },
    mounted() {
      this.init()
    },
    computed: {
      finalPayFee: {
        set(newV) {
        },
        get() {
          let final =  this.totalFee - this.downPayFee
          if (final >= 0) return final
          return 0
        }
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      init() {
        this.$http.post('/OrderController/selectOrderByOrderId/' + this.orderId).then(res => {
          this.$glo_loading.loadingHide()
          const data = res.data
          Object.assign(this, data)
          this.totalFee /= 100.0
          this.downPayFee /= 100.0
        })
      },
      save() {
        if (!this.canOperate) return
        this.canOperate = false
        if (!this.downPayFee) {
          this.$set(this.errorTips, 0, '请输入已付金额')
          return
        } {
          this.$set(this.errorTips, 0, '')
        }
        this.$http.post('/OrderController/saveEditOrder', {
          orderId: this.orderId,
          downPayFee: this.downPayFee * 100,
          finalPayFee: this.finalPayFee * 100,
          payRecord: this.payRecord,
          remark: this.remark,
          deliveryNo: this.deliveryNo,
          deliveryTime: this.deliveryTime,
          payType: this.payType
        }).then(res => {
          this.$glo_loading.loadingHide()
          const data = res.data
          if (data.code === 0) {
            this.$store.commit(OPEN_TOAST, '保存成功')
            setTimeout(() => {
              this.$router.go(-1)
            }, 2100)
          } else {
            this.$store.commit(OPEN_ERROR_TIP_BOX, data.message)
          }
        })
      },
      inputMoney(goodsPrice) {
        goodsPrice = goodsPrice.replace(/[^0-9|\\.]+/g, '')
        this.goodsPrice = this.$utils.fixToNum(goodsPrice) + ''
      },
      verifyInputDownPayFee(downPayFee) {
        downPayFee = downPayFee.replace(/[^0-9]\\./g, '')
        this.downPayFee = this.$utils.fixToNum(downPayFee) + ''
      }
    }
  }
</script>

<style module lang="stylus" scoped>
  .order-info
    font-size 14px
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

    .content-item
      display flex
      margin-bottom 10px

    .goods-item
      display flex
      height 30px
      align-items center

      > div
        &:nth-child(1)
          width 200px

      > div
        &:nth-child(2)
          width 100px

    .op-box
      display flex
      align-items center

    .goods-num
      display flex
      align-items center

      > input
        width 100px
        height 38px

    .add-crease
      margin-left 20px
      display flex

      > div
        width 50px
        height 25px
        text-align center
        line-height 25px
        border-radius 5px
        cursor pointer

    .btn-default
      border 1px solid mediumseagreen
      color mediumseagreen
      background-color #fff
      margin-right 50px

    .btn-primary
      background-color mediumseagreen
      color #fff
      margin-right 20px

    .order-info-item
      display flex
      align-items center
      margin-bottom 20px

      input
        height 38px
        padding-left 10px
        width 388px

    .length1
      width 700px

    .length2
      width 270px

    .marginT5
      margin-top 5px

    .search-user
      position relative

      > input
        width 388px

    .user-list
      position absolute
      width 388px
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

  .error-tip
    color red





</style>