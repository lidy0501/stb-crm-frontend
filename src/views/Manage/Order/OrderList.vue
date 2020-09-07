<template>
  <div class="add-staff">
    <div class="title">
      <div class="title-name">订单列表</div>
      <div class="search-box">
        <div class="input-sty">
          <i class="iconfont icon-sousuo"></i>
          <input type="text" v-model="searchValue" placeholder="订单编号/客户/公司/跟单人"/>
        </div>
        <div class="btn-search" @click="search">查询</div>
      </div>
    </div>

    <div class="list-container">
      <div class="list-title">
        <span class="col1 padL10">订单编码</span>
        <span class="col2">产品信息</span>
        <span class="col3">客户</span>
        <span class="col4">交易公司</span>
        <span class="col5">订单总额(元)</span>
        <span class="col6">交易进度(%)</span>
        <span class="col7">订单状态</span>
        <span class="col8">跟单人</span>
        <span class="col9">操作</span>
      </div>
      <div class="list-content">
        <div class="list-item" v-for="item in orderList" :key="item.orderId">
          <div class="col1 padL10" :title="item.orderCode">{{item.orderCode}}</div>
          <div class="col2">
            <div class="goods-item text-flow" v-for="goods in item.goodsItemList"
                 :title="`${goods.goodsName}  x${goods.amount}${goods.skuUnit} ${goods.skuColor}`">
              {{`${goods.goodsName}  x${goods.amount}${goods.skuUnit} ${goods.skuColor}`}}
            </div>
          </div>
          <div class="col3" :title="item.userName">{{item.userName}}</div>
          <div class="col4" :title="item.company">{{item.company}}</div>
          <div class="col5">{{item.totalFee / 100.0}}</div>
          <div class="col6">{{(100 * item.downPayFee / item.totalFee).toFixed(1)}}</div>
          <div class="col7">{{item.orderState === '0' ? '未完成' : '已完成'}}</div>
          <div class="col8" :title="item.operatorName">{{item.operatorName}}</div>
          <div class="col9">
            <span class="delete-btn" @click="changeOrderState(item, item.orderState === '0' ? '1' : '0')">
              {{item.orderState === '0' ? '完成' : '未完成'}}</span>
            <span class="delete-btn" @click="$router.push(`order-details/${item.orderId}`)">查看</span>
            <span class="delete-btn" @click="changeOrderState(item, '9')">删除</span>
          </div>
        </div>
        <QuickPager :page="page" @QuickPager="QuickPager"></QuickPager>
      </div>
    </div>
  </div>
</template>

<script>
  import TopHead from '../../../components/TopHead/TopHead.vue'
  import QuickPager from '../../../components/QuickPager/QuickPager.vue'
  import {OPEN_TIP_OPERATE_BOX, OPEN_TOAST} from '../../../store/constants/home'


  export default {
    name: 'OrderList',
    components: {TopHead, QuickPager},
    data() {
      return {
        searchValue: '',
        orderList: [],
        page: {
          startIndex: 0,
          currentPage: 1,
          pageRows: 10,
          totalPages: 1,
          totalRows: 0
        }
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      search() {
        this.page = {
          startIndex: 0,
          currentPage: 1,
          pageRows: 10,
          totalPages: 1,
          totalRows: 0
        }
        this.init()
      },
      init() {
        this.$http.post('/OrderController/queryAllOrder', {
          searchValue: this.searchValue,
          startIndex: this.page.startIndex
        }).then(res => {
          const data = res.data
          this.orderList = data.list
          this.page = data.page
          this.page.currentPage = Math.floor(data.page.startIndex / data.page.pageRows) + 1
        })
      },
      QuickPager(page) {
        this.page.startIndex = page.startIndex
        this.page.pageRows = page.pageRows
        this.page.currentPage = page.currentPage
        this.init()
      },
      changeOrderState(order, state) {
        let text = ''
        if (state === '9') text = '确定要删除该订单吗？'
        else if (state === '0') text = '确定要置为未完成吗？'
        else text = '确定要置为已完成吗？'
        this.$store.commit(OPEN_TIP_OPERATE_BOX, {
          tipText: text,
          sureCallback: () => {
            this.$http.post(`/OrderController/changeOrderState/${order.orderId}/${state}`).then(res => {
              const data = res.data
              this.$store.commit(OPEN_TOAST, data.message)
              if (data.code === 0) {
                setTimeout(() => {
                  this.init()
                }, 2100)
              }
            })
          }
        })
      }
    }
  }
</script>

<style module lang="stylus" scoped>
  .add-staff
    width 100%

  .title
    background-color #fff
    padding 0 20px
    height 60px
    border-radius 5px
    display flex
    align-items center
    justify-content space-between


  .title-name
    font-size 18px
    font-weight bold

  .search-box
    display flex
    align-items center


  .input-sty
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


  .list-container
    margin-top 20px
    background-color #fff
    border-radius 5px

  .list-title
    height 50px
    display flex
    line-height 50px
    background-color #f0f4f6
    font-weight bold
    font-size 14px

  .list-content
    height 560px
    overflow-y auto
    font-size 14px

    &::-webkit-scrollbar
      display none

  .list-item
    display flex
    min-height 45px
    /*line-height 45px*/
    align-items center
    border-bottom 1px solid #f0f0f0

    > div
      word-break break-all
      overflow hidden
      text-overflow ellipsis
      white-space nowrap

    &:hover
      background-color #edf6f6


  .col1
    width 10%

  .col2
    width 20%

  .col3
    width 6%

  .col4
    width 10%

  .col5
    width 9%

  .col6
    width 9%

  .col7
    width 9%

  .col8
    width 8%


  .padL10
    padding-left 10px

  .delete-btn
    display inline-block
    width 50px
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

  .goods-item
    height 25px
    line-height 25px
    width 100%


</style>