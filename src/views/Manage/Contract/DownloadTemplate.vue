<template>
  <div class="container">
    <top-head :title="'模板下载'"></top-head>
    <div class="base-info">
      <div class="title">所有模板</div>
      <div class="template-list">
        <div class="temp-item">
          <div>订单中文合同
            <i class="iconfont icon-wordwenjian icon-sty1"></i>
          </div>
          <div class="down-btn" @click="downFile('中文销售合同')">下载
            <i class="iconfont icon-xiazai icon-sty1"></i>
          </div>
        </div>

        <div class="temp-item">
          <div>出口订单英文合同
            <i class="iconfont icon-excelwenjian icon-sty2"></i>
          </div>
          <div class="down-btn" @click="downFile('出口订单英文合同')">下载
            <i class="iconfont icon-xiazai icon-sty2"></i>
          </div>
        </div>

        <div class="temp-item">
          <div>中文报价单
            <i class="iconfont icon-excelwenjian icon-sty2"></i>
          </div>
          <div class="down-btn" @click="downFile('中文报价单')">下载
            <i class="iconfont icon-xiazai icon-sty2"></i>
          </div>
        </div>

        <div class="temp-item">
          <div>英文报价单
            <i class="iconfont icon-excelwenjian icon-sty2"></i>
          </div>
          <div class="down-btn" @click="downFile('英文报价单')">下载
            <i class="iconfont icon-xiazai icon-sty2"></i>
          </div>
        </div>

        <div class="temp-item">
          <div>出口商业发票
            <i class="iconfont icon-excelwenjian icon-sty2"></i>
          </div>
          <div class="down-btn" @click="downFile('出口商业发票')">下载
            <i class="iconfont icon-xiazai icon-sty2"></i>
          </div>
        </div>

        <div class="temp-item">
          <div>出口箱单
            <i class="iconfont icon-excelwenjian icon-sty2"></i>
          </div>
          <div class="down-btn" @click="downFile('出口箱单')">下载
            <i class="iconfont icon-xiazai icon-sty2"></i>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import TopHead from '../../../components/TopHead/TopHead.vue'

export default {
  name: 'DownloadTemplate',
  components: {TopHead},
  methods: {
    downFile(name) {
      console.log('process.env.NODE_ENV==' + process.env.NODE_ENV)
      if (process.env.NODE_ENV === 'development') {
        console.log(1)
        location.href = 'http://localhost:9911/crm/TemplateController/downLoadTest?template=' + name
      } else if (process.env.NODE_ENV === 'none') { // 测试
        console.log(2)
        location.href = 'http://47.114.140.213:9911/crm/TemplateController/downLoadTest?template=' + name
      } else if (process.env.NODE_ENV === 'production') {
        console.log(3)
        location.href = 'http://stbcrm.top:9911/crm/TemplateController/downLoadTest?template=' + name
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
    height 500px

  .template-list
    display flex
    margin-top 20px
    flex-wrap wrap

  .temp-item
    width 200px
    font-size 18px

  .icon-sty1
    color dodgerblue
    font-size 20px

  .icon-sty2
    color forestgreen
    font-size 20px

  .down-btn
    margin-top 10px
    padding-left 20px

</style>