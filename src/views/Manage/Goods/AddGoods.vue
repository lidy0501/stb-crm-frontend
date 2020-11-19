<template>
  <div class="add-staff">
    <top-head :title="'新增商品'"></top-head>
    <div class="base-info">
      <div class="title">商品基本信息</div>
      <div class="item">
        <left-head class="margin-20" :left-title="'商品编码'" :necessary="true"></left-head>
        <input placeholder="请输入商品编码" v-model="goodsCode"/>
        <span class="error-tip">{{errorTips[0]}}</span>
      </div>
      <div class="item">
        <left-head class="margin-20" :left-title="'商品名称'" :necessary="true"></left-head>
        <input placeholder="请输入商品名称" v-model="goodsName"/>
        <span class="error-tip">{{errorTips[1]}}</span>
      </div>
      <div class="item">
        <left-head class="margin-20" :left-title="'销售单价'" :necessary="true"></left-head>
        <input placeholder="请输入销售单价" v-model="goodsPrice" @input="inputMoney(goodsPrice)"/>
        <span class="error-tip">{{errorTips[2]}}</span>
      </div>

      <div class="item">
        <left-head class="margin-20" :left-title="'SKU编码'" :necessary="true"></left-head>
        <input placeholder="请输入SKU编码" v-model="skuCode" maxlength="50"/>
        <span class="error-tip">{{errorTips[3]}}</span>
      </div>

      <div class="item">
        <left-head class="margin-20" :left-title="'商品单位'" :necessary="true"></left-head>
        <input placeholder="请输入商品单位" v-model="skuUnit" maxlength="10"/>
        <span class="error-tip">{{errorTips[4]}}</span>
      </div>

      <div class="item">
        <left-head class="margin-20" :left-title="'商品花色'" :necessary="true"></left-head>
        <input placeholder="请输入商品花色" v-model="skuColor" maxlength="10"/>
        <span class="error-tip">{{errorTips[5]}}</span>
      </div>
      <!--<div class="item">-->
        <!--<left-head class="margin-20" :left-title="'商品规格'" :necessary="true"></left-head>-->
        <!--<DrowDown :defaultOption="'请选择规格'" :options='skuList' @selectOption='selectSku' :boxWidth="312"></DrowDown>-->
        <!--<span class="error-tip">{{errorTips[3]}}</span>-->
      <!--</div>-->
      <div class="item2">
        <left-head class="margin-20" :left-title="'商品备注'" :necessary="false"></left-head>
        <textarea placeholder="请输入商品备注(限200字)" maxlength="200" v-model="remark"/>
      </div>
      <footer-btn @goBack="goBack" @save="save"></footer-btn>
    </div>
  </div>
</template>


<script>
  import LeftHead from '../../../components/LeftHead/LeftHead.vue'
  import TopHead from '../../../components/TopHead/TopHead.vue'
  import FooterBtn from '../../../components/FooterBtn/FooterBtn.vue'
  import {OPEN_ERROR_TIP_BOX, OPEN_TOAST} from '../../../store/constants/home'
  import DrowDown from '../../../components/DrowDown/DrowDown.vue'

  export default {
    name: 'AddGoods',
    components: {LeftHead, TopHead, FooterBtn, DrowDown},
    data() {
      return {
        //goodsId: this.$route.params.goodsId,没用到
        goodsCode: '',
        goodsName: '',
        goodsPrice: '', // 页面展示的是元，数据库存的是分
        goodsSpe: '',
        remark: '',
        skuId: '',
        saveFlag: true,
        errorTips: [],
        skuList: [{code: '1', name: '黄色/台'}, {code: '1', name: '黄色/台'}, {code: '1', name: '黄色/台'}],
        skuCode: '',
        skuUnit: '',
        skuColor: ''
      }
    },
    mounted() {
      this.querySkuList()
    },
    methods: {
      inputMoney(goodsPrice) {
        goodsPrice = goodsPrice.replace(/[^0-9|\\.]+/g, '')
        this.goodsPrice = this.$utils.fixToNum(goodsPrice) + ''
      },
      querySkuList() {
        this.$http.post('/GoodsController/querySkuList').then(res => {
          this.$glo_loading.loadingHide()
          const data = res.data
          let list = data
          this.skuList = list.map(x => {
            return {code: x.skuId, name: '编码:' + x.skuCode + '  单位:' + x.skuUnit + '  花色:' + x.skuColor}
          })
        })
      },
      selectSku(code) {
        this.skuId = code
      },
      goBack() {
        this.$router.go(-1)
      },
      save() {
        this.saveFlag = true
        this.validateInfo()
        if (!this.saveFlag) return

        this.$http.post('/GoodsController/addGoods', {
          goodsCode: this.goodsCode,
          goodsName: this.goodsName,
          goodsPrice: +this.goodsPrice * 100, // 页面展示的是元，数据库存的是分
          skuCode: this.skuCode,
          skuUnit: this.skuUnit,
          skuColor: this.skuColor,
          remark: this.remark
        }).then(res => {
          this.$glo_loading.loadingHide()
          const data = res.data
          if (data.code === 0) {
            this.$store.commit(OPEN_TOAST, '保存成功')
            setTimeout(() => {
              this.$router.push('goods-list')
            }, 1000)
          } else {
            this.$store.commit(OPEN_ERROR_TIP_BOX, data.message)
          }
        })
      },
      validateInfo() {
        if (!this.goodsCode) {
          this.$set(this.errorTips, 0, '商品编码不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 0, '')
        }
        if (!this.goodsName) {
          this.$set(this.errorTips, 1, '商品名称不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 1, '')
        }
        if (!this.goodsPrice) {
          this.$set(this.errorTips, 2, '商品价格不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 2, '')
        }
        if (!this.skuCode) {
          this.$set(this.errorTips, 3, 'SKU编码不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 3, '')
        }
        if (!this.skuUnit) {
          this.$set(this.errorTips, 4, '单位不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 4, '')
        }
        if (!this.skuColor) {
          this.$set(this.errorTips, 5, '花色不能为空')
          this.saveFlag = false
        } else {
          this.$set(this.errorTips, 5, '')
        }
        this.$forceUpdate()
      }
    }
  }
</script>

<style module lang="stylus">
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
      font-size 14px
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

    .item2
      display flex
      margin-bottom 20px

      textarea
        width 85.3%
        height 80px
        padding 10px
        outline none
        font-size 16px

    .length3
      width 85.2%

</style>