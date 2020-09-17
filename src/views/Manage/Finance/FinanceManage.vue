<template>
  <div class="add-staff">
    <div class="title">
      <div class="title-name">财务管理</div>
    </div>
    <div id="calender">
      <div class="txt-c p-10">
        <span @click="prev"> ⬅️ </span>
        <input type="text" v-model="year">年
        <input type="text" v-model="month" class="month">月
        <span @click="next"> ➡️️️️ </span>
      </div>
      <div class="weekDay flex jc-sb p-5 day">
        <p v-for="item in weekList" :key="item.id">{{item}}</p>
      </div>
      <div class="weekDay flex p-5 day">
        <p v-for="item in spaceDay" :key="item.id"></p>
        <p v-for="(item,idx) in (monthDay[this.month-1] || 30)" @click="setDay(idx)" :class="idx==activeDay?'active':''"
           :key="item.id">{{item}}</p>
      </div>
    </div>
    <div class="list-container">
      <div class="search-box">
        <div class="input-sty">
          <i class="iconfont icon-sousuo"></i>
          <input type="text" v-model="searchValue" placeholder="跟单人编号/跟单人"/>
        </div>
        <div class="btn-search" @click="search">查询</div>
      </div>
    </div>
  </div>
</template>

<script>
  import TopHead from '../../../components/TopHead/TopHead.vue'
  import QuickPager from '../../../components/QuickPager/QuickPager.vue'
  import {OPEN_TIP_OPERATE_BOX, OPEN_TOAST} from '../../../store/constants/home'


  export default {
    name: 'StaffFinance',
    components: {TopHead, QuickPager},
    data() {
      return {
        year: '', // 年份
        month: '', // 月份
        day: '', // 天数
        current: '', // 当前时间
        weekList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        monthDay: [31, '', 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        activeDay: '', // 选中的日期
        spaceDay: '', // 每个月第一天是星期几
        February: '' // 判断2月份的天数
      }
    },
    created() {
      this.current = new Date()
      this.getTheCurrentDate()
      this.getMonthFisrtDay()
      this.February = this.isLeapYear(this.year) ? 28 : 29
      this.monthDay.splice(1, 1, this.February)
    },
    watch: {
      month() {
        if (this.month > 12 || this.month < 1) {
          console.log('请输入正确月份')
          return
        }
        this.getMonthFisrtDay()
      },
      year() {
        this.getMonthFisrtDay()
      }
    },
    methods: {
      // 判断是否是闰年
      isLeapYear(year) {
        return year % 4 == 0
      },
      // 选取特定天数
      setDay(idx) {
        this.activeDay = idx
        this.day = idx + 1
        console.log('选择的日期是' + this.year + ' ' + this.month + ' ' + this.day)
      },
      // 判断月份的第一天是星期几
      getMonthFisrtDay() {
        var firstDayOfCurrentMonth = new Date(this.year, this.month - 1, 1) // 某年某月的第一天
        if (firstDayOfCurrentMonth.getDay() == 0) {
          this.spaceDay = 6
        } else {
          this.spaceDay = firstDayOfCurrentMonth.getDay() - 1
        }
      },
      // 获取当前的日期
      getTheCurrentDate() {
        this.year = this.current.getFullYear()
        this.month = this.current.getMonth() + 1
        this.day = this.current.getDate()
      },
      prev() {
        if (this.month == 1) {
          this.year--
          this.month = 12
        } else {
          this.month--
        }
        this.activeDay = 0
        this.getMonthFisrtDay()
      },
      next() {
        if (this.month == 12) {
          this.year++
          this.month = 1
        } else {
          this.month++
        }
        this.activeDay = 0
        this.getMonthFisrtDay()
      }
    }
  }
</script>

<style module lang="stylus" scoped>
  .add-staff
    width 100%

  .title
    background-color #fff
    padding 0 20px
    height 60px
    border-radius 5px
    display flex
    align-items center
    justify-content space-between


  .title-name
    font-size 18px
    font-weight bold

  .search-box
    display flex
    align-items center


  .input-sty
    width 280px
    display flex
    height 40px
    align-items center
    border 1px solid #f0f0f0
    border-radius 5px
    margin-right 20px
    padding 0 10px

    i
      color #d7d7d7

    input
      outline none
      border none
      font-size 16px

  .btn-search
    height 40px
    background-color mediumseagreen
    color #fff
    width 80px
    text-align center
    line-height 40px
    font-size 16px
    border-radius 5px
    cursor pointer
    font-weight 200


  .list-container
    margin-top 20px
    background-color #fff
    border-radius 5px

  .list-title
    height 50px
    display flex
    line-height 50px
    background-color #f0f4f6
    font-weight bold
    font-size 14px

  .list-content
    height 560px
    overflow-y auto
    font-size 14px

    &::-webkit-scrollbar
      display none

  .list-item
    display flex
    min-height 45px
    /*line-height 45px*/
    align-items center
    border-bottom 1px solid #f0f0f0

    > div
      word-break break-all
      overflow hidden
      text-overflow ellipsis
      white-space nowrap

    &:hover
      background-color #edf6f6


  .padL10
    padding-left 10px

  .delete-btn
    display inline-block
    width 50px
    height 30px
    color #3cb371
    text-align center
    line-height 30px
    border 1px solid #3cb371
    border-radius 5px
    margin auto 0
    cursor pointer

  .text-flow
    word-break break-all
    overflow hidden
    text-overflow ellipsis
    white-space nowrap

  .goods-item
    height 25px
    line-height 25px
    width 100%

  #calender {
    .txt-c {
      text-align: center;
    }

    .p-10 {
      padding: 2rem;
    }

    .p-5 {
      padding: 1rem;
    }

    .flex {
      display: flex;
    }

    .jc-sb {
      justify-content: space-between;
    }

    input {
      width: 50px;

      &.month {
        width: 30px;
      }
    }

    .day {
      flex-wrap: wrap;

      p {
        width: 14.28%;
        /*flex: 0 0 0 ;*/
        text-align: center;
        line-height: 2.4rem;
        height: 2.4rem;
        position: relative;
        z-index: 100;

        &.active {
          color: #fff;
        }

        &.active:before {
          content: '';
          height: 2.5rem;
          width: 2.5rem;
          position: absolute;
          z-index: -1;
          left: 0;
          top: 0;
          transform: translateX(50%);
          border-radius: 50%;
          background: #e97163;
          color: #fff;
        }
      }
    }
  }
</style>