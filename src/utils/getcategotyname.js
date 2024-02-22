// 根据categoryId获取categoryName
export const getCategoryNameByCategoryId = (id, list) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      return list[i].name
    }
  }
}
