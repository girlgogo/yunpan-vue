<template>
  <div id="app" class="layout">
    <div class="header"><Htag/></div>
    <div class="content">
      <div style="display: flex;width: 100%; height: 100%;">
        <div style="height: 100%;">
          <side-bar/>
        </div>
        <div style="flex: 1; background: #fff; display: flex; flex-direction: column;">
          <tool-bar/>
          <div class="checkAll">
            <Checkbox size="large" :value="checkAll" @on-change="checkAllHandle">全选</Checkbox>
            <span>已选中{{checkedLen}}个文件/文件夹</span>
          </div>
          <Container/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToolBar from '@/components/toolBar'
import SideBar from '@/components/sideBar'
import Htag from '@/components/header'
import Container from '@/components/container'
import { Layout, Header, Row, Checkbox } from 'iview'

export default {
  name: 'app',
  components: {
    Layout,
    Header,
    Container,
    ToolBar,
    SideBar,
    Htag,
    Row,
    Checkbox
  },
  computed: {
    checkAll () {
      return this.$store.state.checkAll
    },
    checkedLen () {
      return this.$store.state.checkedBuffer.length
    }
  },
  methods: {
    checkAllHandle () {
      this.$store.commit('changeCheckedAll')
    }
  },
  created () {
    this.$store.commit('changeCurrentListBuffer')
  }
}
</script>

<style>
body {
  font: 14px/1.5 -apple-system,BlinkSystemFont,"Segoe UI",Roboto,Ubuntu,"Helvetica Neue",Helevetica,Arial,"PingFang SC","Hiragino Sans GB","Microsoft YaHei UI","Microsoft YaHei","Source Han Sans CN",sans-serif !important;
  -webkit-font-smoothing: subpixel-antialiased;
  color: #020202;
  outline: 0;
}
.layout {
  background: #f5f7f9;
  overflow: hidden;
  min-width: 950px;
  height: 100vh;
  min-height: 826px;
  font-size: 14px;
}
input {
  outline:none;
}
.checkAll {
  color: #020202;
  text-align: left;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  border-bottom: 1px solid rgb(230, 231, 236);
}
.header {
  background: rgb(245, 245, 245);
  padding: 0px;
  border-bottom: 1px solid rgb(230, 231, 236);
  /* height: 6vh; */
  min-height: 64px;
  max-height: 64px;
}
.content {
  height: 94vh;
  min-height: 650px;
}
</style>
