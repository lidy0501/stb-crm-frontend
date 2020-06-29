<template>
  <div class="toast">
    <div class="operate-result">
      <span>操作成功</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Toast'
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