<template>
  <div class="add-order">
    <top-head :title="'新增订单'"></top-head>
    <div class="base-info">
      <div class="title">订单基本信息</div>
      <div class="content-item">
        <left-head class="margin-20 marginT10" :left-title="'商品信息'" :necessary="true"></left-head>
        <div class="goods-content">
          <div class="goods-item" v-for="(goods, index) in goodsList">
            <SelectGoodsBox  :defaultOption="'请选择商品'" :options='options' :goods="goods" @selectOption='selectGoods' :boxWidth="400"></SelectGoodsBox>
            <div class="op-box">
              <div class="goods-num">
                <left-head class="margin-20" :left-title="'产品数量'" :necessary="true"></left-head>
                <input type="text" placeholder="商品数量" v-model="goods.amount">
              </div>
              <div class="add-crease">
                <div class="btn-primary" @click="addGoods" v-if="index === goodsList.length - 1">添加</div>
                <div class="btn-default" @click="deleteGoods(index)">删除</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="order-info-item">
        <left-head class="margin-20" :left-title="'订单编码'" :necessary="true"></left-head>
        <input placeholder="请输入订单编码" v-model="orderCode"/>
        <span class="error-tip">{{errorTips[0]}}</span>
      </div>

      <div class="item">
        <left-head class="margin-20" :left-title="'客户'" :necessary="true"></left-head>
        <div class="search-user">
          <input placeholder="请输入客户名查询客户" v-model.trim="userName" @input="searchUser"/>
          <div class="user-list" v-if="showUserBox">
            <div v-if="!userList.length" class="no-list">未查到客户</div>
            <div v-for="(item, index) in userList" :key="index" class="user-item" @click="selectUser(item)">
              {{item.userName}} {{item.company}}
            </div>
          </div>
          <span class="error-tip">{{errorTips[1]}}</span>
        </div>
      </div>

      <div class="order-info-item">
        <left-head class="margin-20" :left-title="'公司'" :necessary="true"></left-head>
        <input placeholder="请输入公司" v-model="company"/>
        <span class="error-tip">{{errorTips[2]}}</span>
      </div>

      <div class="order-info-item">
        <left-head class="margin-20" :left-title="'物流单号'" :necessary="true"></left-head>
        <input placeholder="请输入物流单号" v-model="deliveryNo"/>
        <span class="error-tip">{{errorTips[3]}}</span>
      </div>

      <div class="order-info-item">
        <left-head class="margin-20" :left-title="'订单总金额'" :necessary="true"></left-head>
        <input placeholder="请输入订单总金额" v-model="totalFee"
               @input="verifyTotalFee(totalFee)"/>
        <span>&nbsp;元</span>
        <span class="error-tip">{{errorTips[4]}}</span>
      </div>

      <div class="order-info-item">
        <left-head class="margin-20" :left-title="'已付金额'" :necessary="true"></left-head>
        <input placeholder="请输入已付金额" v-model="downPayFee" class="money-input"
               @input="verifyDownPayFee(downPayFee)"/>
        <span>&nbsp;元</span>
        <span class="error-tip">{{errorTips[5]}}</span>
      </div>

      <div class="order-info-item">
        <left-head class="margin-20" :left-title="'未付金额'" :necessary="false"></left-head>
        <input placeholder="未付金额" v-model="finalPayFee" disabled="disabled"/>
        <span>&nbsp;元</span>
        <span class="error-tip">{{''}}</span>
      </div>

      <div class="order-info-item">
        <left-head class="margin-20" :left-title="'交期'" :necessary="true"></left-head>
        <input placeholder="请输入交期，如：2020-01-01" v-model="deliveryTime" @input="deliveryTime = deliveryTime.replace(/[^\d-]/g, '')
"/>
        <span class="error-tip">{{errorTips[6]}}</span>
      </div>

      <div class="order-info-item">
        <left-head class="margin-20" :left-title="'付款方式'" :necessary="true"></left-head>
        <input placeholder="请输入付款方式" v-model="payType"/>
        <span class="error-tip">{{errorTips[7]}}</span>
      </div>

      <div class="content-item">
        <left-head class="margin-20" :left-title="'付款记录'" :necessary="false"></left-head>
        <textarea placeholder="请输入付款记录" maxlength="200" v-model="payRecord"/>
      </div>

      <div class="content-item">
        <left-head class="margin-20" :left-title="'备注'" :necessary="false"></left-head>
        <textarea placeholder="请输入订单备注" maxlength="200" v-model="remark"/>
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
  import {OPEN_TOAST, OPEN_ERROR_TIP_BOX} from '../../../store/constants/home'
  import SelectGoodsBox from './components/SelectGoodsBox.vue'



  export default {
    name: 'AddOrder',
    components: {LeftHead, TopHead, FooterBtn, SelectGoodsBox},
    data() {
      return {
        orderState: '0', // 默认未完成
        orderCode: '',
        deliveryNo: '',
        userName: '',
        userId: '',
        company: '',
        totalFee: '',
        downPayFee: '',
        deliveryTime: '',
        payProgress: '',
        payRecord: '',
        payType: '',
        showUserBox: false,
        remark: '',
        saveFlag: '',
        errorTips: [],
        userList: [],
        canOperate: true, // 可以操作
        options: [{code: '1', name: '商品1'}, {code: '2', name: '商品2'}, {code: '3', name: '商品3'}],
        goodsList: [{goodsId: '', amount: 0}]
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
      _this.queryAllSelectGoodsVo()
    },
    computed: {
      finalPayFee() {
        let final =  this.totalFee - this.downPayFee
        if (final >= 0) return final
        return 0
      }
    },
    methods: {
      verifyTotalFee(totalFee) {
        totalFee = totalFee.replace(/[^0-9]\\./g, '')
        this.totalFee = this.$utils.fixToNum(totalFee) + ''
      },
      verifyDownPayFee(downPayFee) {
        downPayFee = downPayFee.replace(/[^0-9]\\./g, '')
        this.downPayFee = this.$utils.fixToNum(downPayFee) + ''
      },
      queryAllSelectGoodsVo() {
        this.$http.post('/OrderController/queryAllSelectGoodsVo').then(res => {
          const data = res.data
          this.options = data.map(x => {
            return {code: x.goodsId, name: x.goodsName + ' 单位：' + x.skuUnit + ' 花色' + x.skuColor}
          })
        })
      },
      selectGoods(goods, option) {
        goods.goodsId = option.code
      },
      addGoods() {
        this.goodsList.push({goodsId: '', amount: 0})
      },
      deleteGoods(index) {
        if (this.goodsList.length === 1) return
        this.goodsList.splice(index, 1);
      },

      goBack() {
        this.$router.go(-1)
      },
      save() {
        let goodsTip = ''
        this.goodsList.forEach(goods => {
          if (!goods.goodsId || !goods.amount) {
            goodsTip = '请完善商品信息'
          }
        })
        if (goodsTip) {
          this.$store.commit(OPEN_ERROR_TIP_BOX, '请完善商品信息')
          return
        }
        // 校验重复商品
        let repeatGoods = false // 默认无重复
        for (let i = 0; i < this.goodsList.length - 1; i++) {
          for (let j = i + 1; j <= this.goodsList.length - 1; j++) {
            if (this.goodsList[i].goodsId === this.goodsList[j].goodsId) {
              repeatGoods = true
              break
            }
          }
        }
        if (repeatGoods) {
          this.$store.commit(OPEN_ERROR_TIP_BOX, '所选商品不能重复')
          return
        }

        if (!this.canOperate) return
        this.canOperate = false
        this.saveFlag = true
        this.validateInfo()
        if (!this.saveFlag) return
        this.$http.post('/OrderController/addOrder', {
          goodsList: this.goodsList,
          orderCode: this.orderCode,
          userId: this.userId,
          userName: this.userName,
          company: this.company,
          deliveryNo: this.deliveryNo,
          totalFee: +this.totalFee * 100,
          downPayFee: +this.downPayFee * 100,
          finalPayFee: this.finalPayFee * 100,
          deliveryTime: this.deliveryTime,
          payType: this.payType,
          payRecord: this.payRecord,
          remark: this.remark
        }).then(res => {
          const data = res.data
          if (data.code === 0) {
            this.$store.commit(OPEN_TOAST, data.message)
            setTimeout(() => {
              this.$router.push('/manage/order-list')
              this.canOperate = true
            }, 2100)
          } else {
            this.$store.commit(OPEN_ERROR_TIP_BOX, data.message)
          }
        })
      },
      validateInfo() {
        // 订单编码
        if (!this.orderCode) {
          this.$set(this.errorTips, 0, '订单编码不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 0, '')
        }
        // 客户
        if (!this.userId) {
          this.$set(this.errorTips, 1, '请选择客户')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 1, '')
        }
        // 公司
        if (!this.company) {
          this.$set(this.errorTips, 2, '请输入公司')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 2, '')
        }
        // 物流单号
        if (!this.deliveryNo) {
          this.$set(this.errorTips, 3, '物流单号不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 3, '')
        }
        // 订单总额
        if (!this.totalFee) {
          this.$set(this.errorTips, 4, '请输入订单总金额')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 4, '')
        }
        // 已付金额
        if (!this.downPayFee) {
          this.$set(this.errorTips, 5, '请输入已付金额')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 5, '')
        }


        if (!this.deliveryTime) {
          this.$set(this.errorTips, 6, '请输入交期')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 6, '')
        }

        if (!this.payType) {
          this.$set(this.errorTips, 7, '付款方式不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 7, '')
        }

        this.$forceUpdate()
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
    }
  }
</script>

<style module lang="stylus" scoped>
  .add-order
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

  .layer
    display flex
    justify-content space-between

  .margin-20
    margin-right 20px

  .content-item
    display flex
    margin-bottom 10px

  .goods-item
    display flex
    height 45px
    align-items center
    margin-bottom 10px

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
    width 280px

  .length2
    width 270px

  .marginT10
    margin-top 10px

  .search-user
    position relative

    > input
      width 388px

  .user-list
    position absolute
    width 400px
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




</style>