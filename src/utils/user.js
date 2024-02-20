/**
 *获取本地appkey
 * @returns appkey
 */
export const getAppkey = () => localStorage.getItem('appkey')
export const getUsername = () => localStorage.getItem('username')

/**
 * 清空本地appkey
 * @returns ''
 */
export const removeAppkey = () => localStorage.removeItem('appkey')
export const removeUsername = () => localStorage.removeItem('username')

/**
 *将appkey存储到本地
 * @param {string} appkey
 * @returns ''
 */
export const setAppkey = (appkey) => localStorage.setItem('appkey', appkey)
export const setUsername = (username) => localStorage.setItem('username', username)
