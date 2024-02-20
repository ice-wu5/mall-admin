import Vue from 'vue'
import Vuex from 'vuex'
import { login } from '@/api/user.js'
import { setAppkey, getAppkey } from '@/utils/user.js'

Vue.use(Vuex)

export default {

  namespaced: true,
  state () {
    return {
      appkey: getAppkey() || '',
      userInfo: {
        username: '',
        role: '',
        email: ''
      }
    }
  },
  getters: {
  },
  mutations: {
    SET_APPKEY (state, value) {
      state.appkey = value
    },
    SET_USERINFO (state, value) {
      const { username, role, email } = value
      state.userInfo.username = username
      state.userInfo.role = role
      state.userInfo.email = email
    }
  },
  actions: {
    async login ({ commit }, data) {
      try {
        const res = await login(data)
        console.log(res)
        const { appkey } = res
        setAppkey(appkey)
        commit('SET_APPKEY', appkey)
        commit('SET_USERINFO', res)

        return 'ok'
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
}
