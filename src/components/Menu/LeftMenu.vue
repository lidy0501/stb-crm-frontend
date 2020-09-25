<template>
  <div class="left-menu">
    <div class="content">
      <div class="first-sec">CRM 管理系统</div>
      <div class="second-sec">
        <span>欢迎 {{staffName}}</span>
        <i class="iconfont icon-tuichu" @click="loginOut"></i>
      </div>
      <div class="user-introduce" @click="$router.push('/system-introduction')">使用说明</div>
      <div class="third-sec">
        <div v-for="(item, index) in rightList" :key="index">
          <MenuItem :right="item"></MenuItem>
        </div>
      </div>
      <div class="fourth-sec">
        <p>南京慧软将略信息技术有限公司</p>
        <p>提供技术支持</p>
      </div>
    </div>
  </div>
</template>

<script>
  import MenuItem from './MenuItem.vue'
  import {OPEN_TIP_OPERATE_BOX} from '../../store/constants/home'
  import {mapMutations} from 'vuex'

  export default {
    name: 'LeftMenu',
    components: {
      MenuItem
    },
    data() {
      return {
        rightList: [],
        staffName: window.localStorage.getItem('staffName')
      }
    },
    mounted() {
      this.getLeftRight()
    },
    methods: {
      ...mapMutations(['REMOVE_INFO']),
      getLeftRight() {
        this.$http.post('/LoginController/getRight').then(res => {
          this.rightList = res.data
          this.$glo_loading.loadingHide()
        })
      },
      loginOut() {
        const _this = this
        _this.$store.commit(OPEN_TIP_OPERATE_BOX, {
          tipText: '确定要退出吗？',
          sureCallback: () => {
            _this.$http.post('/LoginController/loginOut').then(res => {
              const data = res.data
              if (data.code === 0) {
                // window.sessionStorage.clear() // 清楚session
                // window.localStorage.clear()
                _this.REMOVE_INFO()
                this.$glo_loading.loadingHide()
                _this.$router.replace('/login')
              }
            })
          }
        })
      }
    },
  }
</script>

<style scoped lang="stylus">
  .left-menu
    width 200px
    height 100%
    background-color #008b8b
    user-select none
    position relative

  .first-sec
    color #fff
    height 50px
    line-height 50px
    text-align center
    font-size 20px
    font-weight bold

  .user-introduce
    color #fff
    padding-left 20px
    cursor pointer
    height 40px
    line-height 40px

    &:hover
      color #dcdcdc
      background-color rgba(#dcdcdc, 0.09)

  .second-sec
    color #fff
    height 50px
    line-height 50px
    font-size 16px
    display flex
    justify-content space-between
    padding 0 10px

    > i
      cursor pointer
      font-size 20px

  .fourth-sec
    position absolute
    bottom 50px
    color #fff
    font-size 10px
    width 100%

    p
      text-align center


</style>