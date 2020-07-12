<template>
  <div class="toast" v-if="toast.isShow">
    <div class="operate-result">
      <span>{{toast.text}}</span>
    </div>
  </div>
</template>

<script>
  import {CLOSE_TOAST} from '../../store/constants/home'

  export default {
    name: 'Toast',
    computed: {
      toast() {
        return this.$store.getters.toastInfo
      }
    },
    watch: {
      'toast.isShow': {
        handler: function () {
          setTimeout(function () {
            this.$store.commit(CLOSE_TOAST)
          }.bind(this), 2000)
        },
        deep: true
      }
    }
  }
</script>

<style module lang="stylus">
  .toast
    position fixed
    width 100%
    height 100%
    left 0
    top 0
    background rgba(0, 0, 0, .5)
    z-index 100

  .operate-result
    background-color #fff
    width 300px
    height 100px
    margin-left 40%
    margin-top 20%
    border-radius 10px
    line-height 100px
    text-align center
</style>