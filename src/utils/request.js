import axios from 'axios'
import store from '@/store/index.js'
const instance = axios.create({
  baseURL: '/api',
  timeout: 1000
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  if (store.state.user.appkey) {
    config.params = {
      ...config.params,
      appkey: store.state.user.appkey
    }
  }
  // Do something before request is sent
  return config
})

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  const { status } = response.data
  if (status === 'success') {
    return response.data.data
  } else {
    return Promise.reject(response.data.msg || 'Error')
  }
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default instance
