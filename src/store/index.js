import Vue from 'vue'
import Vuex from 'vuex'
import { data, getAllParents, getChildrenById, rankTime, deleteItemById, getCheckedFileFromBuffer, clock } from './data'

// import Axios from 'axios'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    data: data,
    currentListId: 0, // 当前文件的id
    checkedBuffer: {length: 0}, // 当前选中的文件，以及选中的个数
    currentListBuffer: [],
    moveTargetId: 0,
    view: 'thumbnail',
    rank: 'name',
    checkAll: false
  },
  getters: {
    breakcrumb (state) {
      let data = getAllParents(state.data, state.currentListId)
      return data
    },
    currentListBufferR (state) { // 当前文件下所有的子文件
      let data = state.currentListBuffer
      if (state.rank === 'name') {
        // 按中文首字符的拼音进行排序
        data.sort(function (a, b) {
          return a.name[0].localeCompare(b.name[0], 'zh')
        })
      } else if (state.rank === 'time') {
        rankTime(data)
      }
      return data
    }
  },
  mutations: {
    changeData (state, payload) {
      console.log(payload)
      let newData = payload.newData
      newData.name = payload.newName
      state.data[payload.id] = newData
    },
    changeView (state, payload) {
      state.view = payload.view
    },
    changeRank (state, payload) {
      state.rank = payload.rank
    },
    changeCurrentListId (state, payload) {
      state.currentListId = payload.id
    },
    changeCurrentListBuffer (state) {
      let data = getChildrenById(state.data, state.currentListId)
      state.currentListBuffer = data
    },
    changeChecked (state, payload) {
      let id = payload.id
      state.currentListBuffer = state.currentListBuffer.map((item) => {
        if (item.id === payload.id) {
          item.checked = !item.checked
          if (item.checked) {
            state.checkedBuffer[id] = item
            state.checkedBuffer.length++
          } else {
            delete state.checkedBuffer[id]
            state.checkedBuffer.length--
          }
        }
        return item
      })
      if (state.checkedBuffer.length === state.currentListBuffer.length) {
        state.checkAll = true
      } else {
        state.checkAll = false
      }
    },
    changeCheckedAll (state, payload) {
      function checkHandle (checked) {
        if (checked) {
          state.checkAll = false
          state.checkedBuffer = {length: 0}
          state.currentListBuffer = state.currentListBuffer.map((item) => {
            item.checked = false
            return item
          })
        } else {
          state.checkAll = true
          state.checkedBuffer = {length: 0}
          state.currentListBuffer = state.currentListBuffer.map((item) => {
            item.checked = true
            state.checkedBuffer[item.id] = item
            state.checkedBuffer.length++
            return item
          })
        }
      }
      if (payload) {
        checkHandle(!payload.checkAll)
      } else {
        checkHandle(state.checkAll)
      }
    },
    changeEdit (state, payload) {
      state.currentListBuffer = state.currentListBuffer.map((item) => {
        if (item.id === payload.id * 1) {
          console.log(payload.id)
          item.edit = !item.edit
        }
        return item
      })
    },
    changeName (state, payload) {
      console.log(payload)
      state.data[payload.id].name = payload.newName
    },
    deleteDate (state) {
      let data = getCheckedFileFromBuffer(state.checkedBuffer)
      let len = data.length
      for (let i = 0; i < len; i++) {
        const item = data[i]
        const fileId = item.fileId
        deleteItemById(state.data, fileId)
      }
      state.checkedBuffer = {length: 0}
      state.checkAll = false
    },
    addNewFolder (state, payload) {
      let newData = {
        id: payload.id,
        pId: state.currentListId,
        time: clock(),
        name: '新建文件夹',
        size: '--',
        type: 'folder',
        checked: true,
        edit: false
      }
      console.log(newData)
      state.checkedBuffer[payload.id] = newData
      state.checkedBuffer.length++
      state.currentListBuffer.push(newData)
    },
    moveTarget (state, payload) {
      state.data[payload.id].pId = payload.targetId
    }
  }
  // ,
  // actions: {
  //   getDataAction ({ commit }, payload) {
  //     Axios.get('/api')
  //     .then((res) => {
  //       console.log(res)
  //       // commit('changeList', { list: prams.data.data.list })
  //     })
  //   }
  // }
})

export default store
