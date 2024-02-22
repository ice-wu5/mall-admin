import Vue from 'vue'
import Vuex from 'vuex'
import { getCategoryList, getProdLists } from '@/api/prod.js'

Vue.use(Vuex)

export default {
  namespaced: true,
  state () {
    return {
      categoryList: [],
      searchParams: {
        searchWord: '',
        category: '',
        page: 1,
        size: 10
      },
      total: 0,
      prodList: []
    }
  },
  getters: {
  },
  mutations: {
    SET_CATEGORYLIST (state, value) {
      state.categoryList = value
    },
    SET_PRODLIST (state, value) {
      state.prodList = value
    },
    SET_TOTAL (state, value) {
      state.total = value
    },
    SET_PAGE (state, value) {
      state.searchParams.page = value
    },
    SET_SIZE (state, value) {
      state.searchParams.size = value
    }
  },
  actions: {
    async  getCategoryList ({ commit }) {
      try {
        const res = await getCategoryList()
        commit('SET_CATEGORYLIST', res.data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async getProdList ({ commit, state }) {
      try {
        const res = await getProdLists(state.searchParams)
        commit('SET_PRODLIST', res.data)
        commit('SET_TOTAL', res.total)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async handleCurrentPageChange ({ commit, dispatch }, value) {
      commit('SET_PAGE', value)
      try {
        await dispatch('getProdList')
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async handlePerSizeChange ({ commit, dispatch }, value) {
      commit('SET_SIZE', value)
      try {
        await dispatch('getProdList')
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
}
