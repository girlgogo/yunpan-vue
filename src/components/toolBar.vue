<template>
  <div class="toolBar">
    <div>
      <Breadcrumb separator=">">
        <BreadcrumbItem v-for="item in parentList" :key="item.id" to="/">{{item.name}}</BreadcrumbItem>
        <!-- <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
        <BreadcrumbItem>Breadcrumb</BreadcrumbItem> -->
      </Breadcrumb>
    </div>
    <div class="btn-list">
      <ButtonGroup size="large" style="margin-right: 20px" >
        <Button><img src="../assets/list.png" class="btn-img" /></Button>
        <Button type="ghost"><img src="../assets/big.png" class="btn-img" /></Button>
      </ButtonGroup>
      <ButtonGroup size="large" style="margin-right: 20px" >
        <Button><img src="../assets/sort.png" class="btn-img" /></Button>
        <Button type="ghost"><img src="../assets/time.png" class="btn-img" /></Button>
      </ButtonGroup>
      <Button class="new-btn" type="primary" icon="plus-round" size="large">新建文件夹</Button>
    </div>

    <!-- <Col span="7">
      <ButtonGroup size="large">
        <Button type="ghost">删除</Button>
        <Button type="ghost">重命名</Button>
        <Button type="ghost">移动到</Button>
        <Button type="ghost" disabled>下载</Button>
        <Button type="ghost" disabled>分享</Button>
      </ButtonGroup>
    </Col> -->

  </div>
</template>

<script>
import { Col, Button, ButtonGroup, Breadcrumb, BreadcrumbItem } from 'iview'

export default {
  name: 'toolbar',
  components: {
    Col,
    Button,
    ButtonGroup,
    Breadcrumb,
    BreadcrumbItem
  },
  computed: {
    parentList () {
      console.log(this.$store.getters.breakcrumb)
      return this.$store.getters.breakcrumb
    }
  }
}
</script>

<style>
.new-btn {
  background-color: #1296db;
  border: none;
  border-radius: 2px;
  font-size: 16px;
}
.toolBar {
  display: flex;
  justify-content: space-between;
  height: 64px;
  line-height: 64px;
  padding-left: 20px;
}
.btn-list {
  display: flex;
  justify-content: flex-end;
  padding: 13px 45px 14px 0;
}
.btn-img {
  width: 16px;
  margin-bottom: -2px;
}
</style>
