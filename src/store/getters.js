import { getAllParents, rankTime } from './data'

let Getters = {
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
}

export default Getters
