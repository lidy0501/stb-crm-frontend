<template>
  <div class="login-container">
    <div class="login-body">
      <div class="core">
        <div class="first-layer">
          <img :src="logoUrl2" alt="">
          <div>欢迎登录</div>
        </div>
        <div class="second-layer">
          <div class="left-sec">
            <img v-bind:src="logoUrl">
          </div>
          <div class="right-sec">
            <div class="login-tip">请输入登录信息</div>
            <div class="login-info">
              <div class="account">
                <div class="icon-box">
                  <i class="iconfont icon-zhanghao"></i>
                </div>
                <input type="text" placeholder="请输入账号" v-model.trim="staffCode" @focus="clearTip">
              </div>

              <div class="password">
                <div class="icon-box">
                  <i class="iconfont icon-mima"></i>
                </div>
                <input type="password" placeholder="请输入密码" v-model.trim="password" @focus="clearTip">
              </div>
            </div>
            <div class="error-tip">{{errorTip}}</div>
            <div class="login-btn" @click="login">登录</div>
          </div>
        </div>


      </div>

    </div>
    <div class="footer-box">
      <div>江苏奥功电能科技有限公司 www.ag-elec.com | 皖ICP备20013711号</div>
      <div>南京慧软将略信息技术有限公司，为平台提供技术支持。</div>
    </div>
   </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import logoUrl from './logo.jpg'
  import logoUrl2 from './logo2.png'

  export default {
    name: 'Login',
    data() {
      return {
        staffCode: '',
        password: '',
        errorTip: '',
        logoUrl: logoUrl,
        logoUrl2: logoUrl2,
        screenWidth: ''
      }
    },
    component: {
      ...mapGetters(['staff']),
      screenWidth () {
        return document.body.clientWidth + 'px'
      }
    },
    created() {
      console.log(process.env.NODE_ENV)
      this.$nextTick(() => {
        this.screenWidth = document.body.clientWidth + 'px'
      } )
      console.log('width ====' + document.body.clientWidth)

    },
    methods: {
      ...mapMutations(['SET_STAFF', 'SET_STAFF_NAME', 'SET_TOKEN']),
      clearTip() {
        this.errorTip = ''
      },
      login() {
        if (!this.staffCode || !this.password) {
          this.errorTip = !this.staffCode ? '账号不能为空' : '密码不能为空'
          return
        } else {
          this.errorTip = ''
        }
        const _this = this
        const {staffCode, password} = this
        // if (staffCode !== 'A000') return // todo 记得放开
        this.$http.post('/LoginController/login', {staffCode, password}).then(res => {
          _this.$glo_loading.loadingHide()
          // const token = res.headers['authorization']
          // _this.$store.commit('SET_TOKEN', token)
          if (res.data.code === 0) {
            const staff = res.data.data
            /**
             * 先做缓存，在做跳转，否则beforeEach里跳转前拿到的staff为null,就没法跳转了
             */
            _this.SET_STAFF(staff)
            //_this.$store.commit('SET_STAFF', staff)
            /**
             * 或者用 window.sessionStorage.setItem('staff', JSON.stringify(staff))
             * 等同于_this.$store.commit('SET_STAFF', staff)
             */

            _this.SET_STAFF_NAME(staff.staffName)
            _this.SET_TOKEN(staff.staffId)
            _this.$router.replace('manage')
          } else {
            _this.errorTip = res.data.message
          }
        })
      }
    },
  }
</script>

<style scoped lang="stylus">
  .login-container
    display block
    height 100%
    font-size 16px

  .login-body
    width 100%
    //height 100%
    /*background-image url('../../assets/images/bg_login.jpg')*/
    /*background-attachment fixed*/
    /*background-repeat no-repeat*/
    /*background-position center center*/
    /*background-size cover*/
    display flex

  .core
    margin 0 auto

  .first-layer
    display flex
    margin-top 20px

    > img
      margin-left 50px
      width 200px

    > div
      font-size 18px
      margin-left 10px
      display flex
      flex-direction column
      justify-content flex-end

  .second-layer
    margin-top 20px
    display flex
    background rgba(0, 0, 0, 0.02)
    padding 20px 10px 20px 10px
    border-radius 20px

  .left-sec
    /*width 50%*/
    /*padding-left 10%*/

  .right-sec
    background-color #fff
    width 400px
    height 480px
    border 1px solid #e5e5e5
    border-top-left-radius 10px
    border-bottom-left-radius 10px
    // box-shadow 5px 5px 5px #666
    margin-left 20px

  .login-tip
    margin-top 20px
    text-align center
    height 80px
    line-height 80px
    font-weight bold
    font-size 20px

  .login-info

    >div
      width 300px
      margin 20px auto
      border 1px solid #d7d7d7
      border-radius 5px
      height 44px
      font-size 16px
      display flex
      align-items center


      .icon-box
        width 30px
        font-size 20px
        color #e6e6e6
        margin-left 10px

      input
        outline none
        border none
        width 200px
        height 20px

  .password
    margin-bottom 0 !important

  .error-tip
    color #f00
    width 300px
    height 40px
    line-height 40px
    margin 0 auto
    font-size 12px

  .login-btn
    height 44px
    width 300px
    margin 20px auto
    background-color #1e90ff
    color #fff
    line-height 44px
    text-align center
    border-radius 5px
    cursor pointer

  .footer-box
    margin-top 20px
    border-top 1px solid gray
    position relative
    padding-top 20px

    > div
      &:nth-child(1)
        text-align center

      &:nth-child(2)
        text-align center


</style>