<template>
  <div class="quick-pager">
    <div class="quick-pager-content">
      <span class="quick-pager-info"> 共{{page.totalRows}}条,{{page.totalPages}}页 </span>
      <ol class="">
        <li @click="gotoPage(1, isFirstPage)" :class="isFirstPage ? 'isValidIcon' : ''">
          <i class="iconfont icon icon-shouye"></i>
        </li>

        <li @click="gotoPage(page.currentPage - 1, isFirstPage)" :class="isFirstPage ? 'isValidIcon' : ''">
          <i class="iconfont icon icon-arrow-left"></i>
        </li>

        <li v-for="pager in getNumbers" @click="gotoPage(pager, isCurrentPage(pager))">
          {{pager}}
        </li>

        <li @click="gotoPage(page.currentPage + 1, isLastPage)" :class="isLastPage ? 'isValidIcon' : ''">
          <i class="iconfont icon icon-arrow-right"></i>
        </li>

        <li @click="gotoPage(page.totalPages, isLastPage)" :class="isLastPage ? 'isValidIcon' : ''">
          <i class="iconfont icon icon-weiye"></i>
        </li>
      </ol>
    </div>
    <div style="clear: both"></div>
  </div>



</template>


<script>

  export default {
    data() {
      return {
        operation: {}
      }
    },
    props: {
      page: {
        required: true
      }
    },
    computed: {
      getNumbers() {
        if (this.page.totalPages <= 5) {
          return this.page.totalPages
        } else {
          if (this.page.currentPage <= 3) {
            return 5
          } else {
            if (this.page.totalPages - this.page.currentPage <= 2) {
              return [this.page.totalPages - 4, this.page.totalPages - 3, this.page.totalPages - 2, this.page.totalPages - 1, this.page.totalPages]
            } else {
              return [this.page.currentPage - 2, this.page.currentPage - 1, this.page.currentPage, this.page.currentPage + 1, this.page.currentPage + 2]
            }
          }
        }
      },
      isFirstPage() {
        return this.page.currentPage === 1
      },
      isLastPage() {
        return this.page.currentPage === this.page.totalPages
      }
    },
    methods: {
      isCurrentPage(page) {
        return this.page.currentPage === page
      },
      gotoPage(toPage, tag) {
        if (tag) {
          return
        }
        var startIndex = ((toPage - 1) < 0 ? 0 : (toPage > this.page.totalPages ? this.page.totalPages - 1 : (toPage - 1))) * this.page.pageRows
        this.$emit('QuickPager', {'startIndex': startIndex, 'pageRows': this.page.pageRows, 'currentPage': toPage})
      }
    }
  }
</script>

<style lang="stylus" module>
  .quick-pager
    padding 8px 20px
    background-color #fff

    .quick-pager-content
      float right
      color #5e5e5e
      ol
        float: left
        list-style none
        li
          float left
          cursor pointer
          height 23px
          line-height 23px
          padding 0 8px
          margin-left 5px
          text-align center
        .is-current-page
          background-color #1587cd
          color #fff
        .is-valid-icon
          cursor not-allowed
        .icon
          font-size 12px
          color #777777
    .quick-pager-content .is-valid-icon i
      color #cdcdcd
    .quick-pager-info
      display inline-block
      height 24px
      float left
      margin-right 15px
      line-height 24px
</style>