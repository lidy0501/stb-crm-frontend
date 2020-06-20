<template>
  <div>
    <main-header></main-header>
    <main-todo></main-todo>
    <main-footer></main-footer>
  </div>
</template>

<script>
  import MainTodo from "./coms/MainTodo.vue";
  import MainHeader from '../../components/MainHeader.vue'
  import MainFooter from '../../components/MainFooter.vue'
  export default {
    name: 'TodoList',
    components: {
      MainHeader,
      MainFooter,
      MainTodo
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.$http.post('/TestController/queryAllTest')
      }
    },
  }
</script>

<style scoped lang="stylus">

</style>
