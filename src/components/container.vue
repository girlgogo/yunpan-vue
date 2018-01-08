<template>
  <div class="container">
    <ul id="thumbnail" v-if="currentView === 'thumbnail'">
      <li v-for="item in list" :class="['list-item', {'checked': item.checked}]" :key="item.id">
        <div class="list-item-content" >
          <Checkbox size="large" class="checkbox" :value="item.checked" @on-change="checkHandle(item.id)"></Checkbox>
          <div @click="into(item.id, item.type)">
            <img src="../assets/folder.png" class="big-image" v-if="item.type === 'folder'">
            <img src="../assets/folder_f.png" class="big-image" v-else-if="item.type === 'folder_f'">
            <img src="../assets/folder_m.png" class="small-image" v-else-if="item.type === 'folder_m'">
            <img src="../assets/zip.png" class="small-image" v-else-if="item.type === 'zip'">
            <img src="../assets/image.png" class="big-image" v-else-if="item.type === 'image'">
            <img src="../assets/music.png" class="big-image" v-else-if="item.type === 'music'">
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
        <tr v-for="item in list" :key="item.id" :class="{'checked': item.checked}">
          <td>
            <Checkbox size="large" class="checkbox" :value="item.checked" @on-change="checkHandle(item.id)"></Checkbox>
          </td>
          <td>
            <div class="file-icon" @click="into(item.id, item.type)">
              <img src="../assets/folder.png" class="t-big-image" v-if="item.type === 'folder'">
              <img src="../assets/folder_f.png" class="t-big-image" v-else-if="item.type === 'folder_f'">
              <img src="../assets/folder_m.png" class="t-small-image" v-else-if="item.type === 'folder_m'">
              <img src="../assets/zip.png" class="t-small-image" v-else-if="item.type === 'zip'">
              <img src="../assets/image.png" class="t-big-image" v-else-if="item.type === 'image'">
              <img src="../assets/music.png" class="t-big-image" v-else-if="item.type === 'music'">
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
</template>

<script>
import { Checkbox, Col, Message } from 'iview'
import eventBus from './eventBus.js'
import { nameCanUse } from '../store/data'

export default {
  name: 'container',
  components: {
    Checkbox,
    Col,
    Message
  },
  data () {
    return {
      newName: '',
      oldName: '',
      cancelRename: false
    }
  },
  computed: {
    list () {
      return this.$store.getters.currentListBufferR
    },
    currentView () {
      return this.$store.state.view
    },
    currentRank () {
      return this.$store.state.rank
    },
    checkedBuffer () {
      return this.$store.state.checkedBuffer
    },
    allData () {
      return this.$store.state.data
    },
    currentListId () {
      return this.$store.state.currentListId
    }
  },
  methods: {
    into (id, type) {
      if (type === 'zip') return
      this.$store.commit('changeCurrentListId', {id})
      this.$store.commit('changeCurrentListBuffer')
    },
    checkHandle (id) {
      this.$store.commit('changeChecked', {id})
    },
    editDoneBlur (id) {
      console.log(this.newName)
      if (this.cancelRename) {
        return this.$store.commit('changeEdit', {id})
      }
      if (!this.newName) {
        this.$refs.editInput[0].select()
        return Message.error('文件(夹)名不能为空，请输入文件名称')
      }
      if (this.newName === this.oldName && this.oldName !== '新建文件夹') {
        console.log('changeEdit 1')
        return this.$store.commit('changeEdit', {id})
      }
      if (this.oldName === '新建文件夹') {
        if (nameCanUse(this.allData, this.currentListId, this.newName)) {
          this.$store.commit('changeData', {id, newData: this.checkedBuffer[id], newName: this.newName})
          console.log(id, this.checkedBuffer[id], this.newName)
          this.$store.commit('changeEdit', {id})
          return Message.success('新建文件夹成功！')
        } else {
          this.$refs.editInput[0].select()
          return Message.success('命名冲突！')
        }
      }
      if (nameCanUse(this.allData, this.currentListId, this.newName)) {
        this.$store.commit('changeName', {id, newName: this.newName})
        Message.success('重命名成功！')
      } else {
        this.$refs.editInput[0].select()
        return Message.success('命名冲突！')
      }
      this.$store.commit('changeEdit', {id})
    },
    editDoneEnter () {
      this.$refs.editInput[0].blur()
    },
    cancelEdit () {
      this.cancelRename = true
      this.$refs.editInput[0].blur()
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
      // console.log(111)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    background-color: #fff
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
  #thumbnail .checkbox {
    visibility: hidden;
    align-self: flex-start
  }
  #list {
    width: 100%;
    border-collapse: collapse;
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
</style>
