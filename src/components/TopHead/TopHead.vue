<template>
  <div class="top-head">
    {{title}}
  </div>
</template>

<script>
  export default {
    name: 'TopHead',
    props: {
      title: String
    }
  }
</script>

<style module lang="stylus">
  .top-head
    background-color #fff
    font-size 18px
    padding-left 20px
    height 60px
    line-height 60px
    font-weight bold
    border-radius 5px

</style>