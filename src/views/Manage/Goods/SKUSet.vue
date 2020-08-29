<template>
  <div class="sku-set">
    <top-head :title="'SKU设置'"></top-head>
    <div class="sku-content">
      <div class="left-sec">SKU信息</div>
      <div class="right-sec">
        <div class="sku-title">
          <div>SKU编码</div>
          <div>单位</div>
          <div>花色</div>
        </div>
        <div class="sku-item" v-for="(item, index) in skuList">
          <div>
            <input type="text" placeholder="请输入编码" v-model="item.skuCode">
          </div>
          <div>
            <input type="text" placeholder="请输入单位" v-model="item.skuUnit">
          </div>
          <div>
            <input type="text" placeholder="请输入花色" v-model="item.skuColor">
          </div>
          <div class="operate-box">
            <i v-if="skuList.length !== 1" class="iconfont icon-jianhao" @click="deleteSku(index)"></i>
            <i v-if="index === skuList.length - 1" class="iconfont icon-jiahao" @click="addSku"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="errorTop">{{errorTip}}</div>
    <div class="footer-btn">
      <footer-btn @goBack="goBack" @save="save"></footer-btn>
    </div>
    <!--<ErrorTipsBox></ErrorTipsBox>-->

  </div>
</template>


<script>
  import TopHead from '../../../components/TopHead/TopHead.vue'
  import {OPEN_TIP_OPERATE_BOX, OPEN_TOAST, OPEN_ERROR_TIP_BOX} from '../../../store/constants/home'
  import FooterBtn from '../../../components/FooterBtn/FooterBtn.vue'
  import ErrorTipsBox from '../../../components/ErrorTipsBox/ErrorTipsBox.vue'



  export default {
    name: 'SKUSet',
    components: {TopHead, FooterBtn, ErrorTipsBox},
    data() {
      return {
        errorTips: [],
        skuList: [{
          skuId: '1', skuCode: '1', skuUnit: '台', skuColor: '黄色'
          },
          {

          },
          {
          }, {}],
        errorTip: '',
        inputFill: true
      }
    },
    methods: {
      deleteSku(index) {
        console.log(1)
        this.$store.commit(OPEN_ERROR_TIP_BOX, '不能删除')
        console.log(2)
        return
        if (!this.skuList[index].skuId) { // 说明是新加的
          this.skuList.splice(index, 1);
        } else { // 已经存在的sku，需要检查这个sku有没有在使用，如果已经在使用，是不能删除的
        }
      },
      addSku() {
        this.skuList.push({});
      },
      goBack() {
        this.$route.go(-1)
      },
      save() {
        this.$store.commit(OPEN_ERROR_TIP_BOX, '不能删除')
        return
        this.errorTip = ''
        this.inputFill = true
        this.verifySkuInput()
        if (!this.inputFill) {
          return
        }
        this.$store.commit(OPEN_TOAST, '保存成功')
      },
      verifySkuInput() {
        this.skuList.forEach(sku => {
          if (!sku.skuCode || !sku.skuUnit || !sku.skuColor) {
            this.errorTip = '请输入完整的sku信息';
            this.inputFill = false;
          }
        });
      }
    }
  }
</script>

<style scoped module lang="stylus">

  .sku-content
    display flex
    padding 20px
    margin-top 20px
    background-color #fff
    border-radius 5px

  .left-sec
    width 150px
    font-weight bold

  .right-sec
    flex 1

  .sku-title
    display flex
    font-weight bold

    > div
      width 200px

  .sku-item
    margin-top 10px
    display flex

    > div
      display flex
      width 200px
      height 40px
      align-items center

      input
        width 150px
        height 30px

  .operate-box

    > i
      font-size 20px
      margin-right 10px
      color #3cb371

  .errorTop
    height 30px
    text-align center
    width 100%
    background-color #fff
    font-size 12px
    color #f00

  .footer-btn
    background-color #fff





</style>