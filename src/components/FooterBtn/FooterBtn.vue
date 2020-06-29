<template>
  <div class="footer">
    <span class="btn-default" @click="goBack">返回</span>
    <span class="btn-primary" @click="save">保存</span>
  </div>
</template>

<script>
  export default {
    name: 'FooterBtn',
    methods: {
      goBack() {
        this.$emit('goBack')
      },
      save() {
        this.$emit('save')
      }
    },
  }
</script>

<style module lang="stylus">
  .footer
    height 60px
    display flex
    justify-content center

    > span
      width 100px
      height 38px
      text-align center
      line-height 38px
      border-radius 5px
      cursor pointer

  .btn-default
    border 1px solid mediumseagreen
    color mediumseagreen
    background-color #fff
    margin-right 50px

  .btn-primary
    background-color mediumseagreen
    color #fff

</style>