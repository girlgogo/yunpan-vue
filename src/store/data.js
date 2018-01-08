let data = {
  '0': {
    id: 0,
    time: '2017-10-10 13:04:01',
    name: '全部',
    size: '2G',
    type: 'folder',
    checked: false,
    edit: false
  },
  '1': {
    id: 1,
    pId: 0,
    time: '2017-10-10 14:04:01',
    name: '音乐',
    size: '60M',
    type: 'folder_m',
    checked: false,
    edit: false
  },
  '2': {
    id: 2,
    pId: 0,
    time: '2017-10-10 13:04:05',
    name: '电影',
    size: '100M',
    type: 'folder_f',
    checked: false,
    edit: false
  },
  '3': {
    id: 3,
    pId: 0,
    time: '2017-10-10 13:04:03',
    name: '图库',
    size: '40M',
    type: 'folder',
    checked: false,
    edit: false
  },
  '4': {
    id: 4,
    pId: 1,
    time: '2017-10-10 15:04:01',
    name: '儿歌',
    size: '40M',
    type: 'folder_m',
    checked: false,
    edit: false
  },
  '5': {
    id: 5,
    pId: 1,
    time: '2017-10-10 14:20:01',
    name: '轻音乐',
    size: '20M',
    type: 'folder_m',
    checked: false,
    edit: false
  },
  '6': {
    id: 6,
    pId: 3,
    time: '2017-10-10 17:04:01',
    name: '我的照片',
    size: '30M',
    type: 'folder',
    checked: false,
    edit: false
  },
  '7': {
    id: 7,
    pId: 3,
    time: '2017-10-10 16:04:01',
    name: '我的童年',
    size: '10M',
    type: 'folder',
    checked: false,
    edit: false
  },
  '8': {
    id: 8,
    pId: 7,
    time: '2017-10-10 18:04:01',
    name: '1.png',
    size: '400k',
    type: 'image',
    checked: false,
    edit: false
  },
  '9': {
    id: 9,
    pId: 6,
    time: '2017-10-10 19:04:01',
    name: '2.png',
    size: '3M',
    type: 'image',
    checked: false,
    edit: false
  },
  '10': {
    id: 10,
    pId: 6,
    time: '2017-10-10 20:04:01',
    name: '3.png',
    size: '1018K',
    type: 'image',
    checked: false,
    edit: false
  },
  '11': {
    id: 11,
    pId: 4,
    time: '2017-10-10 21:04:01',
    name: "I'm A Little Teapot.mp3",
    size: '5.4M',
    type: 'music',
    checked: false,
    edit: false
  },
  '12': {
    id: 12,
    pId: 4,
    time: '2017-10-10 22:04:01',
    name: '小星星.mp3',
    size: '6.75M',
    type: 'music',
    checked: false,
    edit: false
  },
  '13': {
    id: 13,
    pId: 5,
    time: '2017-10-10 23:04:01',
    name: 'Week.mp3',
    size: '8.45M',
    type: 'music',
    checked: false,
    edit: false
  },
  '14': {
    id: 14,
    pId: 5,
    time: '2017-10-10 23:20:01',
    name: 'Vow to Virtue.mp3',
    size: '6.78M',
    type: 'music',
    checked: false,
    edit: false
  },
  '15': {
    id: 15,
    pId: 2,
    time: '2017-10-10 23:20:01',
    name: 'My Movie',
    size: '60M',
    type: 'folder_f',
    checked: false,
    edit: false
  },
  '16': {
    id: 16,
    pId: 0,
    time: '2017-11-10 10:20:00',
    name: '我的应用',
    size: '20M',
    type: 'zip',
    checked: false,
    edit: false
  },
  '17': {
    id: 17,
    pId: 0,
    time: '2017-11-10 10:40:00',
    name: '备忘录',
    size: '10M',
    type: 'folder',
    checked: false,
    edit: false
  }
}
// 根据id获得当前对象的id
function getId (db, id) {
  return db[id]
}

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

// 根据id获得所有子级
function getChildrenById (db, id) {
  let data = []
  for (let key in db) {
    const item = db[key]
    if (item.pId === id) {
      data.push(item)
    }
  }
  return data
}

// 按时间排序函数
function rankTime (data) {
  data.sort(function (a, b) {
    let aTime = toArr(a.time)
    let bTime = toArr(b.time)
    for (let i = 0; i < aTime.length; i++) {
      if (aTime[i] !== bTime[i]) {
        return bTime[i] - aTime[i]
      }
    }
  })
  return data
}

// 格式化时间函数
function toArr (str) {
  let data = str.split(' ')[0].split('-').concat(str.split(' ')[1].split(':'))
  for (let i = 0; i < data.length; i++) {
    data[i] = data[i] * 1
  }
  return data
}

// 判断名字是否可用
function nameCanUse (db, id, text) {
  const currentData = getChildrenById(db, id)
  return currentData.every(item => item.name !== text)
}

// 根据id删除指定数据和其子集
function deleteItemById (db, id) {
  if (!id) return false
  delete db[id]
  let children = getChildrenById(db, id * 1)
  if (children.length) {
    for (let i = 0; i < children.length; i++) {
      deleteItemById(db, children[i].id)
    }
  }
  return true
}

// 将选中的元素缓存转成数组
function getCheckedFileFromBuffer (checkedBuffer) {
  let data = []
  for (let key in checkedBuffer) {
    if (key !== 'length') {
      const currentItem = checkedBuffer[key]
      data.push({
        id: key,
        fileData: currentItem
      })
    }
  }
  return data
}

// 当前生成时间函数
function clock () {
  var now = new Date()
  var y = now.getFullYear()
  var m = now.getMonth() + 1
  var d = now.getDate()
  var hours = now.getHours()
  var mins = now.getMinutes()
  var secs = now.getSeconds()

  var timeStr = y + '-' + m + '-' + d + ' ' + add0(hours) + ':' + add0(mins) + ':' + add0(secs)
  return timeStr
}

// 补0函数
function add0 (n) {
  return n < 10 ? '0' + n : '' + n
}

// 判断可否移动数据
function canMoveData (db, currentId, targetId) {
  const currentData = db[currentId]

  const targetParents = getAllParents(db, targetId)
  if (currentData.pId === targetId) {
    return 2 // 移动到自己所在的目录
  }

  if (targetParents.indexOf(currentData) !== -1) {
    return 3   // 移动到自己的子集
  }
  if (!nameCanUse(db, targetId, currentData.name)) {
    return 4 // 名字冲突
  }
  if (db[targetId].type === 'zip') {
    return 5 // 压缩文件
  }

  return 1
}

function moveDataToTarget (db, currentId, targetId) {
  db[currentId].pId = targetId
}

export { data, getId, getAllParents, getChildrenById, rankTime, toArr, nameCanUse, deleteItemById, getCheckedFileFromBuffer, clock, add0, canMoveData, moveDataToTarget }
