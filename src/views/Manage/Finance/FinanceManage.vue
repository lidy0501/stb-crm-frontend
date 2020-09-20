<template>
  <div class="finance-manage">
    <div class="title">
      <div class="title-name">财务管理</div>
      <div class="search-box">
        <div class="block">
          <span class="demonstration">日期：</span>
          <el-date-picker
              v-model="date"
              value-format="yyyy-MM-dd"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <div class="input-sty">
          <i class="iconfont icon-sousuo"></i>
          <input type="text" v-model="searchValue" placeholder="员工姓名/员工账号"/>
        </div>
        <div class="btn-search" @click="search">查询</div>
      </div>
    </div>

    <div class="finance-container">
      <div class="left-sec">
        <template v-if="staffCode">
          <div>姓名：{{staffName}}</div>
          <div>账号：{{staffCode}}</div>
        </template>
        <template v-else>
          <div class="no-order">暂无员工信息</div>
        </template>

      </div>

      <div class="right-sec">
        <template v-if="orderItems.length > 0">
          <div class="list-container">
            <div class="list-title">
              <div class="col1 padL10">订单编码</div>
              <div class="col2">订单总额(元)</div>
              <div class="col3">订单成本(元)</div>
            </div>
            <div class="list-content">
              <div class="list-item" v-for="(item, index) in orderItems">
                <div class="col1 padL10 active" @click="$router.push(`order-details/${item.orderId}`)">{{item.orderCode}}</div>
                <div class="col2">{{item.totalFee / 100.0}}</div>
                <div class="col3">{{item.goodsFee / 100.0}}</div>
              </div>
            </div>
          </div>
          <div class="finance-types">
            <div class="type-item">
              <span>提成1：</span>
              <span class="formula">(订单销售额-订单成本) x 30%</span>
              <span class="calculate-btn" @click="calculate(1)">计算提成</span>
            </div>
            <div class="type-item">
              <span>提成2：</span>
              <span class="formula">(订单销售额-订单成本)</span>
              <span class="calculate-btn"  @click="calculate(2)">计算提成</span>
            </div>
            <div class="type-item">
              <span>提成3：</span>
              <span class="formula">订单销售额 x 10%</span>
              <span class="calculate-btn"  @click="calculate(3)">计算提成</span>
            </div>
            <div class="type-item">
              <span>提成4：</span>
              <span class="formula">订单销售额 x 6%</span>
              <span class="calculate-btn"  @click="calculate(4)">计算提成</span>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="no-order">暂无订单信息</div>
        </template>
      </div>
    </div>
    <CalculateBox v-if="showCalculateBox" @close="showCalculateBox = false"
      :type="type" :gross="gross" :cost="cost">
    </CalculateBox>
  </div>
</template>

<script>
import TopHead from '../../../components/TopHead/TopHead.vue'
import QuickPager from '../../../components/QuickPager/QuickPager.vue'
import CalculateBox from './components/CalculateBox.vue'
import {OPEN_ERROR_TIP_BOX, OPEN_TIP_OPERATE_BOX, OPEN_TOAST} from '../../../store/constants/home'


export default {
  components: {TopHead, QuickPager, CalculateBox},
  data() {
    return {
      searchValue: '',
      staffName: '',
      staffCode: '',
      showCalculateBox: false,
      orderItems: [],
      type: 1, // 提成方式 1， 2， 3， 4
      gross: 0, // 所有订单金额总和
      cost: 0, // 所有订单的成本
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      date: '',
      startDate: '',
      endDate: '',
    }
  },
  watch: {
    date(n, o) {
      this.startDate = n[0]
      this.endDate = n[1]
    }
  },
  methods: {
    search() {
      if (!this.date) {
        this.$store.commit(OPEN_ERROR_TIP_BOX, '请选择时间')
        return
      }
      if (!this.searchValue) {
        this.$store.commit(OPEN_ERROR_TIP_BOX, '请输入查询条件')
        return
      }
      this.$http.post('/FinanceController/staffFinance', {
        startDate: this.startDate,
        endDate: this.endDate,
        searchValue: this.searchValue
      }).then(res => {
        const data = res.data
        if (data.code === 0) {
          this.staffName = data.data.staffName
          this.staffCode = data.data.staffCode
          this.gross = data.data.gross
          this.cost = data.data.cost
          this.orderItems = data.data.orderItems
        } else {
          this.$store.commit(OPEN_ERROR_TIP_BOX, data.message)
        }
      })
    },
    calculate(type) {
      this.type = type
      this.showCalculateBox = true
    }
  }
}
</script>

<style module lang="stylus" scoped>
.finance-manage
  width 100%

  .title
    background-color #fff
    padding 0 20px
    height 60px
    border-radius 5px
    display flex
    align-items center
    justify-content space-between
    font-weight normal !important


  .title-name
    font-size 18px
    font-weight bold

  .search-box
    display flex
    align-items center


  .input-sty
    margin-left 20px
    width 280px
    display flex
    height 40px
    align-items center
    border 1px solid #f0f0f0
    border-radius 5px
    margin-right 20px
    padding 0 10px

    i
      color #d7d7d7

    input
      outline none
      border none
      font-size 16px

  .btn-search
    height 40px
    background-color mediumseagreen
    color #fff
    width 80px
    text-align center
    line-height 40px
    font-size 16px
    border-radius 5px
    cursor pointer
    font-weight 200


  .finance-container
    margin-top 20px
    background-color #fff
    border-radius 5px
    display flex

  .left-sec
    padding 20px
    width 200px
    background-color #d0d0d0

    > div
      height 30px
      line-height 30px

  .right-sec
    flex 1
    padding 20px

  .list-title
    display flex
    background-color #f0f4f6
    height 50px
    align-items center

  .list-item
    display flex
    height 40px
    align-items center

    &:hover
      background-color #edf6f6

  .col1
    width 20%

  .col2
    width 20%

  .col3
    width 20%


  .padL10
    padding-left 10px

  .active
    color dodgerblue
    cursor pointer


  .calculate-btn
    display inline-block
    width 70px
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

  .finance-types
    border-top 1px solid #d0d0d0
    padding 20px 10px

  .type-item
    height 40px
    line-height 40px

    > span
      display inline-block

      &:nth-child(1)
        width 60px

  .formula
    display inline-block
    width 250px

  .no-order
    text-align center


</style>