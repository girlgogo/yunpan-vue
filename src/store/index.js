import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import { data } from './data'

Vue.use(Vuex)

const state = {
  data: data,
  currentListId: 0, // 当前文件的id
  checkedBuffer: {length: 0}, // 当前选中的文件，以及选中的个数
  currentListBuffer: [],
  moveTargetId: 0,
  view: 'thumbnail',
  rank: 'name',
  checkAll: false,
  type: 'folder'
}

let store = new Vuex.Store({
  state,
  getters,
  mutations
})

export default store
