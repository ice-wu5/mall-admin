/**
 *获取本地appkey
 * @returns appkey
 */
export const getAppkey = () => localStorage.getItem('appkey')

/**
 * 清空本地appkey
 * @returns ''
 */
export const removeAppkey = () => localStorage.removeItem('appkey')

/**
 *将appkey存储到本地
 * @param {string} appkey
 * @returns ''
 */
export const setAppkey = (appkey) => localStorage.setItem('appkey', appkey)
