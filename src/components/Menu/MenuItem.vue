<template>
  <div class="menu-box">
    <div class="first-level" @click="right.show = !right.show">
      <span>{{right.rightName}}</span>
      <i :class="['iconfont', 'icon-zhankai', !right.show ? 'rotate-180' : '']"></i>
    </div>
    <div v-if="right.show" v-for="(item, index) in right.menus" :key="index" class="second-level" @click="$router.push(item.menuUrl)">
      {{item.menuName}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MenuItem',
    props: {
      right: Object
    },
    methods: {
    }
  }
</script>

<style scoped lang="stylus">
  .menu-box
    font-size 16px
    color #fff

  .iconfont
    transition transform .5s ease

  .first-level
    display flex
    justify-content space-between
    height 40px
    align-items center
    padding 0 20px


    &:hover
      color #dcdcdc
      background-color rgba(#dcdcdc, 0.09)

  .rotate-180
    transform rotateX(180deg)


  .second-level
    padding-left 40px
    height 40px
    line-height 40px

    &:hover
      background-color rgba(#fff8dc, 0.09)

</style>