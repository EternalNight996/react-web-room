/* ************************************************ */
/*File Name: auth.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月12日 星期六 09时50分06秒
*/

// 工具
import Schema from '../middlewares/schemas.js'
import {dispatchEmit, dispatchAction} from './common.js' // 命令
// 常量与动作
import {
  POST_LOGIN,
  POST_REGISTER,
  LOGOUT,
} from '../constants/auth.js'
import {POST, USER_API, LOGIN_API} from '../constants/axiosEmit.js'
import {redirectLogin} from './redirect.js'

export const postLogin = dispatchAction(POST_LOGIN)
export const postLoginEmit = async (params) => {
  const json = {
    endpoint: LOGIN_API,
    parameters: {...params},
    httpRequestType: POST
  }
  const result = await dispatchEmit(POST_LOGIN)(json)
  postLogin(result)
}
export const postRegister = dispatchAction(POST_REGISTER)
export const postRegisterEmit = async (params) => {
  const json = {
    endpoint: USER_API,
    parameters: {...params},
    httpRequestType: POST
  }
  const result = await dispatchEmit(POST_REGISTER)(json)
  postRegister(result)
}
export const logout = async () => {
  await dispatchAction(LOGOUT)()
  redirectLogin()
}
