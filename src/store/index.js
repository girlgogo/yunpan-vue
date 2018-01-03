import Vue from 'vue'
import Vuex from 'vuex'

// import Axios from 'axios'

Vue.use(Vuex)

let data = [
  {
    id: 0,
    time: '2017-10-10 13:04:01',
    name: '全部',
    size: '2G',
    type: 'folder'
  },
  {
    id: 1,
    pId: 0,
    time: '2017-10-10 14:04:01',
    name: '音乐',
    size: '60M',
    type: 'folder_m'
  },
  {
    id: 2,
    pId: 0,
    time: '2017-10-10 13:04:05',
    name: '电影',
    size: '100M',
    type: 'folder_f'
  },
  {
    id: 3,
    pId: 0,
    time: '2017-10-10 13:04:03',
    name: '图库',
    size: '40M',
    type: 'folder'
  },
  {
    id: 4,
    pId: 1,
    time: '2017-10-10 15:04:01',
    name: '儿歌',
    size: '40M',
    type: 'folder_m'
  },
  {
    id: 5,
    pId: 1,
    time: '2017-10-10 14:20:01',
    name: '轻音乐',
    size: '20M',
    type: 'folder_m'
  },
  {
    id: 6,
    pId: 3,
    time: '2017-10-10 17:04:01',
    name: '我的照片',
    size: '30M',
    type: 'folder'
  },
  {
    id: 7,
    pId: 3,
    time: '2017-10-10 16:04:01',
    name: '我的童年',
    size: '10M',
    type: 'folder'
  },
  {
    id: 8,
    pId: 7,
    time: '2017-10-10 18:04:01',
    name: '1.png',
    size: '400k',
    type: 'image'
  },
  {
    id: 9,
    pId: 6,
    time: '2017-10-10 19:04:01',
    name: '2.png',
    size: '3M',
    type: 'image'
  },
  {
    id: 10,
    pId: 6,
    time: '2017-10-10 20:04:01',
    name: '3.png',
    size: '1018K',
    type: 'image'
  },
  {
    id: 11,
    pId: 4,
    time: '2017-10-10 21:04:01',
    name: "I'm A Little Teapot.mp3",
    size: '5.4M',
    type: 'music'
  },
  {
    id: 12,
    pId: 4,
    time: '2017-10-10 22:04:01',
    name: '小星星.mp3',
    size: '6.75M',
    type: 'music'
  },
  {
    id: 13,
    pId: 5,
    time: '2017-10-10 23:04:01',
    name: 'Week.mp3',
    size: '8.45M',
    type: 'music'
  },
  {
    id: 14,
    pId: 5,
    time: '2017-10-10 23:20:01',
    name: 'Vow to Virtue.mp3',
    size: '6.78M',
    type: 'music'
  },
  {
    id: 15,
    pId: 2,
    time: '2017-10-10 23:20:01',
    name: 'My Movie',
    size: '60M',
    type: 'folder_f'
  },
  {
    id: 16,
    pId: 0,
    time: '2017-11-10 10:20:00',
    name: '我的应用',
    size: '20M',
    type: 'zip'
  },
  {
    id: 17,
    pId: 0,
    time: '2017-11-10 10:40:00',
    name: '备忘录',
    size: '10M',
    type: 'folder'
  }
]

// 根据id获得所有父级
function getAllParents (db, id) {
  let data = []
  let current = db[id]
  if (current) {
    data.push(current)
    data = getAllParents(db, current.pId).concat(data)
  }
  return data
}

let store = new Vuex.Store({
  state: {
    data: data,
    currentListId: 0, // 当前文件的id
    checkedBuffer: {length: 0}, // 当前选中的文件，以及选中的个数
    currentListBuffer: [
      {
        id: 1,
        pId: 0,
        time: '2017-10-10 14:04:01',
        name: '音乐',
        size: '60M',
        type: 'folder_m'
      },
      {
        id: 2,
        pId: 0,
        time: '2017-10-10 13:04:05',
        name: '电影',
        size: '100M',
        type: 'folder_f'
      },
      {
        id: 3,
        pId: 0,
        time: '2017-10-10 13:04:03',
        name: '图库',
        size: '40M',
        type: 'folder'
      },
      {
        id: 16,
        pId: 0,
        time: '2017-11-10 10:20:00',
        name: '我的应用',
        size: '20M',
        type: 'zip'
      },
      {
        id: 17,
        pId: 0,
        time: '2017-11-10 10:40:00',
        name: '备忘录',
        size: '10M',
        type: 'folder'
      }
    ], // 当前文件下所有的子文件
    moveTargetId: 0,
    view: 'thumbnail',
    rank: 'name'
  },
  getters: {
    breakcrumb (state) {
      let data = getAllParents(state.data, state.currentListId)
      return data
    }
  },
  mutations: {
    changeData (state, payload) {
      state.data = payload.data
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
