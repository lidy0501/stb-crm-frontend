<template>
  <div class="left-head">
    <span class="red-star" v-if="necessary">*</span>
    <span>{{leftTitle}}:</span>
  </div>
</template>

<script>
  export default {
    name: 'LeftHead',
    props: {
      leftTitle: String,
      necessary: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style module lang="stylus">
  .left-head
    width 120px
    text-align right

  .red-star
    color #f00

</style>