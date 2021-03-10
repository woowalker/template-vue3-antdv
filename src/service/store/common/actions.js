import api from '@/plugins/api'

const SET_DATA_MAP = 'SET_DATA_MAP' // 设置数据字典

function queryDataMap (dataMapName) {
  return api['common/datamap']({
    category: dataMapName
  })
}

export default {
  setDataMap ({ state, commit }, dataMapName) { // dataMapName是当前需要的数据字典名称
    return new Promise((resolve, reject) => {
      if (state.dataMap[dataMapName]) {
        resolve()
        return
      }

      queryDataMap(dataMapName).then((data) => {
        const result = {}

        result[dataMapName] = data.map(item => {
          return Object.assign(item, {
            label: item.text
          })
        })
        commit(SET_DATA_MAP, result)
        resolve()
      }, (error) => {
        reject(error)
      })
    })
  }
}
