import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import core from './modules/core'

Vue.use(Vuex)

const state = {
  debug: process.env.NODE_ENV !== 'production',
  token: '',
  name: '', // 用户真是姓名
  currentRoleId: '', // 当前角色id
  roleList: '', // 当前用户所拥有的角色
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  setLoginInfo(state, payload) {
    state.token = payload.token
    state.name = payload.name
    state.currentRoleId = payload.currentRoleId
    state.roleList = payload.roleList
  }
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    core
  },
  plugins: [createPersistedState()]
})
export default store