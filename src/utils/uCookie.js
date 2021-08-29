/* ************************************************ */
/*File Name: test.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年07月02日 星期五 17时51分34秒
*/
import Cookies from 'universal-cookie'
import immutable from 'immutable'
import {USER_TOKEN, USER_CONFIGS, USER_INFO} from '../constants/configs.js'


//const ROOT_URL = process.env.REACT_APP_BACKEND_URL || '';
// 获取服务器URL配置
//const {HOST, PORT} = require('../configs/serverURL.js').socket;
//const ROOT_URL = ((`${PORT}`==='80'|| !`${PORT}`)? `${HOST}` : `${HOST}:${PORT}`) || '';

// 获取单个cookie
// name (string)
// noParse (boolean) 是否取消解析，默认false
export function getCookie(name, noParse) {
  let result = null
  var cookies = new Cookies()
  if (!name || typeof name !== 'string') {
    return
  }
  const get_ = cookies.get(name, {doNotParse: noParse ? true : false})
  if (get_) {
    return get_
  }else {
    removeCookie(name)
    return
  }
}

// 存储cookie
// name (string)
// data (string || {})
// options {}
export function setCookie(name, data, options) {
  //const URL = HOST.replace(/http:\/\/:*/g, '')

  if (!name|| !data || typeof name !== 'string') {
    return
  }else if (options && typeof options !== 'object') {
    return
  }

  var cookies = new Cookies()
  cookies.set(name, data, options ? options :{
    path: '/',
    expires: new Date(new Date().getTime()+1000*3600*24), // Date()格式
    //domain: URL,
    secure: false,
    httpOnly: false,
  })
  return 1
}

// 移除cookie
// name (string)
// options {}
export function removeCookie(name, options) {
  if (!name || typeof name !== 'string') {
    return
  }else if (options && typeof options !== 'object') {
    return
  }
  var cookies = new Cookies()
  cookies.remove(name, options ? options : {
    path: '/',
  })
  return 1
}

// 创建cookie context
// header (string|object) 特殊cookie header or object
export function createConstructor(header) {
  if (!header) {
    return
  }
  var cookies = new Cookies()
  return cookies.constructor({cookieHeader: header})
}

// 监听cookie 添加
// callback function() 回调name, value, options
export function addChangeListener(callback) {
  if (!callback || typeof callback !== 'function') {
    return
  }
  var cookies = new Cookies()
  return cookies.addChangeListener(callback)
}
// 监听cookie 移除
// callback function() 回调name, value, options
export function removeChangeListener(callback) {
  if (!callback || typeof callback !== 'function') {
    return
  }
  var cookies = new Cookies()
  return cookies.removeChangeListener(callback)
}

// 获取所有cookie
// noParse (boolean) 默认false
export function getAllCookie(noParse) {
  var cookies = new Cookies()
  return cookies.getAll({doNotParse: noParse ? true : false})
}
// 清理所有cookie
export function clearCookie() {
  removeCookie(USER_INFO)
  removeCookie(USER_TOKEN)
  removeCookie(USER_CONFIGS)
  return
}

const myCookies = {
  set: setCookie,
  get: getCookie,
  getAll: getAllCookie,
  remove: removeCookie,
  create: createConstructor,
  addListener: addChangeListener,
  removeListener: removeChangeListener,
  clear: clearCookie,
}

export default myCookies
