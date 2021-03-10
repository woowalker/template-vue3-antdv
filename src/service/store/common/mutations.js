const SET_DATA_MAP = 'SET_DATA_MAP' // 设置数据字典

export const state = {
  dataMap: {}
}
export const mutations = {
  [SET_DATA_MAP] (state, dataMap) {
    state.dataMap = {
      ...state.dataMap,
      ...dataMap
    }
  }
}
