import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  namespaced: true,
  state () {
    return {
      isCollapse: false,
      marginLeft: 50
    }
  },
  getters: {
  },
  mutations: {
    SET_ISCOLLAPSE (state, value1, value2) {
      state.isCollapse = value1
      state.marginLeft = value2
    }
  },
  actions: {
    changeIsCollapse ({ commit }, value1) {
      const unValue = !value1
      const value2 = value1 ? this.marginLeft : 200
      commit('SET_ISCOLLAPSE', unValue, value2)
    }
  }
}
