<template>
  <div class="head">
    <div class="logo">
      <a href="javascript:;">
        <img src="../assets/微云.png">
        <span>微云</span>
      </a>
    </div>
    <div class="user">
      <Dropdown style="margin-left: 20px;" placement="bottom-end">
        <a href="javascript:void(0)">
          <span class="user-name">summer</span>
          <Icon type="arrow-down-b"></Icon>
        </a>
        <DropdownMenu slot="list" style="width: 250px;">
            <DropdownItem class="list-item active" disabled>
              <div>
                <img src="../assets/vip.png" class="vip">
                超级会员专享4T容量
                <button type="text" class="open">开通</button>
              </div>
            </DropdownItem>
            <DropdownItem class="list-item">开启每日极速上传</DropdownItem>
            <DropdownItem class="list-item">帮组与反馈</DropdownItem>
            <DropdownItem class="list-item">安全与隐私</DropdownItem>
            <DropdownItem class="list-item">退出登录</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import { Dropdown, DropdownMenu, DropdownItem, Icon } from 'iview'

export default {
  name: 'navBar',
  components: {
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Icon
  }
}
</script>

<style scoped>
.head {
  width: 100%;
  height: 64px;
  background-color: #F5F5F5;
}
.logo {
  width: 150px;
  height: 100%;
  margin-left: 50px;
  float: left;
}
.logo a {
  font-size: 20px;
  font-weight: bold;
  color: #000;
  line-height: 60px;
}
.logo a img {
  width: 60px;
  height: 60px;
  margin: 0 10px 0 5px;
}

.logo a span {
  vertical-align: top;
}
.user {
  float: right;
  margin: 20px 50px;
}
.head .list-item {
  font-size: 18px;
  color: #000;
  line-height: 25px;
  font-weight: bold;
}
.head .list-item.active {
  color: #777;
}
.open {
  width: 30px;
  height: 20px;
  line-height: 20px;
  background-color: #00BCD4;
  border-radius: 2px;
  border: none;
  color: #fff;
  margin-left: 8px;
}
.user-name {
  color: rgb(0, 0, 0);
  margin: 0px 10px;
  font-size: 14px
}
.vip {
  height: 15px;
  margin-bottom: -3px;
}
</style>

