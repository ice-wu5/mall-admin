import request from '@/utils/request.js'
// 获取搜索列表
export const getProdLists = (params) => request.get('/products/all', { params })
// 获取类目列表
export const getCategoryList = (params) => request.get('/category/all', { params })
// 删除商品
export const deletProduct = (id) => request.get(`/products/${id}`)
