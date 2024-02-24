// 根据categoryList获取subcategoryList
export const getSubCategoryListByCategoryList = (id, list) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      return list[i].c_items
    }
  }
}
