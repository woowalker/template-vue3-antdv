import { createStore } from 'vuex'
import { VUEX_DEFAULT_CONFIG } from '@/config'
import commonStore from '@/service/store/common'

const storeDefault = createStore({
  ...commonStore,
  ...VUEX_DEFAULT_CONFIG
})

export default storeDefault
