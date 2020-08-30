<template>
  <div class="drop-down-box" :style="{'width': boxWidth + 'px'}">
    <div class="drop-down-box-view" @click="toggleShow">
      <span :style="{width: textWidth}">{{selectedName}}</span>
      <i :class="['iconfont', 'icon-xiala', isShow ? 'rotate' : '']"></i>
    </div>
    <div class="drop-down-box-drop" v-show="isShow && options.length>0">
      <ul>
        <li v-for="option in options" @click="selectOption(option.code, option.name)" :title="option.name">
          {{option.name}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        selectedName: '',
        secondCategories: [],
        height: 0,
        scrollTop: 0,
        isShow: false
      }
    },
    props: {
      boxWidth: {
        default: 120
      },
      options: {
        required: true
      },
      defaultOption: {
        required: true
      },
      textWidth: {
        required: false
      }
    },
    created: function () {
      this.selectedName = this.defaultOption
      document.addEventListener('click', () => {
        this.isShow = false
      }, true)
    },
    methods: {
      toggleShow() {
        this.isShow = true
      },
      selectOption(code, name) {
        this.isShow = false
        this.selectedName = name
        this.$emit('selectOption', code, this.index)
      }
    },
    watch: {
      options: function (val, oldVal) {
        if (val.length === oldVal.length) {
          return
        }
        if (val !== oldVal) {
          this.selectedName = this.defaultOption
        }
      },
      defaultOption: function (val, oldVal) {
        if (val !== oldVal) {
          this.selectedName = this.defaultOption
        }
      }
    }
  }
</script>
<style lang="stylus" module scoped>
  .drop-down-box
    min-width 30px
    height 40px
    cursor pointer
    color #303030
    position relative
    background-color #ffffff
    border 1px solid #d0d0d0
    border-radius 3px
    .drop-down-box-view
      display inline-flex
      width 100%
      height 40px
      line-height 40px
      border-radius 5px
      color #303030
      span
        font-size 14px
        margin-left 10px
        display inline-block
        /*width: 80px;*/
        overflow hidden
        white-space nowrap
        text-overflow: ellipsis
        line-height: 40px
        vertical-align: top
      i
        color: #b9b9b9
        font-size: 16px
        position: absolute
        right: 15px
        line-height: 40px

        transition transform .3s ease

    .drop-down-box-drop
      border 1px solid #d0d0d0
      position absolute
      top 42px
      width 100%
      z-index 111
      background-color hsla(0, 0%, 100%, 1)
      overflow auto

      ul
        max-height 150px
        border-radius 5px
        li
          height 40px
          line-height 40px
          font-size 14px
          padding-left 10px
          padding-right 10px
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
          &:hover
            background-color #edf6fc

  .rotate
    transform rotate(180deg)
</style>
