<template>
  <div class="container">
    <top-head :title="'新增合同'"></top-head>
    <div class="base-info">
      <div class="title">合同基本信息</div>
      <div class="item">
        <left-head class="margin-20" :left-title="'合同编号'" :necessary="true"></left-head>
        <input placeholder="请输入合同编号" v-model="contractCode"/>
        <span class="error-tip">{{errorTips[0]}}</span>
      </div>

      <div class="item">
        <left-head class="margin-20" :left-title="'甲方公司名称'" :necessary="true"></left-head>
        <input placeholder="请输入甲方公司名称" v-model="companyA"/>
        <span class="error-tip">{{errorTips[1]}}</span>
      </div>

      <div class="item">
        <left-head class="margin-20" :left-title="'乙方公司名称'" :necessary="true"></left-head>
        <input placeholder="请输入乙方公司名称" v-model="companyB"/>
        <span class="error-tip">{{errorTips[2]}}</span>
      </div>

      <div class="item">
        <left-head class="margin-20" :left-title="'订单编码'" :necessary="true"></left-head>
        <div class="search-user">
          <input placeholder="请输入订单编码" v-model.trim="orderCode" @input="searchOrder"/>
          <div class="user-list" v-if="showOrderBox">
            <div v-if="!orderList.length" class="no-list">未查到订单</div>
            <div v-for="(item, index) in orderList" :key="index" class="user-item" @click="selectOrder(item)">
              {{item.orderCode}}
            </div>
          </div>
          <span class="error-tip">{{errorTips[3]}}</span>
        </div>
      </div>

      <div class="item">
        <left-head class="margin-20" :left-title="'订单金额'" :necessary="true"></left-head>
        <input placeholder="0" v-model="orderPrice" disabled="disabled"/>
      </div>

      <div class="item">
        <left-head class="margin-20" :left-title="'签订日期'" :necessary="true"></left-head>
        <input placeholder="请输入签订日期，格式：2010-10-01" v-model="signingDate"
               @input="signingDate = signingDate.replace(/[^\d-]/g, '')"/>
        <span class="error-tip">{{errorTips[4]}}</span>
      </div>

      <div class="item">
        <left-head class="margin-20" :left-title="'截止日期'" :necessary="true"></left-head>
        <input placeholder="请输入签订日期，格式：2010-10-01" v-model="deadline"
               @input="deadline = deadline.replace(/[^\d-]/g, '')"/>
        <span class="error-tip">{{errorTips[5]}}</span>
      </div>

      <div class="item2">
        <left-head class="margin-20" :left-title="'备注'" :necessary="false"></left-head>
        <textarea placeholder="请输入合同备注，限200字" v-model="remark"/>
      </div>

      <footer-btn @goBack="goBack" @save="save"></footer-btn>
    </div>
  </div>
</template>

<script>
  import TopHead from '../../../components/TopHead/TopHead.vue'
  import LeftHead from '../../../components/LeftHead/LeftHead.vue'
  import FooterBtn from '../../../components/FooterBtn/FooterBtn.vue'
  import {OPEN_ERROR_TIP_BOX, OPEN_TOAST} from '../../../store/constants/home'
  import lodash from "lodash";

  export default {
    name: 'AddContract',
    components: {LeftHead, TopHead, FooterBtn},
    data() {
      return {
        contractCode: '',
        companyA: '',
        companyB: '',
        signingDate: '',
        deadline: '',
        orderPrice: '',
        orderCode: '',
        remark: '',
        showOrderBox: false,
        orderList: [],
        errorTips: [],
        saveFlag: '',
        canOperate: true // 可以操作
      }
    },
    mounted() {
      let _this = this
      document.addEventListener('click', function (e) {
        let flag = e.target.contains(document.getElementsByClassName('user-list')[0])
        if (flag) {
          _this.showOrderBox = false
        }
      })
    },
    methods: {
      searchOrder: lodash.debounce(function () {
        this.showOrderBox = true
        if (!this.orderCode) {
          this.orderPrice = 0
          return
        }
        this.$http.post('/ContractController/queryOrdersByLikeCode?orderCode=' + this.orderCode).then(res => {
          const data = res.data
          this.orderList = data
        })
      }, 500),
      selectOrder(order) {
        this.orderCode = order.orderCode
        this.orderPrice = order.orderPrice / 100.0
        this.showOrderBox = false
      },
      goBack() {
        this.$router.go(-1)
      },
      save() {
        // if (!this.canOperate) return
        // this.canOperate = false
        this.saveFlag = true
        this.validateInfo()
        if (!this.saveFlag) return

        this.$http.post('/ContractController/addContract', {
          contractCode: this.contractCode,
          companyA: this.companyA,
          companyB: this.companyB,
          signingDate: this.signingDate,
          deadline: this.deadline,
          orderCode: this.orderCode,
          orderPrice: this.orderPrice * 100
        }).then(res => {
          const data = res.data
          if (data.code === 0) {
            this.$store.commit(OPEN_TOAST, data.message)
            setTimeout(() => {
              this.$router.push('/manage/contract-list')
              this.canOperate = true
            }, 2100)
          } else {
            this.$store.commit(OPEN_ERROR_TIP_BOX, data.message)
          }
        })


      },
      validateInfo() {
        // 合同编号
        if (!this.contractCode) {
          this.$set(this.errorTips, 0, '合同编码不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 0, '')
        }
        // 甲方公司名称
        if (!this.companyA) {
          this.$set(this.errorTips, 1, '甲方公司不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 1, '')
        }

        // 乙方公司名称
        if (!this.companyB) {
          this.$set(this.errorTips, 2, '乙方公司不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 2, '')
        }

        // 订单编码
        if (!this.orderCode) {
          this.$set(this.errorTips, 3, '订单编码不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 3, '')
        }

        // 签订日期
        if (!this.signingDate) {
          this.$set(this.errorTips, 4, '签订日期不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 4, '')
        }

        // 截止日期
        if (!this.deadline) {
          this.$set(this.errorTips, 5, '截止日期不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 5, '')
        }
      }
    }

  }
</script>

<style scoped module lang="stylus">
  .container
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

  .search-user
    position relative

    > input
      width 300px

  .user-list
    position absolute
    width 312px
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

  .item2
    display flex
    margin-bottom 20px

    textarea
      width 800px
      height 80px
      padding 10px
      outline none
      font-size 14px


</style>