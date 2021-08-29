/* ************************************************ */
/*File Name: actions/redirect.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月20日 星期日 12时38分07秒
*/
import {dispatchEmit} from './common.js'
import {REDIRECT} from '../constants/axiosEmit.js'
import {
  REDIRECT_MAIN, REDIRECT_AUTH, REDIRECT_CHAT, REDIRECT_LOGIN, REDIRECT_REGISTER,
  MAIN_API, CHAT_API, LOGIN_API, REGISTER_API
} from '../constants/redirect.js'

export const redirectMain = (endpoint) => {
  let end = ''
  if (typeof endpoint === 'string') {
    end = endpoint
  }
  dispatchEmit(REDIRECT_MAIN)({
    endpoint: `/${MAIN_API}`+end,
    httpRequestType: REDIRECT
  })
}
export const redirectChat = (endpoint) => {
  let end = ''
  if (typeof endpoint === 'string') {
    end = endpoint
  }
  dispatchEmit(REDIRECT_CHAT)({
    endpoint: `/${CHAT_API}`+end,
    httpRequestType: REDIRECT
  })
}
export const redirectLogin = (endpoint) => {
  let end = ''
  if (typeof endpoint === 'string') {
    end = endpoint
  }
  dispatchEmit(REDIRECT_LOGIN)({
    endpoint: `/${LOGIN_API}`+end,
    httpRequestType: REDIRECT
  })
}
export const redirectRegister = (endpoint) => {
  let end = ''
  if (typeof endpoint === 'string') {
    end = endpoint
  }
  dispatchEmit(REDIRECT_REGISTER)({
    endpoint: `/${REGISTER_API}`+end,
    httpRequestType: REDIRECT
  })
}
