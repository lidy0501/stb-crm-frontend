<template>
  <div class="add-staff">
    <top-head :title="'新增商品'"></top-head>
    <div class="base-info">
      <div class="title">商品基本信息</div>
      <div class="item">
        <left-head class="margin-20" :left-title="'商品名称'" :necessary="true"></left-head>
        <input placeholder="请输入商品名称" v-model="goodsName"/>
        <span class="error-tip">{{errorTips[0]}}</span>
      </div>
      <div class="item">
        <left-head class="margin-20" :left-title="'商品价格'" :necessary="false"></left-head>
        <input placeholder="请输入商品价格,非必填" v-model="goodsPrice"/>
      </div>
      <div class="item">
        <left-head class="margin-20" :left-title="'商品规格'" :necessary="false"></left-head>
        <input placeholder="请输入商品规格,非必填" v-model="goodsSpe"/>
      </div>
      <div class="item2">
        <left-head class="margin-20" :left-title="'商品备注'" :necessary="false"></left-head>
        <input placeholder="请输入商品备注,非必填(限200字)" v-model="remark"/>
      </div>
      <footer-btn @goBack="goBack" @save="save"></footer-btn>
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

<style scoped>

</style>