<template>
  <div>
    <div class="layer"></div>
  </div>
</template>

<script>
  export default {
    name: 'MaskLayer'
  }
</script>

<style scoped lang="stylus">
  .layer
    height 100%
    width 100%
    position fixed
    z-index: 100
    left 0
    background-color rgba(0, 0, 0, 0.4)
</style>