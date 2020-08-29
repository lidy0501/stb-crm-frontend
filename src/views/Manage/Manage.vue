<template>
  <div class="manage-body">
    <left-menu></left-menu>
    <div class="right-box">
      <transition name="fade" mode="out-in">
        <router-view :key="$route.fullPath"></router-view>
      </transition>
    </div>
    <TipOperateBox></TipOperateBox>
    <Toast></Toast>
    <ErrorTipsBox></ErrorTipsBox>
  </div>
</template>

<script>
  import LeftMenu from '../../components/Menu/LeftMenu.vue'
  import TipOperateBox from '../../components/TipOperateBox/TipOperateBox.vue'
  import Toast from '../../components/Toast/Toast.vue'
  import ErrorTipsBox from '../../components/ErrorTipsBox/ErrorTipsBox.vue'


  export default {
    name: 'Manage',
    components: {
      LeftMenu,
      TipOperateBox,
      Toast,
      ErrorTipsBox
    }
  }
</script>

<style scoped lang="stylus">

  .manage-body
    background-color #f7f8fc
    position relative
    flex 1
    display flex

  .right-box
    flex 1
    padding 20px

</style>