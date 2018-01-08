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
          <Button type="ghost" key="delete" @click="modal1 = true">删除</Button>
          <Button type="ghost" key="rename" @click="renameStart">重命名</Button>
          <Button type="ghost" key="moveTo" @click="modal2 = true">移动到</Button>
          <Button type="ghost" key="download" disabled>下载</Button>
          <Button type="ghost" key="share" disabled>分享</Button>
        </ButtonGroup>
      </div>
      <Button class="new-btn" type="primary" icon="plus-round" size="large" @click="addNewFolder">新建文件夹</Button>
    </div>
    <Modal
      v-model="modal1"
      title="删除文件"
      @on-ok="okDelete"
      @on-cancel="cancelDelete">
      <p>确定删除这{{checkedBuffer.length}}个文件/文件夹？</p>
    </Modal>
    <Modal
      v-model="modal2"
      title="移动文件/文件夹到"
      @on-ok="okMove"
      @on-cancel="cancelMove">
      <Tree :data="moveToData" :render="renderContent"></Tree>
    </Modal>
  </div>
</template>

<script>
import { Col, Button, ButtonGroup, Breadcrumb, BreadcrumbItem, Modal, Message, Tree } from 'iview'
import eventBus from './eventBus.js'
import { getChildrenById, canMoveData, getCheckedFileFromBuffer } from '../store/data'

export default {
  name: 'toolbar',
  components: {
    Col,
    Button,
    ButtonGroup,
    Breadcrumb,
    BreadcrumbItem,
    Modal,
    Message,
    Tree
  },
  data () {
    return {
      active: false,
      newName: '',
      modal1: false,
      modal2: false,
      activeId: 0
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
    },
    moveToData () {
      let data = this.$store.state.data
      let dataNew = []
      dataNew[0] = {
        title: data[0].name,
        id: 0,
        expand: true,
        children: []
      }
      function dataHandle (data, id) {
        let childrenData = getChildrenById(data, id)
        if (childrenData.length === 0) {
          if (data[id].type === 'zip') {
            return {
              title: data[id].name,
              disabled: true,
              id
            }
          }
          return {
            title: data[id].name,
            id
          }
        } else {
          let children = []
          for (let i = 0; i < childrenData.length; i++) {
            if (childrenData[i].type === 'folder' || childrenData[i].type === 'folder-f' || childrenData[i].type === 'folder-m') {
              children.push(dataHandle(data, childrenData[i].id))
            }
          }
          return {
            title: data[id].name,
            expand: true,
            id,
            children
          }
        }
      }
      for (let key in data) {
        if (data[key].pId === 0) {
          const item = data[key]
          console.log(item)
          dataNew[0].children.push(dataHandle(data, item.id))
        }
      }

      console.log(dataNew)
      return dataNew
    },
    allData () {
      return this.$store.state.data
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
    },
    okDelete () {
      this.$store.commit('deleteDate')
      this.$store.commit('changeCurrentListBuffer')
      Message.success('删除文件成功！')
    },
    cancelDelete () {
      Message.info('取消删除文件！')
    },
    addNewFolder () {
      eventBus.$emit('addNewFolderHandle')
    },
    moveTo () {
      console.log(123)
    },
    okMove () {
      let data = getCheckedFileFromBuffer(this.checkedBuffer)
      let canMove = true
      for (let i = 0, len = data.length; i < len; i++) {
        const item = data[i]
        const ret = canMoveData(this.allData, item.id, this.activeId)
        if (ret === 2) {
          canMove = false
          return Message.error('已经在当前目录！')
        }
        if (ret === 3) {
          canMove = false
          return Message.error('不能移动到子文件夹中！')
        }
        if (ret === 4) {
          canMove = false
          return Message.error('存在同名文件！')
        }
        if (ret === 5) {
          canMove = false
          return Message.error('不能移动到压缩文件中！')
        }
      }
      if (canMove) {
        data.forEach((item, i) => {
          const {id} = item
          this.$store.commit('moveTarget', {id, targetId: this.activeId})
          this.$store.commit('changeCheckedAll', {checkAll: false})
          this.$store.commit('changeCurrentListBuffer')
        })
      }
      Message.success('移动文件成功！')
    },
    cancelMove () {
      this.active = 0
      Message.info('取消移动文件！')
    },
    renderContent (h, { root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-block',
          width: '100%'
        }
      }, [
        h('span', {
          // class: 'activeTree',
          on: {
            click: () => { this.activeId = data.id }
          }
        }, [
          h('Icon', {
            props: {
              type: 'ios-folder',
              size: 18,
              color: this.activeId !== data.id ? '#2d8cf0' : '#19BE6B'
            },
            style: {
              marginRight: '8px'
            }
          }),
          h('span', data.title)
        ])
      ])
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
.activeTree {
  background-color: antiquewhite;
}
</style>
