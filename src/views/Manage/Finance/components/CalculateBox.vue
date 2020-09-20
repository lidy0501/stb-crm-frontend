<template>
  <div class="calculate-box">
    <div class="calculate-details">
      <div class="head">
        <span>计算提成</span>
        <i class="iconfont icon-guanbi" @click="close"></i>
      </div>

      <div class="calculate-type" v-if="type === 1">
        ({{gross / 100.0}} - {{cost / 100.0}}) x 30% = {{ (gross - cost) * 30 / 100.0 / 100.0}}
      </div>

      <div class="calculate-type" v-if="type === 2">
        {{gross / 100.0}} - {{cost / 100.0}} = {{ (gross - cost) / 100.0}}
      </div>

      <div class="calculate-type" v-if="type === 3">
        {{gross / 100.0}} x 10% = {{ gross / 100.0 * 10 / 100.0}}
      </div>

      <div class="calculate-type" v-if="type === 4">
        {{gross / 100.0}} x 6% = {{ gross / 100.0 * 6 / 100.0}}
      </div>

      <div class="footer">
        <span @click="close">关闭</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalculateBox',
  props: {
    type: Number, // 提成方式
    gross: Number, // 所有订单金额总和
    cost: Number // 所有订单的成本
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped module lang="stylus">
  .calculate-box
    position fixed
    z-index 10
    top 0
    left 0
    width 100%
    height 100%
    background rgba(0, 0, 0, 0.3)
    display flex
    align-items center
    justify-content center

    .calculate-details
      width 500px
      height 180px
      background-color #fff
      border-radius 8px
      padding 20px
      position relative

      .head
        height 30px
        display flex
        align-items center
        justify-content space-between
        font-weight bold

      .calculate-type
        height 50px
        line-height 50px

      .footer
        width 460px
        position absolute
        bottom 0
        height 60px
        text-align center

        > span
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