<template>
  <div class="toolBar">
    <div>
      <Breadcrumb separator=">">
        <BreadcrumbItem v-for="item in parentList" :key="item.id" to="/">{{item.name}}</BreadcrumbItem>
        <!-- <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
        <BreadcrumbItem>Breadcrumb</BreadcrumbItem> -->
      </Breadcrumb>
    </div>
    <div class="btn-list">
      <div v-if="checkedBuffer.length === 0">
        <ButtonGroup size="large" class="btn-grounp" >
          <Button type="ghost" @click="changeViewTo('list')" :class="currentView === 'list'? 'btn-active': ''" key="list">
            <img src="../assets/list.png" class="btn-img" />
          </Button>
          <Button type="ghost" @click="changeViewTo('thumbnail')" :class="currentView === 'thumbnail'? 'btn-active': ''" key="thumbnail">
            <img src="../assets/big.png" class="btn-img" />
          </Button>
        </ButtonGroup>
        <ButtonGroup size="large" class="btn-grounp" >
          <Button type="ghost" @click="changeRankTo('name')" :class="currentRank === 'name'? 'btn-active': ''" key="name">
            <img src="../assets/sort.png" class="btn-img" />
          </Button>
          <Button type="ghost" @click="changeRankTo('time')" :class="currentRank === 'time'? 'btn-active': ''" key="time">
            <img src="../assets/time.png" class="btn-img" />
          </Button>
        </ButtonGroup>
      </div>
      <div v-else>
        <ButtonGroup size="large" class="btn-grounp" >
          <Button type="ghost" key="delete">删除</Button>
          <Button type="ghost" key="rename" @click="renameStart">重命名</Button>
          <Button type="ghost" key="moveTo">移动到</Button>
          <Button type="ghost" key="download" disabled>下载</Button>
          <Button type="ghost" key="share" disabled>分享</Button>
        </ButtonGroup>
      </div>
      <Button class="new-btn" type="primary" icon="plus-round" size="large">新建文件夹</Button>
    </div>

  </div>
</template>

<script>
import { Col, Button, ButtonGroup, Breadcrumb, BreadcrumbItem } from 'iview'
import eventBus from './eventBus.js'

export default {
  name: 'toolbar',
  components: {
    Col,
    Button,
    ButtonGroup,
    Breadcrumb,
    BreadcrumbItem
  },
  data () {
    return {
      active: false,
      newName: ''
    }
  },
  computed: {
    parentList () {
      return this.$store.getters.breakcrumb
    },
    currentView () {
      return this.$store.state.view
    },
    currentRank () {
      return this.$store.state.rank
    },
    checkedBuffer () {
      return this.$store.state.checkedBuffer
    }
  },
  methods: {
    changeViewTo (view) {
      this.$store.commit('changeView', {view})
    },
    changeRankTo (rank) {
      this.$store.commit('changeRank', {rank})
    },
    changeNameHandle () {
      // console.log(this.checkedBuffer)
      this.$store.commit('changeName')
    },
    renameStart () {
      eventBus.$emit('rename')
    }
  }
}
</script>

<style>
.new-btn {
  background-color: #1296db;
  border: none;
  border-radius: 2px;
  font-size: 16px;
}
.toolBar {
  display: flex;
  justify-content: space-between;
  height: 64px;
  line-height: 64px;
  padding-left: 20px;
}
.btn-list {
  display: flex;
  justify-content: flex-end;
  padding: 13px 45px 14px 0;
}
.btn-grounp {
  margin-right: 20px;
  vertical-align: top;
}
.btn-img {
  width: 16px;
  margin-bottom: -2px;
}
.btn-active {
  background-color: #E6E7EC;
  pointer-events: none;
}
</style>
