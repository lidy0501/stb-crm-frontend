<template>
  <div class="container">
    <div>
      <h3 class="title">系统操作手册</h3>
    </div>
    <div class="introduction-content">
      <li class="ali">1.员工管理</li>
      <div class="sub-text">
        1.1 员工列表:展示所有员工.<br/>
        1.1.1 删除:删除某一个员工.<br/>
        1.1.2 编辑:重新编辑某一个员工的基本信息和权限.<br/>
        1.2 新增员工:填写员工基本信息,员工账号和密码为系统登录名和密码,各类权限可以在新增时是赋予.<br/>
      </div>
      <li class="ali">2.客户管理</li>
      <div class="sub-text">
        2.1 公司客户:该列表为每一个员工的私有客户.<br/>
        2.1.1 详情:查看该客户的详细信息.<br/>
        2.1.2 删除:删除某一个客户.<br/>
        2.1.3 公有化:是将某一个客户移动到"公海客户"列表,公有化的条件由各公司约束.<br/>
        2.2 公海客户:该列表为公共区域,所有具有客户管理模块权限的用户都可以在此区域查看客户.<br/>
        2.2.1 详情:查看该客户的详细信息.<br/>
        2.2.2 认领:每一个用户都可以认领公海客户为自己的客户,即把客户从公海客户迁移到公司客户列表中.<br/>
        2.2.3 分配:可以通过该按钮指定客户为某一员工继续跟进.<br/>
        2.2.4 删除:删除某一个客户.<br/>
        2.3 新增客户:输入客户的详细信息新增为私有客户.<br/>
      </div>
      <li class="ali">3.订单管理</li>
      <div class="sub-text">
        3.1 订单列表:显示用户创建的所有订单.<br/>
        3.1.1 完成:当订单交易进度为100%时,需改变订单状态为完成状态.<br/>
        3.1.2 查看:当订单状态为完成状态时查看当前订单详细信息,当订单状态为未完成状态时可以编辑该订单<br/>
        3.1.3 删除:删除某一个订单.<br/>
        3.2 新增订单:输入订单的详细信息新增为订单,同一订单可以添加多个商品.<br/>
      </div>
      <li class="ali">4.商品管理</li>
      <div class="sub-text">
        4.1 商品列表:此列表为公共区域,展示所有商品.<br/>
        4.1.1 删除:删除某一个商品,已经存在订单中的商品无法删除.<br/>
        4.2 新增商品:输入商品的详细信息,选择规格.<br/>
        4.3 SKU设置:该列表为商品规格,可以添加同时添加多个规格,也可以删除某一个规格,已经存在商品中的规格无法删除.<br/>
      </div>
      <li class="ali">5.合同管理</li>
      <div class="sub-text">
        5.1  合同列表:展示所有合同信息.<br/>
        5.1.1 删除:删除指定合同.<br/>
        5.2 新增合同:输入合同的基本信息.<br/>
        5.3 模板下载:提供订单中文合同,出口订单英文合同,中文报价单,英文报价单,出口商业发票模板,出口箱单模板<br/>
      </div>
      <li class="ali">6.财务管理</li>
      <div class="sub-text">
        6.1 财务管理:根据输入的起止时间,用户姓名,获取该用户的在规定时间内所有完成订单,并选择绩效公式来计算该员工绩效,也可以通过订单编码查看该订单的详细信息
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'SystemIntroduction',
  }
</script>

<style scoped module lang="stylus">
  .container
    width 100%

  .title
    background-color #fff
    font-size 18px
    padding-left 20px
    height 60px
    line-height 60px
    font-weight bold
    border-radius 5px

  .introduction-content
    padding 20px
    margin-top 20px
    background-color #fff
    border-radius 5px

  .ali
    font-size 16px
    font-weight bold
    height 30px
    line-height 30px

  .sub-text
    line-height 25px
    font-size 14px
    padding-left 25px


</style>