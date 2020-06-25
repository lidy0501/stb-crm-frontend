<template>
  <div class="manage-body">
    <left-menu></left-menu>
    <div class="right-box">
      <transition name="fade" mode="out-in">
        <router-view :key="$route.fullPath"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import LeftMenu from '../../components/Menu/LeftMenu.vue'

  export default {
    name: 'Manage',
    components: {
      LeftMenu
    }
  }
</script>

<style scoped lang="stylus">

  .manage-body
    background-color #f7f8fc
    position relative
    flex 1

  .right-box
    margin-left 200px
    margin-bottom 30px

</style>