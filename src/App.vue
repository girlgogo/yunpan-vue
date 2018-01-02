<template>
  <div id="app" class="layout">
    <div>
      <Header class="header"><Head/></Header>
      <div class="content">
        <div style="display: flex;width: 100%;justify-content: space-between;">
          <div>
            <side-bar/>
          </div>
          <div style="flex: 1;background: #fff;">
            <tool-bar/>
            <div class="checkAll">
              <Checkbox size="large">全选</Checkbox>
              <span>已选中0个文件/文件夹</span>
            </div>
            <Container/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToolBar from './components/toolBar'
import SideBar from './components/sideBar'
import Container from './components/container'
import Head from './components/header'
import { Layout, Header, Row, Checkbox } from 'iview'

export default {
  name: 'app',
  components: {
    Layout,
    Header,
    ToolBar,
    SideBar,
    Container,
    Head,
    Row,
    Checkbox
  }
}
</script>

<style>
body {
  font: 14px/1.5 -apple-system,BlinkSystemFont,"Segoe UI",Roboto,Ubuntu,"Helvetica Neue",Helevetica,Arial,"PingFang SC","Hiragino Sans GB","Microsoft YaHei UI","Microsoft YaHei","Source Han Sans CN",sans-serif;
  -webkit-font-smoothing: subpixel-antialiased;
  color: #020202;
  outline: 0;
}
.layout {
  background: #f5f7f9;
  overflow: hidden;
  min-width: 950px;
  /* position: relative; */
}
.checkAll {
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
}
/* .content {
  min-width: 950px;
  width: 100%;
  position: absolute;
  top: 64px;
  bottom: 0px;
  left: 0px;
} */
</style>
