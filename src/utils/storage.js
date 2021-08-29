/* ************************************************ */
/*File Name: utils/storage.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月14日 星期一 10时41分24秒
*/
import immutable from 'immutable'

// 获取Storage返回immutable格式JSON
// name (string)
export const getStorage = (name) => {
  let result = null
  const response = window.localStorage.getItem(name)
  const storage = immutable.fromJS(JSON.parse(response))
  if (storage) {
    const now = new Date().getTime()
    if (!storage.getIn(['expires']) || now > storage.getIn(['expires'])) {
      window.localStorage.removeItem(name)
    }else if (typeof response === 'string') { // 这里开始后面可以扩展
      result = storage.getIn(['data']).toJS()
    }
  }
  return result
}

// 存储数据
// name (string)
// data (string || object)
// after (string || number)
export const setStorage = (name, data, after) => {
  let expires = new Date().getTime() + 3600 * 1000 *24 // 默认过期时间戳
  if (!name || typeof name !=='string' || !data) {
    return
  }
  if (after && typeof after === 'number'
    || typeof after === 'string') {
    expires = after
  }
  const json = JSON.stringify({
    data: data,
    expires: expires
  })
  return localStorage.setItem(name, json)
}

// 移除数据
// name (string)
export const removeStorage = (name) => {
  if (!name || typeof name !== 'string') {
    return
  }
  localStorage.removeItem(name)
  return 1
}

// 清除所有storage
export const clearStorage = () => {
  return localStorage.clear()
}
const storage = {
  get: getStorage,
  set: setStorage,
  remove: removeStorage,
  clear: clearStorage
}
export default storage
