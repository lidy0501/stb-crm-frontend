<template>
  <div class="error-tips-box" v-show="tips.isShow">
    <div class="tip-content">
      <div>{{tips.tipText}}</div>
      <div>
        <span @click="IKnow">我知道了</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {CLOSE_ERROR_TIP_BOX} from '../../store/constants/home'

  export default {
    name: 'ErrorTipsBox',
    computed: {
      tips() {
        return this.$store.getters.errorTipsInfo
      }
    },
    methods: {
      IKnow() {
        this.$store.commit(CLOSE_ERROR_TIP_BOX)
      }
    }
  }
</script>

<style scoped module lang="stylus">

  .error-tips-box
    position fixed
    width 100%
    height 100%
    left 0
    top 0
    background rgba(0, 0, 0, .5)
    z-index 100
    display flex
    align-items center
    justify-content center
    font-size 14px

  .tip-content
    background-color #fff
    width 250px
    //height 150px
    border-radius 10px
    padding 10px

    > div
      text-align center

      &:nth-child(1)
        min-height 40px

      &:nth-child(2)
        height 40px
        line-height 40px

        > span
          color #1e90ff
          cursor pointer
          padding 3px 8px
          border 1px solid #1e90ff
          border-radius 5px



</style>