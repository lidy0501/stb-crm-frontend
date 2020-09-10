<template>
  <div class="add-staff">
    <div class="title">
      <div class="title-name">合同列表</div>
      <div class="search-box">
        <div class="input-sty">
          <i class="iconfont icon-sousuo"></i>
          <input type="text" v-model="searchValue" placeholder="合同编号/订单编码/甲方公司"/>
        </div>
        <div class="btn-search" @click="search">查询</div>
      </div>
    </div>
    <div class="list-container">
      <div class="list-title">
        <span class="col1 padL10">合同编号</span>
        <span class="col2">订单编码</span>
        <span class="col3">甲方公司</span>
        <span class="col4">乙方公司</span>
        <span class="col5">订单金额</span>
        <span class="col6">签订日期</span>
        <span class="col7">截止日期</span>
        <span class="col8">备注</span>
        <span class="col9">操作</span>
      </div>
      <div class="list-content">
        <div class="list-item" v-for="item in contractList" :key="item.contractId">
          <span class="col1 padL10" :title="item.contractCode">{{item.contractCode}}</span>
          <span class="col2" :title="item.orderCode">{{item.orderCode}}</span>
          <span class="col3 text-flow" :title="item.companyA">{{item.companyA}}</span>
          <span class="col4 text-flow" :title="item.companyB">{{item.companyB}}</span>
          <span class="col5">{{item.orderPrice / 100.0}}</span>
          <span class="col6" :title="item.signingDate">{{item.signingDate}}</span>
          <span class="col7" :title="item.deadline">{{item.deadline}}</span>
          <span class="col8 text-flow" :title="item.remark">{{item.remark || '--'}}</span>
          <span class="col9">
            <span class="btn default-btn" @click="deleteContract(item)">删除</span>
          </span>
        </div>
        <QuickPager :page="page" @QuickPager="QuickPager"></QuickPager>
      </div>
    </div>
  </div>
</template>

<script>
  import TopHead from '../../../components/TopHead/TopHead.vue'
  import {OPEN_TIP_OPERATE_BOX, OPEN_TOAST} from '../../../store/constants/home'
  import QuickPager from '../../../components/QuickPager/QuickPager.vue'


  export default {
    name: 'ContractList',
    components: {TopHead, QuickPager},
    data() {
      return {
        searchValue: '',
        contractList: [],
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
      QuickPager(page) {
        this.page.startIndex = page.startIndex
        this.page.pageRows = page.pageRows
        this.page.currentPage = page.currentPage
        this.init()
      },
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
        this.$http.post('/ContractController/queryAllContract', {
          startIndex: this.page.startIndex,
          searchValue: this.searchValue
        }).then(res => {
          const data = res.data
          this.contractList = data.list
          this.page = data.page
          this.page.currentPage = Math.floor(data.page.startIndex / data.page.pageRows) + 1
        })
      },
      editStaff(item) {
        this.$router.push(`add-staff/${item.staffId}`)
      },
      deleteContract(contract) {
        this.$store.commit(OPEN_TIP_OPERATE_BOX, {
          tipText: '确定要删除该合同吗？',
          sureCallback: () => {
            this.$http.post('/ContractController/deleteContract/' + contract.contractId).then(res => {
              const data = res.data
              if (data.code === 0) {
                this.$store.commit(OPEN_TOAST, data.message)
                this.init()
              } else {
                this.$store.commit(OPEN_TIP_OPERATE_BOX, data.message)
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

  .list-content
    height 560px
    overflow-y auto

    &::-webkit-scrollbar
      display none

  .list-item
    display flex
    height 45px
    line-height 45px
    border-bottom 1px solid #f0f0f0
    font-size 14px

    > span
      word-break break-all
      overflow hidden
      text-overflow ellipsis
      white-space nowrap

    &:hover
      background-color #edf6f6


  .col1
    width 10%

  .col2
    width 10%

  .col3
    width 13%

  .col4
    width 13%

  .col5
    width 10%

  .col6
    width 10%

  .col7
    width 10%

  .col8
    width 15%

  .padL10
    padding-left 10px

  .btn
    display inline-block
    width 50px
    height 30px
    text-align center
    border-radius 5px
    cursor pointer
    line-height 30px


  .primary-btn
    background-color #3cb371
    color #fff

  .default-btn
    color #3cb371
    border 1px solid #3cb371


  .text-flow
    word-break break-all
    overflow hidden
    text-overflow ellipsis
    white-space nowrap


</style>