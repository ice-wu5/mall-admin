import request from '@/utils/request.js'
// 获取搜索列表
export const getProdLists = (params) => request.get('/products/all', { params })
// 获取类目列表
export const getCategoryList = (params) => request.get('/category/all', { params })
// 删除商品
export const deletProduct = (id) => request.delete(`/products/${id}`)
// 新增或编辑商品
export const addOrUpdateProd = (data) => {
  if (data.id) {
    // 编辑
    return request.put('/products/edit', data)
  } else {
    // 新增
    return request.post('/products/add', data)
  }
}
// 获取商品详情
export const getProdDetails = (id) => request.get(`/products/${id}`)
