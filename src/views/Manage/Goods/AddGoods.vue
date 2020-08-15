<template>
    <div class="add-staff">
        <top-head :title="'新增商品'"></top-head>
        <div class="base-info">
            <div class="title">商品基本信息</div>
            <div class="item">
                <left-head class="margin-20" :left-title="'商品名称'" :necessary="true"></left-head>
                <input placeholder="请输入商品名称" v-model="goodsName"/>
                <span class="error-tip">{{errorTips[0]}}</span>
            </div>
            <div class="item">
                <left-head class="margin-20" :left-title="'商品价格'" :necessary="false"></left-head>
                <input placeholder="请输入商品价格,非必填" v-model="goodsPrice"/>
            </div>
            <div class="item">
                <left-head class="margin-20" :left-title="'商品规格'" :necessary="false"></left-head>
                <input placeholder="请输入商品规格,非必填" v-model="goodsSpe"/>
            </div>
            <div class="item2">
                <left-head class="margin-20" :left-title="'商品备注'" :necessary="false"></left-head>
                <textarea placeholder="请输入商品备注，非必填(限200字)" maxlength="200" v-model="remark" />
            </div>
            <footer-btn @goBack="goBack" @save="save"></footer-btn>
        </div>
    </div>
</template>


<script>
    import LeftHead from '../../../components/LeftHead/LeftHead.vue';
    import TopHead from '../../../components/TopHead/TopHead.vue';
    import FooterBtn from '../../../components/FooterBtn/FooterBtn.vue';
    import {OPEN_TOAST} from '../../../store/constants/home';

    export default {
        name:'AddGoods',
        components: {LeftHead, TopHead, FooterBtn},
        data(){
            return{
                //goodsId: this.$route.params.goodsId,没用到
                goodsName:'',
                goodsPrice:'',
                goodsSpe:'',
                remark:'',
                saveFlag: '',
                errorTips: []
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            save(){
                this.saveFlag=true
                this.validateInfo()
                if (!this.saveFlag) return

                this.$http.post('/GoodsController/addGoods', {
                    goodsName : this.goodsName,
                    goodsPrice : +this.goodsPrice,
                    goodsSpe : this.goodsSpe,
                    remark : this.remark
                }).then(res =>{
                    const data = res.data
                    this.$store.commit(OPEN_TOAST,data.message)
                    if (data.code === 0 ){
                        setTimeout( ()=>{
                            this.$router.push('goods-list')
                        },2100)
                    }
                })
            },
            validateInfo() {
                if (!this.goodsName) {
                    this.$set(this.errorTips, 0, '商品名称不能为空')
                    this.saveFlag = false
                } else {
                    this.$set(this.errorTips, 0, '')
                    this.saveFlag = true
                }
                this.$forceUpdate
            }
        }
    }
</script>

<style module lang="stylus">
    .add-staff
    width 100%

    .base-info
        padding 20px
        margin-top 20px
        background-color #fff
        border-radius 5px

    .title
        height 50px
        line-height 50px
        font-size 16px
        font-weight bold

    .margin-20
        margin-right 20px

    .item
        display flex
        align-items center
        margin-bottom 20px

    input
        height 40px
        padding-left 10px
        width 300px

    .item2
        display flex
        margin-bottom 20px

        textarea
            width 85.3%
            height 80px
            padding 10px
            outline none
            font-size 16px

    .length3
        width 85.2%

</style>