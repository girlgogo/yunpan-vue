<template>
  <div class="container">
    <ul class="list">
      <li class="list-item">
        <div class="list-item-content" >
          <Checkbox size="large" class="checkbox"></Checkbox>
          <div><img src="../assets/文件夹.png" class="big-image"></div>
          <span class="folder-name">电影</span>
          <input type="text" class="folder-name-edit" value="">
        </div>
      </li>
      <li class="list-item">
        <div class="list-item-content" >
          <Checkbox size="large" class="checkbox"></Checkbox>
          <div><img src="../assets/压缩文件.png" class="small-image"></div>
          <span class="folder-name">电影</span>
          <input type="text" class="folder-name-edit" value="">
        </div>
      </li>
      <li class="list-item">
        <div class="list-item-content" >
          <Checkbox size="large" class="checkbox"></Checkbox>
          <div><img src="../assets/音乐.png" class="small-image"></div>
          <span class="folder-name">音乐</span>
          <input type="text" class="folder-name-edit" value="">
        </div>
      </li>
      <li class="list-item">
        <div class="list-item-content" >
          <Checkbox size="large" class="checkbox"></Checkbox>
          <div><img src="../assets/视频.png" class="big-image"></div>
          <span class="folder-name">电影</span>
          <input type="text" class="folder-name-edit" value="">
        </div>
      </li>
      <!-- <li style="width:130px; height: 130px; background-color: #f1f5fa; padding: 5px; margin: 5px">
        <div style="text-align:center; display: flex; flex-direction: column; justifyContent: center" >
          <Checkbox size="large" style="align-self: flex-start"></Checkbox>
          <div><img src="../assets/文件夹.png" style="width: 60px"></div>
          <span class="folder-name">电影</span>
          <input type="text" class="folder-name-edit" value="" style="display: none;">
        </div>
      </li>
      <li style="width:130px; height: 130px; background-color: #f1f5fa; padding: 5px; margin: 5px">
        <div style="text-align:center; display: flex; flex-direction: column; justifyContent: center" >
          <Checkbox size="large" style="align-self: flex-start"></Checkbox>
          <div><img src="../assets/压缩文件.png" style="width: 50px; margin: 5px"></div>
          <span class="folder-name">电影</span>
          <input type="text" class="folder-name-edit" value="" style="display: none;">
        </div>
      </li>
      <li style="width:130px; height: 130px; background-color: #f1f5fa; padding: 5px; margin: 5px">
        <div style="text-align:center; display: flex; flex-direction: column; justifyContent: center" >
          <Checkbox size="large" style="align-self: flex-start"></Checkbox>
          <div><img src="../assets/音乐.png" style="width: 50px; margin: 5px"></div>
          <span class="folder-name">音乐</span>
          <input type="text" class="folder-name-edit" value="" style="display: none;">
        </div>
      </li>
      <li style="width:130px; height: 130px; background-color: #f1f5fa; padding: 5px; margin: 5px">
        <div style="text-align:center; display: flex; flex-direction: column; justifyContent: center" >
          <Checkbox size="large" style="align-self: flex-start"></Checkbox>
          <div><img src="../assets/视频.png" style="width: 60px;"></div>
          <span class="folder-name">电影</span>
          <input type="text" class="folder-name-edit" value="" style="display: none;">
        </div>
      </li>
      <li style="width:130px; height: 130px; background-color: #f1f5fa; padding: 5px; margin: 5px">
        <div style="text-align:center; display: flex; flex-direction: column; justifyContent: center" >
          <Checkbox size="large" style="align-self: flex-start"></Checkbox>
          <div><img src="../assets/文件夹.png" style="width: 60px"></div>
          <span class="folder-name">电影</span>
          <input type="text" class="folder-name-edit" value="" style="display: none;">
        </div>
      </li>
      <li style="width:130px; height: 130px; background-color: #f1f5fa; padding: 5px; margin: 5px">
        <div style="text-align:center; display: flex; flex-direction: column; justifyContent: center" >
          <Checkbox size="large" style="align-self: flex-start"></Checkbox>
          <div><img src="../assets/压缩文件.png" style="width: 50px; margin: 5px"></div>
          <span class="folder-name">电影</span>
          <input type="text" class="folder-name-edit" value="" style="display: none;">
        </div>
      </li>
      <li style="width:130px; height: 130px; background-color: #f1f5fa; padding: 5px; margin: 5px">
        <div style="text-align:center; display: flex; flex-direction: column; justifyContent: center" >
          <Checkbox size="large" style="align-self: flex-start"></Checkbox>
          <div><img src="../assets/音乐.png" style="width: 50px; margin: 5px"></div>
          <span class="folder-name">音乐</span>
          <input type="text" class="folder-name-edit" value="" style="display: none;">
        </div>
      </li>
      <li style="width:130px; height: 130px; background-color: #f1f5fa; padding: 5px; margin: 5px">
        <div style="text-align:center; display: flex; flex-direction: column; justifyContent: center" >
          <Checkbox size="large" style="align-self: flex-start"></Checkbox>
          <div><img src="../assets/视频.png" style="width: 60px;"></div>
          <span class="folder-name">电影</span>
          <input type="text" class="folder-name-edit" value="" style="display: none;">
        </div>
      </li> -->
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
