<template>
  <div class="left-menu">
    <tip-operate-box v-if="showTip"
                     :tipText="`确定要退出登陆吗？`"
                     @cancel="cancel"
                     @confirm="confirmLoginOut">
    </tip-operate-box>
    <div class="content">
      <div class="first-sec">CRM 管理系统</div>
      <div class="second-sec">
        <span>欢迎 {{staffName}}</span>
        <i class="iconfont icon-tuichu" @click="loginOut"></i>
      </div>
      <div class="third-sec">
        <div v-for="(item, index) in rightList" :key="index">
          <MenuItem :right="item"></MenuItem>
        </div>
      </div>
      <div class="fourth-sec">
        <p>南京短尾熊信息科技有限公司</p>
        <p>提供技术支持</p>
      </div>
    </div>
  </div>
</template>

<script>
  import MenuItem from './MenuItem.vue'
  import TipOperateBox from '../TipOperateBox/TipOperateBox.vue'

  export default {
    name: 'LeftMenu',
    components: {
      TipOperateBox,
      MenuItem
    },
    data() {
      return {
        showTip: false,
        rightList: [],
        staffName: window.localStorage.getItem('staffName')
      }
    },
    mounted() {
      this.getLeftRight()
      this. queryPublicAreaUser()
    },
    methods: {
      getLeftRight() {
        this.$http.post('/LoginController/getRight').then(res => {
          this.rightList = res.data
        })
      },
      loginOut() {
        this.showTip = true
      },
      cancel() {
        this.showTip = false
      },
      confirmLoginOut() {
        this.showTip = false
        window.sessionStorage.clear() // 清楚session
        window.localStorage.clear()
        this.$router.replace('/login')
      },
      queryPublicAreaUser() {
        this.$http('/UserController/queryPublicAreaUser').then(res => {

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

  .second-sec
    color #fff
    height 50px
    line-height 50px
    font-size 16px
    display flex
    justify-content space-between
    padding 0 20px

    > i
      cursor pointer
      font-size 20px

  .fourth-sec
    position absolute
    bottom 10px
    color #fff
    font-size 10px
    width 100%

    p
      text-align center


</style>