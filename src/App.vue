<template>
  <div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
  import './assets/styles/global.styl'



  export default {
    name: 'App',
    components: {
      // 组件名：组件对象
    }
  }
</script>

<style lang="stylus" scoped>

</style>
