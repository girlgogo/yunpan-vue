<template>
  <div class="container">
    <ul class="list">
      <li v-for="item in list" class="list-item" :key="item.id">
        <div class="list-item-content" >
          <Checkbox size="large" class="checkbox"></Checkbox>
          <div>
            <img src="../assets/folder.png" class="big-image" v-if="item.type === 'folder'">
            <img src="../assets/folder_f.png" class="big-image" v-else-if="item.type === 'folder_f'">
            <img src="../assets/folder_m.png" class="small-image" v-else-if="item.type === 'folder_m'">
            <img src="../assets/zip.png" class="small-image" v-else-if="item.type === 'zip'">
            <img src="../assets/image.png" class="big-image" v-else-if="item.type === 'image'">
            <img src="../assets/music.png" class="big-image" v-else-if="item.type === 'music'">
          </div>
          <span class="folder-name">{{item.name}}</span>
          <input type="text" class="folder-name-edit" value="">
        </div>
      </li>
    </ul>
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
      // console.log(this.$store.state.currentListBuffer)
      return this.$store.state.currentListBuffer
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    padding: 5px 5px 5px 20px;
    background-color: #fff
  }
  .list{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .list-item {
    width:130px;
    height: 130px;
    background-color: #f1f5fa;
    padding: 5px;
    margin: 5px;
  }
  .list-item-content {
    text-align: center;
    display: flex;
    flex-direction: column;
    justifyContent: center;
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
    align-self: flex-start
  }
</style>
