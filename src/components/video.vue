<template>
  <div class="video-container">
    <video id="video1" width="820" height="500" controls>
      <source src="../../static/baby.mp4" type="video/mp4">
      您的浏览器不支持 HTML5 video 标签。
    </video>
  </div>
</template>

<script>
export default {
  name: 'videoPlayer'
}
</script>

<style>
  .video-container {
    background-color: black;
    width: 100%;
    height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #video1 {
    margin: 0 auto;
  }
</style>


