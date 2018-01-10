import { getChildrenById, deleteItemById, getCheckedFileFromBuffer, clock } from './data'

let Mutations = {
  changeData (state, payload) {
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
    let type = state.type
    let data = Object.values(state.data)
    if (type === 'folder') {
      data = getChildrenById(state.data, state.currentListId)
    } else if (type === '文档') {
      data = data.filter(item => {
        return item.type === 'text'
      })
    } else if (type === '图片') {
      data = data.filter(item => {
        return item.type === 'image'
      })
    } else if (type === '视频') {
      data = data.filter(item => {
        return item.type === 'vadio'
      })
    } else if (type === '音乐') {
      data = data.filter(item => {
        return item.type === 'music'
      })
    }
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
      const fileId = item.id
      deleteItemById(state.data, fileId)
    }
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
  },
  changeMenu (state, payload) {
    state.type = payload.type
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
export default Mutations
