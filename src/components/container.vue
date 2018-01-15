<template>
  <div class="container" @click.left.self="contextMenuclose" @click.right.prevent="contextMenu1Handle">
    <div v-if="list.length">
      <ul id="thumbnail" v-if="view === 'thumbnail'">
        <li v-for="item in list" :class="['list-item', {'checked': item.checked}]" :key="item.id" @click.right.stop.prevent="contextMenu2Handle($event, item.id)">
          <div class="list-item-content" >
            <Checkbox size="large" class="checkbox" :value="item.checked" @on-change="checkHandle(item.id)"></Checkbox>
            <div @click="into(item.id, item.type)">
              <img src="../assets/folder.png" class="big-image" v-if="item.type === 'folder'">
              <img src="../assets/folder_f.png" class="big-image" v-else-if="item.type === 'folder_f'">
              <img src="../assets/folder_m.png" class="small-image" v-else-if="item.type === 'folder_m'">
              <img src="../assets/zip.png" class="small-image" v-else-if="item.type === 'zip'">
              <img :src="item.src" class="auto-image" v-else-if="item.type === 'image'">
              <img src="../assets/music.png" class="big-image" v-else-if="item.type === 'music'">
              <img src="../assets/video.png" class="small-image" v-else-if="item.type === 'video'">
            </div>
            <span class="folder-name" v-if="!item.edit">{{item.name}}</span>
            <input
              @blur="editDoneBlur(item.id)"
              @keydown.13="editDoneEnter"
              @keydown.esc="cancelEdit"
              type="text"
              ref="editInput"
              v-if="item.edit"
              class="folder-name-edit"
              v-model.trim="newName"
            >
          </div>
        </li>
      </ul>
      <table id="list" v-else>
        <thead>
          <tr>
            <th>&nbsp</th>
            <th>名称</th>
            <th>上次修改时间
              <!-- <i class="icon-arrow-down"></i> -->
            </th>
            <th>大小</th>
          </tr>
        </thead>
        <tbody id="listInfo">
          <tr v-for="item in list" :key="item.id" :class="{'checked': item.checked}" @click.right.stop.prevent="contextMenu2Handle($event, item.id)">
            <td>
              <Checkbox size="large" class="checkbox" :value="item.checked" @on-change="checkHandle(item.id)"></Checkbox>
            </td>
            <td>
              <div class="file-icon" @click="into(item.id, item.type)">
                <img src="../assets/folder.png" class="t-big-image" v-if="item.type === 'folder'">
                <img src="../assets/folder_f.png" class="t-big-image" v-else-if="item.type === 'folder_f'">
                <img src="../assets/folder_m.png" class="t-small-image" v-else-if="item.type === 'folder_m'">
                <img src="../assets/zip.png" class="t-small-image" v-else-if="item.type === 'zip'">
                <img :src="item.src" class="t-auto-image" v-else-if="item.type === 'image'">
                <img src="../assets/music.png" class="t-big-image" v-else-if="item.type === 'music'">
                <img src="../assets/video.png" class="t-small-image" v-else-if="item.type === 'video'">
              </div>
              <div class="file-name">
                <span class="name-text" v-if="!item.edit" :value="item.name">{{item.name}}</span>
                <input
                  @blur="editDoneBlur(item.id)"
                  @keydown.13="editDoneEnter"
                  @keydown.esc="cancelEdit"
                  class="name-input"
                  ref="editInput"
                  v-if="item.edit"
                  type="text"
                  v-model.trim="newName"
                >
              </div>
            </td>
            <td>{{item.time}}</td>
            <td>{{item.size}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="kong" v-else>
      <img src="../assets/暂无消息.png">
      <p>暂无内容哦～</p>
    </div>
    <Menu theme="light" class="contextMenu" :style="{left: contextMenuLeft, top: contextMenuTop}" accordion active-name="2-2" :open-names="['1']" v-if="contextMenu1" @on-select.self="rightHandle1">
      <MenuItem name="1">刷新</MenuItem>
      <Submenu name="2">
        <template slot="title">
          视图
        </template>
        <MenuItem name="2-1">
         <Icon type="checkmark" :color="view === 'list' ? '#0097EB' : 'rgba(255,255,255,0)'"></Icon>
         <span :style="{color: view === 'list' ? '#0097EB' : '#495060'}">列表</span>
        </MenuItem>
        <MenuItem name="2-2">
          <Icon type="checkmark" :color="view === 'thumbnail' ? '#0097EB' : 'rgba(255,255,255,0)'"></Icon>
          <span :style="{color: view === 'thumbnail' ? '#0097EB' : '#495060'}">缩略图</span>
        </MenuItem>
      </Submenu>
      <Submenu name="3">
        <template slot="title">
          排序
        </template>
        <MenuItem name="3-1">
          <Icon type="checkmark" :color="rank === 'name' ? '#0097EB' : 'rgba(255,255,255,0)'"></Icon>
          <span :style="{color: rank === 'name' ? '#0097EB' : '#495060'}">字母</span>
        </MenuItem>
        <MenuItem name="3-2">
          <Icon type="checkmark" :color="rank === 'time' ? '#0097EB' : 'rgba(255,255,255,0)'"></Icon>
          <span :style="{color: rank === 'time' ? '#0097EB' : '#495060'}">时间</span>
        </MenuItem>
      </Submenu>
      <MenuItem name="4">新建文件夹</MenuItem>
    </Menu>
    <Menu theme="light" class="contextMenu" :style="{left: contextMenuLeft, top: contextMenuTop}" v-if="contextMenu2" @on-select.self="rightHandle2">
      <MenuItem name="1" disabled>下载</MenuItem>
      <MenuItem name="2" disabled>分享</MenuItem>
      <MenuItem name="3">移动到</MenuItem>
      <MenuItem name="4">重命名</MenuItem>
      <MenuItem name="5">删除</MenuItem>
    </Menu>
    <Modal
      v-model="modal3"
      title="视频预览"
      class-name="vertical-center-modal"
      width=830
      :mask-closable="false"
      @on-ok="closeModal"
      @on-cancel="closeModal">
      <video id="video1" width="800" height="500" controls ref="myVideo">
        <source src="https://static.smartisanos.cn/common/video/smartisan-jianguopro2.mp4" type="video/mp4">
        您的浏览器不支持 HTML5 video 标签。
      </video>
    </Modal>
  </div>
</template>

<script>
import { Checkbox, Col, Message, Menu, Submenu, MenuItem, MenuGroup, Icon, Modal } from 'iview'
import eventBus from './eventBus.js'
import { nameCanUse } from '../store/data'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'container',
  components: {
    Checkbox,
    Col,
    Message,
    Menu,
    Submenu,
    MenuItem,
    MenuGroup,
    Icon,
    Modal
  },
  data () {
    return {
      newName: '',
      oldName: '',
      cancelRename: false,
      contextMenu1: false,
      contextMenu2: false,
      contextMenuLeft: '0px',
      contextMenuTop: '0px',
      modal3: false
    }
  },
  computed: {
    ...mapGetters({
      list: 'currentListBufferR'
    }),
    ...mapState([
      'view',
      'rank',
      'checkedBuffer',
      'data',
      'currentListId'
    ])
  },
  methods: {
    into (id, type) {
      if (type === 'video') {
        this.modal3 = true
      }
      if (type === 'music') {
        return Message.error('此文件类型不能预览，建议下载后打开！')
      }
      // if (type === 'image') {
      //   this.imagePreview = true
      // }
      if (type !== 'folder' && type !== 'folder_f' && type !== 'folder_m') return
      this.$store.commit('changeCurrentListId', {id})
      this.$store.commit('changeCheckedAll', {checkAll: false})
      this.$store.commit('changeCurrentListBuffer')
    },
    checkHandle (id) {
      this.$store.commit('changeChecked', {id})
    },
    editDoneBlur (id) {
      if (this.cancelRename) {
        return this.$store.commit('changeEdit', {id})
      }
      if (!this.newName) {
        this.$refs.editInput[0].select()
        return Message.error('文件(夹)名不能为空，请输入文件名称')
      }
      if (this.newName === this.oldName && this.oldName !== '新建文件夹') {
        return this.$store.commit('changeEdit', {id})
      }
      if (this.oldName === '新建文件夹') {
        if (nameCanUse(this.data, this.currentListId, this.newName)) {
          this.$store.commit('changeData', {id, newData: this.checkedBuffer[id], newName: this.newName})
          this.$store.commit('changeEdit', {id})
          return Message.success('新建文件夹成功！')
        } else {
          this.$refs.editInput[0].select()
          return Message.error('命名冲突！')
        }
      }
      if (nameCanUse(this.data, this.currentListId, this.newName)) {
        this.$store.commit('changeName', {id, newName: this.newName})
        Message.success('重命名成功！')
      } else {
        this.$refs.editInput[0].select()
        return Message.error('命名冲突！')
      }
      this.$store.commit('changeEdit', {id})
    },
    editDoneEnter () {
      this.$refs.editInput[0].blur()
    },
    cancelEdit () {
      this.cancelRename = true
      this.$refs.editInput[0].blur()
    },
    contextMenuclose () {
      if (this.contextMenu1 === true) {
        this.contextMenu1 = false
      }
      if (this.contextMenu2 === true) {
        this.contextMenu2 = false
      }
    },
    contextMenu1Handle (e) {
      console.log('五点')
      this.contextMenu1 = true
      let left = e.pageX
      let top = e.pageY
      let screenWidth = window.innerWidth
      let screenHeight = window.innerHeight
      if (left + 240 >= screenWidth) {
        left = screenWidth - 240
      }
      if (top < e.target.offsetTop) {
        top = e.target.offsetTop
      }
      if (top + 296 >= screenHeight) {
        top = screenHeight - 296
      }
      this.contextMenuLeft = left + 'px'
      this.contextMenuTop = top + 'px'
    },
    rightHandle1 (name) {
      this.contextMenu1 = false
      if (name === '1') return
      if (name === '2-1') {
        this.$store.commit('changeView', {view: 'list'})
      }
      if (name === '2-2') {
        this.$store.commit('changeView', {view: 'thumbnail'})
      }
      if (name === '3-1') {
        this.$store.commit('changeRank', {rank: 'name'})
      }
      if (name === '3-2') {
        this.$store.commit('changeRank', {rank: 'time'})
      }
      if (name === '4') {
        this.$store.commit('changeCheckedAll', {checkedAll: false})
        let id = Date.now()
        this.$store.commit('addNewFolder', {id})
        this.newName = this.oldName = this.checkedBuffer[id].name
        this.cancelRename = false
        this.$store.commit('changeEdit', {id})
        this.$nextTick(function () { // input要获取焦点等到DOM渲染完成触发回调函数
          this.$refs.editInput[0].focus()
        })
      }
    },
    contextMenu2Handle (e, id) {
      let targetInBuffer = Object.keys(this.checkedBuffer).some((item) => {
        return item * 1 === id
      })
      if (!targetInBuffer) {
        this.$store.commit('changeCheckedAll', {checkAll: false})
        this.$store.commit('changeChecked', {id})
      }
      this.contextMenu2 = true
      let left = e.pageX
      let top = e.pageY
      let screenWidth = window.innerWidth
      let screenHeight = window.innerHeight
      if (left + 240 >= screenWidth) {
        left = screenWidth - 240
      }
      if (top < e.target.offsetTop) {
        top = e.target.offsetTop
      }
      if (top + 296 >= screenHeight) {
        top = screenHeight - 296
      }
      this.contextMenuLeft = left + 'px'
      this.contextMenuTop = top + 'px'
    },
    rightHandle2 (name) {
      console.log(name)
      this.contextMenu2 = false
      if (name === '3') {
        eventBus.$emit('moveFolderTo')
      }
      if (name === '4') {
        eventBus.$emit('rename')
      }
      if (name === '5') {
        eventBus.$emit('deleteFolder')
      }
    },
    closeModal () {
      this.$refs.myVideo.pause()
      this.modal3 = false
    }
  },
  mounted () {
    eventBus.$on('rename', (e) => {
      if (this.checkedBuffer.length === 0) {
        return Message.error('请选中一个文件进行编辑！')
      }
      if (this.checkedBuffer.length > 1) {
        return Message.error('只能选中一个文件进行编辑！')
      }
      let id = Object.keys(this.checkedBuffer).map(item => {
        if (item !== 'length') {
          return item
        }
      })[0]
      this.newName = this.oldName = this.checkedBuffer[id].name
      this.cancelRename = false
      this.$store.commit('changeEdit', {id})
      this.$nextTick(function () { // input要获取焦点等到DOM渲染完成触发回调函数
        this.$refs.editInput[0].focus()
      })
    })
    eventBus.$on('addNewFolderHandle', (e) => {
      this.$store.commit('changeCheckedAll', {checkedAll: false})
      let id = Date.now()
      this.$store.commit('addNewFolder', {id})
      this.newName = this.oldName = this.checkedBuffer[id].name
      this.cancelRename = false
      this.$store.commit('changeEdit', {id})
      this.$nextTick(function () { // input要获取焦点等到DOM渲染完成触发回调函数
        this.$refs.editInput[0].focus()
      })
    })
  }
}
</script>

<style scoped>
  .container {
    background-color: #fff;
    flex: 1;
  }
  #thumbnail{
    margin: 5px 5px 5px 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  #thumbnail .list-item {
    width:130px;
    height: 130px;
    padding: 5px;
    margin: 5px;
    color: #020202;
  }
  #thumbnail .list-item.checked {
    background-color: #f1f5fa;
  }
  #thumbnail .list-item:hover {
    background-color: #f1f5fa;
  }
  #thumbnail .list-item:hover .checkbox {
    visibility: visible;
  }
  #thumbnail .list-item.checked .checkbox {
    visibility: visible;
  }
  #thumbnail .list-item-content {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  #thumbnail .folder-name {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .folder-name-edit {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    height: 30px;
    border: 1px solid #C8CCD3;
    background: #fff;
  }
  .big-image {
    width: 60px;
  }
  .small-image {
    width: 50px;
    margin: 5px;
  }
  .auto-image {
    max-width: 80px;
    max-height: 60px;
  }
  #thumbnail .checkbox {
    visibility: hidden;
    align-self: flex-start
  }
  #list {
    width: 100%;
    border-collapse: collapse;
    color: #020202;
  }
  #list thead {
    margin: 10px 60px 10px 20px;
    width: 100%;
    height: 60px;
    line-height: 60px;
  }
  #list thead tr th:nth-child(1) {
    width: 5%;
    border-bottom: none;
  }
  #list thead tr th {
    text-align: left;
    border-bottom: 1px solid #D5D7DF;
  }
  #list thead tr th:hover {
    background-color: #E6E7EC;
  }
  #list tbody tr.checked {
    background-color: #E6E7EC;
  }
  #list tbody tr:hover {
    background-color: #E6E7EC;
  }
  #list tbody tr {
    margin: 10px 60px 10px 20px;
    width: 100%;
    height: 60px;
    line-height: 60px;
  }
  #list tbody tr td:nth-child(1) {
    border-bottom: none;
  }
  #list tbody tr td {
    border-bottom: 1px solid #D5D7DF;
  }
  td, th {
    font-family: -apple-system;
    line-height: 60px;
    vertical-align: middle;
  }
  #list .checkbox {
    margin-left: 20px;
  }
  .t-big-image {
    width: 30px;
    height: 30spx;
    margin-bottom: -5px;
  }
  .t-small-image {
    width: 26px;
    height: 26px;
    margin-bottom: -5px;
  }
  .t-auto-image {
    width: 26px;
    height: 26px;
    margin-bottom: -5px;
  }
  #list .file-icon {
    display: inline-block;
    width: 40px;
    height: 55px;
    padding-top: 5px;
  }
  #list .file-name {
    display: inline-block;
  }
  #list .name-text {
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 auto;
    max-width: 70%;
    height: 40px;
  }
  #list .name-input {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    height: 30px;
    border: 1px solid #C8CCD3;
    background: #fff;
    vertical-align: text-bottom;
  }
  .kong {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
  }
  .kong p {
    font-size: 24px;
    color: #bfbfbf;
  }
  .contextMenu {
    border-right: none;
    border: 1px solid rgb(221, 222, 225);
    border-radius: 5px;
    box-shadow: 2px 2px 10px 2px rgb(221, 222, 225);
    position: absolute;
    left: 0px;
    top: 0px;
  }
  .vertical-center-modal {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .vertical-center-modal .ivu-modal{
    top: 0;
  }
  .shade {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(0,0,0,.80);
  }
  .img-header {
    width: 100%;
    height: 64px;
    background-color: #181818;
    font-size: 18px;
    color: #fff;
  }
  .img-header span {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    margin: 12px 40px;
  }
  .img-header .img-close {
    float: right;
    margin: 0 40px;
    width: 64px;
    height: 64px;
    color: #fff;
    border: none;
    background-color: #181818;
  }
  .img-header .img-close:hover {
    background-color: rgba(255,255,255,.2);
  }
  .swiper-container {
    position: absolute;
    width: 70%;
    left: 50%;
    transform: translateX(-50%);
    top: 64px;
    bottom: 0px;
    background-color: #fff;
    margin: 0 auto;
  }
  .swiper-btn-prev, .swiper-btn-next {
    position: absolute;
    width: 60px;
    height: 60px;
    top: 50%;
    color: #fff;
    border: none;
    background-color: rgba(0,0,0,0);
  }
  .swiper-btn-prev:hover, .swiper-btn-next:hover {
    background-color: rgba(255,255,255,.2);
  }
  .swiper-btn-prev {
    left: 80px;
  }
  .swiper-btn-next {
    right: 80px;
  }
</style>
