<template>
  <div id="app" class="layout">
    <div class="header"><Head/></div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Head from '@/components/header'

export default {
  name: 'app',
  components: {
    Head
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
.header {
  background: rgb(245, 245, 245);
  padding: 0px;
  border-bottom: 1px solid rgb(230, 231, 236);
  /* height: 6vh; */
  min-height: 64px;
  max-height: 64px;
}
</style>
