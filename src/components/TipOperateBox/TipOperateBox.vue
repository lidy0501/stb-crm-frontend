<template>
  <div class="tip-operate-box" v-show="tip.isShow">
    <mask-layer></mask-layer>
    <div class="operate-content">
      <div class="tipText">
        <span>{{tip.tipText}}</span>
      </div>
      <div class="operate">
        <span @click="cancel">取消</span>
        <span @click="confirm">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
  import MaskLayer from '../MaskLayer/MaskLayer.vue'
  import {SURE_TIP_OPERATE_BOX, CLOSE_TIP_OPERATE_BOX} from '../../store/constants/home'

  export default {
    name: 'TipOperateBox',
    props: {
      // tipText: String
    },
    computed: {
      tip() {
        return this.$store.getters.tipOperateInfo
      }
    },
    methods: {
      cancel() {
        this.$store.commit(CLOSE_TIP_OPERATE_BOX)
      },
      confirm() {
        this.$store.commit(SURE_TIP_OPERATE_BOX)
      }
    },
    components: {
      MaskLayer
    }
  }
</script>

<style scoped lang="stylus">

  .operate-content
    background-color #fff
    width 250px
    position fixed
    z-index 101
    left 40%
    top 20%
    border-radius 5px

  .tipText
    display flex
    align-items center
    height 80px
    justify-content center
    padding 0 20px
    border-bottom 1px solid #e0e0e0

  .operate
    height 40px
    display flex
    align-items center

    > span
      flex 1
      text-align center
      height 100%
      line-height 40px
      cursor pointer

      &:first-child
        border-right 1px solid #e0e0e0

      &:last-child
        color #0085d0






</style>