export const getTextByStatus = (value) => {
  switch (value) {
    case 1:
      return '上架'
    case 0:
      return '下架'

    default:
      return ''
  }
}
