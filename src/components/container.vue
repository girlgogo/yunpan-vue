<template>
  <div class="container">
    <ul id="thumbnail" v-if="currentView === 'thumbnail'">
      <li v-for="item in list" :class="['list-item', {'checked': item.checked}]" :key="item.id">
        <div class="list-item-content" >
          <Checkbox size="large" class="checkbox" :value="item.checked" @on-change="checkHandle(item.id)"></Checkbox>
          <div @click="into(item.id)">
            <img src="../assets/folder.png" class="big-image" v-if="item.type === 'folder'">
            <img src="../assets/folder_f.png" class="big-image" v-else-if="item.type === 'folder_f'">
            <img src="../assets/folder_m.png" class="small-image" v-else-if="item.type === 'folder_m'">
            <img src="../assets/zip.png" class="small-image" v-else-if="item.type === 'zip'">
            <img src="../assets/image.png" class="big-image" v-else-if="item.type === 'image'">
            <img src="../assets/music.png" class="big-image" v-else-if="item.type === 'music'">
          </div>
          <span class="folder-name" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{item.name}}</span>
          <input type="text" class="folder-name-edit" value="">
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
        <tr v-for="item in list" :key="item.id">
          <td>
            <Checkbox size="large" class="checkbox"></Checkbox>
          </td>
          <td>
            <div class="file-icon" @click="into(item.id)">
              <img src="../assets/folder.png" class="t-big-image" v-if="item.type === 'folder'">
              <img src="../assets/folder_f.png" class="t-big-image" v-else-if="item.type === 'folder_f'">
              <img src="../assets/folder_m.png" class="t-small-image" v-else-if="item.type === 'folder_m'">
              <img src="../assets/zip.png" class="t-small-image" v-else-if="item.type === 'zip'">
              <img src="../assets/image.png" class="t-big-image" v-else-if="item.type === 'image'">
              <img src="../assets/music.png" class="t-big-image" v-else-if="item.type === 'music'">
            </div>
            <div class="file-name">
              <span class="name-text show" :value="item.name">{{item.name}}</span>
              <input class="name-input" type="text" value="">
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
import { Checkbox, Col } from 'iview'

export default {
  name: 'container',
  components: {
    Checkbox,
    Col
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
    }
  },
  methods: {
    into (id) {
      this.$store.commit('changeCurrentListId', {id})
      this.$store.commit('changeCurrentListBuffer')
    },
    checkHandle (id) {
      this.$store.commit('changeChecked', {id})
    }
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
  .folder-name-edit {
    display: none;
  }
  .big-image {
    width: 60px;
  }
  .small-image {
    width: 50px;
    margin: 5px;
  }
  .checkbox {
    visibility: hidden;
    align-self: flex-start
  }
  #list {
    width: 100%;
    /* margin: 5px 5px 5px 20px; */
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
  /* #list .icon-arrow-down {
    display: inline-block;
    width: 14px;
    height: 14px;
    background: url(../image/向下.png);
    background-size: 14px 14px;
  } */
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
    display: none;
    text-align: center;
    text-overflow: ellipsis;
    /* overflow: hidden; */
    white-space: nowrap;
    margin: 0 auto;
    max-width: 70%;
    height: 40px;
  }
  #list .name-input {
    display: none;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    height: 40px;
    border: 1px solid #C8CCD3;
    background: #fff;
  }
  #list .name-text.show,
  #list .name-input.show {
    display: block;
  }
</style>
