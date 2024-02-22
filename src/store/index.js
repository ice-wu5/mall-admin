import Vue from 'vue'
import Vuex from 'vuex'
import layout from '@/store/modules/layout.js'
import user from '@/store/modules/user.js'
import search from '@/store/modules/search.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    layout,
    user,
    search
  }
})
