<template>
    <div class="add-staff">
        <top-head :title="'商品管理'"></top-head>
        <div class="list-container">
            <div class="list-title">
                <span class="col1 padL10">商品名称</span>
                <span class="col2">商品价格</span>
                <span class="col3">商品规格</span>
                <span class="col4">商品备注</span>
                <span class="col5">操作</span>
            </div>
            <div class="list-content">
                <div class="list-item" v-for="item in goodsList" :key="item.goodsId">
                    <span class="col1 padL10" :title="item.goodsName">{{item.goodsName}}</span>
                    <span class="col2 " :title="item.goodsPrice">{{item.goodsPrice || '--'}}</span>
                    <span class="col3 " :title="item.goodsSpe">{{item.goodsSpe || '--'}}</span>
                    <span class="col4 " :title="item.remark">{{item.remark || '--'}}</span>
                    <span class="col5 ">
                        <span class="delete-btn" @click="deleteGoods(item)">删除</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import TopHead from "../../../components/TopHead/TopHead.vue"
  import {OPEN_TIP_OPERATE_BOX, OPEN_TOAST} from '../../../store/constants/home'

  export default {
    name: 'GoodsList',
    components: {TopHead},
    data(){
        return{
            goodsSelected:{},
            goodsList:[]
        }
    },
    mounted(){
        this.init()
    },
    methods: {
        init(){
            this.$http.post('/GoodsController/queryAllGoods').then(res => {
                const data = res.data
                this.goodsList = data
            })
        },
        deleteGoods(goods) {
            this.$store.commit(OPEN_TIP_OPERATE_BOX, {
                tipText: '确定要删除' + goods.goodsName + '吗？',
                sureCallback: () => {
                    this.$http.post('/GoodsController/deleteGoodsById/' + goods.goodsId).then(res => {
                        const data = res.data
                        this.$store.commit(OPEN_TOAST, data.message)
                        this.init()
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

        > span
            word-break break-all
            overflow hidden
            text-overflow ellipsis
            white-space nowrap

    .col1
        width 10%

    .col2
        width 10%

    .col3
        width 10%

    .col4
        width 18%

    .delete-btn
        display inline-block
        width 60px
        height 30px
        color #3cb371
        text-align center
        line-height 30px
        border 1px solid #3cb371
        border-radius 5px
        margin auto 0
        cursor pointer



</style>