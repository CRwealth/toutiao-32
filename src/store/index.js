import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from '../utils/auth'

Vue.use(Vuex)
// vuex
// 本质就是仓库，存放数据
// vuex的数据是响应式的
// vue的数据是自产自销的 vuex的数据必须在vuex里修改
// mutaitions定义方法去修改，在外接调用这个方法
// mutaitions方法建议是大写 接受两个参数，其中一个是state
// $store.commit('方法名字')用于触发mutaitions里的方法
export default new Vuex.Store({
  state: {
    // tokenObj: JSON.parse(localStorage.getItem('HEIMA_TOUTIAO_TOUKEN')) || {}
    // tokenObj: Storage.getItem('HEIMA_TOUKEN') || {}
    tokenObj: getToken() || {}
  },
  getters: {},
  mutations: {
    SET_TOKEN (state, payload) {
      // 将token存入vuex中
      state.tokenObj = payload
      // token存入本地存储中
      // 本地存储 操作是JSON格式字符串
      // localStorage.setItem('HEIMA_TOUTIAO_TOUKEN', JSON.stringify(payload))
      // Storage.set('HEIMA_TOUTIAO_TOUKEN', payload)
      setToken(payload)
    }
  },
  actions: {},
  modules: {}
})
