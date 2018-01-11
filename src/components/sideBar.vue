<template>
  <div class="sider-bar-container">
    <div class="avater">
      <a href="javascript:;" class="head">
        <img src="../assets/head.png" style="width: 100%; height: 100%;">
      </a>
      <button type="text" class="open-a">开通</button>
      <div class="bottom-line"></div>
    </div>
    <Menu active-name="folder" class="sideBar" @on-select="selectHandle">
      <MenuItem name="folder" style="font-size: 15px;font-weight: 500;">
        <Icon type="social-buffer" style="font-size: 22px;margin: 0px 19px 0px 20px;"></Icon>
        全部
      </MenuItem>
      <MenuItem name="文档" style="font-size: 15px;font-weight: 500;">
        <Icon type="document-text" style="font-size: 22px;margin: 0px 23px 0px 20px;"></Icon>
        文档
      </MenuItem>
      <MenuItem name="图片" style="font-size: 15px;font-weight: 500;">
        <Icon type="image" style="font-size: 20px;margin: 0px 19px 0px 20px;"></Icon>
        图片
      </MenuItem>
      <MenuItem name="视频" style="font-size: 15px;font-weight: 500;">
        <Icon type="social-youtube" style="font-size: 20px;margin: 0px 16px 0px 20px;"></Icon>
        视频
      </MenuItem>
      <MenuItem name="音乐" style="font-size: 15px;font-weight: 500;">
        <Icon type="music-note" style="font-size: 20px;margin: 0px 20px;"></Icon>
        音乐
      </MenuItem>
      <MenuItem name="share" style="font-size: 15px;font-weight: 500;" disabled>
        <Icon type="share" style="font-size: 22px; margin: 0px 17px 0px 20px;"></Icon>
        分享链接
      </MenuItem>
      <MenuItem name="trash" style="font-size: 15px;font-weight: 500;" disabled>
        <Icon type="trash-a" style="font-size: 22px;margin: 0px 18px 0px 20px;"></Icon>
        回收站
      </MenuItem>
    </Menu>
    <div style="width: 80%;margin: 10px 0 40px 20px;font-weight: 500;color: #020202;">
      <Progress :percent="20" hide-info></Progress>
      <p>容量：2G / 10G</p>
    </div>
  </div>
</template>

<script>
  import { Menu, MenuItem, Icon, Progress } from 'iview'

  export default {
    components: {
      Menu,
      MenuItem,
      Icon,
      Progress
    },
    methods: {
      selectHandle (name) {
        this.$store.commit('changeMenu', {type: name})
        this.$store.commit('changeCurrentListId', {id: 0})
        this.$store.commit('changeCheckedAll', {checkAll: false})
        this.$store.commit('changeCurrentListBuffer')
      }
    }
  }
</script>

<style scoped>
.sider-bar-container {
  border-right: 1px solid #dddee1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: 100%;
}
.avater {
  width: 100%;
  height: 30%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-height: 200px;
}
.head {
  display: block;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 40px;
}
.bottom-line {
  width: 80%;
  height: 1px;
  background-color: #E8EAEB;
  margin-left: 20px;
}
.sideBar {
  width: 240px;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-right: none;
  /* background-color: bisque; */
}
.menu-item {
  font-size: 15px;
}
.open-a {
  width: 70px;
  height: 30px;
  margin: 30px 40px;
  border-radius: 2px;
  border: 1px solid #1296db;
  color: #1296db;
  font-weight: 500;
}

.ivu-menu-vertical.ivu-menu-light:after {
  content: '';
  display: block;
  width: 0;
  height: 100%;
  background: #dddee1;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
}
</style>

