<template>
  <div class="staff-box">
    <div class="core-container">
      <div class="box-title">
        <span>选择员工</span>
        <span @click="cancel">X</span>
      </div>

      <div class="list-content">
        <div class="staff-item" v-for="(item, index) in staffList" @click="staff = item" :key="index">
          <i class="iconfont icon-danxuanxuanzhong selected" v-if="staff === item"></i>
          <i class="iconfont icon-danxuanweixuanzhong no-selected" v-else></i>
          <span>{{item.staffName}}</span>
        </div>
      </div>

      <div class="footer">
        <span class="btn-default" @click="cancel">取消</span>
        <span class="btn-primary" @click="confirm">确定</span>
      </div>

    </div>
  </div>
</template>

<script>
  import {OPEN_TIP_OPERATE_BOX, OPEN_TOAST} from '../../../../store/constants/home'

  export default {
    name: 'StaffBox',
    props: {
      staffList: Array
    },
    data() {
      return {
        staff: null
      }
    },
    methods: {
      cancel() {
        this.staffId = ''
        this.$emit('cancel')
      },
      confirm() {
        if (!this.staff) {
          return
        }
        this.$store.commit(OPEN_TIP_OPERATE_BOX, {
          tipText: '确定要将该客户分配给' + this.staff.staffName + '吗？',
          sureCallback: () => {
            this.$emit('confirm', this.staff.staffId)
          }
        })
      }
    }
  }
</script>

<style scoped module lang="stylus">

  .staff-box
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    z-index 100
    background rgba(0, 0, 0, .3)
    display flex
    align-items center
    justify-content center

  .core-container
    background-color #fff
    width 400px
    height 500px
    border-radius 8px
    position relative

  .box-title
    font-size 16px
    font-weight bold
    height 50px
    padding 0 20px
    display flex
    justify-content space-between
    align-items center
    border-bottom 1px solid #ddd

  .list-content
    height 380px
    overflow-y scroll

  .staff-item
    height 30px
    line-height 30px
    padding 0 20px
    border-bottom 1px solid #f0f0f0

    &:hover
      background-color #edf6f6

    > i
      margin-right 10px

  .no-selected
    color #ccc

  .selected
    color dodgerblue

  .footer
    width 100%
    position absolute
    bottom 0
    display flex
    align-items center
    justify-content center

    > span
      width 80px
      height 30px
      text-align center
      line-height 30px
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