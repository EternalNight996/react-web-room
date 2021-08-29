/* ************************************************ */
/*File Name: utils/cookie.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月14日 星期一 13时34分40秒
*/
import cookie from 'react-cookies'
import immutable from 'immutable'

// 获取cookie，返回immutable JSON
export const getCookie = (target) => {
  let result = null
  const cook = immutable.fromJS(cookie.load(target))
  if (cook) {
    const now = new Date().getTime()
    if (!cook.getIn(['expire']) || now > cook.getIn(['expire'])) {
      cookie.remove(target)
    }else {
      result = cook.getIn(['data']).toJS()
    }
  }
  return result
}

// 存储cookie,封装immutable JSON
export const setCookie = (target, data, after) => {
  let expires = new Date().getTime() + 60*1000 // 默认过期时间戳
  if (!target || !data) {
    return
  }
  if (after && typeof(after) === 'number') {
    expires = after
  }
  const json = immutable.fromJS({data:data, expires: expires})
  cookie.save(target, json)
  return 1
}

// 移除cookie
export const removeCookie = (target) => {
  if (!target) {
    return
  }
  cookie.remove(target)
  return 1
}

const myCookies = {
  get: getCookie,
  set: setCookie,
  remove: removeCookie
}
export default myCookies
