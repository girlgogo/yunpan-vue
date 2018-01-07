<template>
  <div style="border-right: 1px solid #dddee1;display: flex; flex-direction: column; background-color: #fff; height: 100%;">
    <div style="width: 100%; height: 30%; background-color: #fff; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; min-height: 200px;">
      <a href="javascript:;" style="display: block; width: 70px; height: 70px; border-radius: 50%; overflow: hidden; margin-left: 40px;">
        <img src="../assets/head.png" style="width: 100%; height: 100%;">
      </a>
      <button type="text" class="open-a">开通</button>
      <div style="width: 80%; height: 1px;  background-color: #E8EAEB; margin-left: 20px;"></div>
    </div>
    <Menu active-name="1" class="sideBar">
      <!-- <MenuItem name="0" style="font-size: 15px; height: 100px;" disabled> -->
        <!-- <Avatar size="large" icon="person" style="background-color: rgb(136, 20, 127)"/> -->
      <!-- </MenuItem> -->
      <MenuItem name="1" style="font-size: 15px;">
        <Icon type="social-buffer" style="font-size: 22px;margin: 0px 19px 0px 20px;"></Icon>
        全部
      </MenuItem>
      <MenuItem name="2" style="font-size: 15px;">
        <Icon type="document-text" style="font-size: 22px;margin: 0px 23px 0px 20px;"></Icon>
        文档
      </MenuItem>
      <MenuItem name="3" style="font-size: 15px;">
        <Icon type="image" style="font-size: 20px;margin: 0px 19px 0px 20px;"></Icon>
        图片
      </MenuItem>
      <MenuItem name="4" style="font-size: 15px;">
        <Icon type="social-youtube" style="font-size: 20px;margin: 0px 16px 0px 20px;"></Icon>
        视频
      </MenuItem>
      <MenuItem name="5" style="font-size: 15px;">
        <Icon type="music-note" style="font-size: 20px;margin: 0px 20px;"></Icon>
        音乐
      </MenuItem>
      <MenuItem name="6" style="font-size: 15px;">
        <Icon type="share" style="font-size: 22px; margin: 0px 17px 0px 20px;"></Icon>
        视频
      </MenuItem>
      <MenuItem name="7" style="font-size: 15px;">
        <Icon type="trash-a" style="font-size: 22px;margin: 0px 18px 0px 20px;"></Icon>
        音乐
      </MenuItem>
    </Menu>
    <div style="width: 80%;margin: 10px 0 40px 20px;">
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
    }
  }
</script>

<style scoped>
.sideBar {
  width: 240px;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-right: none;
  /* background-color: bisque; */
}
.open-a {
  width: 70px;
  height: 30px;
  margin: 30px 40px;
  border-radius: 2px;
  border: 1px solid #1296db;
  color: #1296db;
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

