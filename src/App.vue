<template>
  <div class="main-page" ref="content">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
  //import './assets/styles/global.styl'



  export default {
    name: 'App',
    components: {
      // 组件名：组件对象
    },
    mounted() {
      this.$refs.content.style.height = window.innerHeight + 'px'
    }
  }
</script>

<style lang="stylus" scoped>
  @import "assets/styles/reset.css"
  .main-page
    height 100%
    display flex
    flex-direction column

</style>
