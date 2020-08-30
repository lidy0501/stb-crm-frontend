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
          <div class="operate-box">
            <i class="iconfont icon-jiahao" @click="addSku"></i>
          </div>
        </div>
        <div class="sku-item" v-for="(old, index) in oldSkuList">
          <div>{{old.skuCode}}</div>
          <div>{{old.skuUnit}}</div>
          <div>{{old.skuColor}}</div>
          <div class="operate-box">
            <i class="iconfont icon-jianhao" @click="deleteSku('old', index)"></i>
          </div>
        </div>

        <div class="sku-item" v-for="(item, index) in newSkuList">
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
            <i class="iconfont icon-jianhao" @click="deleteSku('new', index)"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="errorTop">{{errorTip}}</div>
    <div class="footer-btn">
      <footer-btn @goBack="goBack" @save="save" v-if="newSkuList.length > 0"></footer-btn>
    </div>

  </div>
</template>


<script>
  import TopHead from '../../../components/TopHead/TopHead.vue'
  import {OPEN_TIP_OPERATE_BOX, OPEN_TOAST, OPEN_ERROR_TIP_BOX} from '../../../store/constants/home'
  import FooterBtn from '../../../components/FooterBtn/FooterBtn.vue'



  export default {
    name: 'SKUSet',
    components: {TopHead, FooterBtn},
    data() {
      return {
        oldSkuList: [], // 已经存在的skuList
        newSkuList: [],
        errorTip: '',
        inputFill: true,
        repeat: false // true表有重复的sku编码
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.$http.post('/GoodsController/querySkuList').then(res => {
          const data = res.data
          this.oldSkuList = data
        })
      },
      deleteSku(type, index) {
        if (type === 'new') { // 说明是新加的, 直接删除
          this.newSkuList.splice(index, 1);
        } else { // 已经存在的sku，需要检查这个sku有没有在使用，如果已经在使用，是不能删除的
        }
      },
      addSku() {
        this.newSkuList.push({skuId: '', skuCode: '', skuUnit: '', skuColor: ''});
      },
      goBack() {
        this.$route.go(-1)
      },
      save() {
        //this.$store.commit(OPEN_ERROR_TIP_BOX, '不能删除')
        this.errorTip = ''
        this.inputFill = true
        this.repeat = false
        this.verifySkuInput()
        if (!this.inputFill) {
          return
        }
        this.verifyRepeat()
        if (this.repeat) {
          return
        }
        this.$http.post('/GoodsController/addSku', this.newSkuList).then(res => {
          const data = res.data
          if (data.code === 0) {
            this.$store.commit(OPEN_TOAST, '保存成功')
            this.newSkuList = []
            this.init()
          } else {
            this.$store.commit(OPEN_ERROR_TIP_BOX, data.message)
          }
        })
      },
      verifySkuInput() {
        // 校验输入框
        this.newSkuList.forEach(sku => {
          if (!sku.skuCode || !sku.skuUnit || !sku.skuColor) {
            this.errorTip = '请输入完整的sku信息';
            this.inputFill = false;
          }
        })
      },
      verifyRepeat () {
        let list = []
        list.push(...this.oldSkuList)
        list.push(...this.newSkuList)
        console.log(list)
        for (let i = 0; i < list.length - 1; i++) {
          for (let j = i + 1; j <= list.length - 1; j++) {
            if (list[i].skuCode === list[j].skuCode) {
              this.repeat = true
              this.errorTip = 'SKU编码：' + list[i].skuCode + '重复出现，请修改后保存！'
              break
            }
          }
        }
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