import request from '@/utils/request.js'

export const login = (data) => request.post('/passport/login', data)
