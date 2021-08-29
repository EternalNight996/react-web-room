/* ************************************************ */
/*File Name: reducers/login.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月12日 星期六 07时28分25秒
*/
// 工具
import immutable from 'immutable'
import cookies from '../utils/uCookie.js'
// 动作与常量
import {
  POST_LOGIN, POST_REGISTER, LOGOUT
} from '../constants/auth.js'
import {
  USER_TOKEN, USER_INFO
} from '../constants/configs.js'

let defaultState = immutable.fromJS({
  userInfo: {},
  isLogined: cookies.get(USER_TOKEN) ? true : false,
  type: ''
})

export default function reducer(state=defaultState,action){
  switch (action.type) {
    case POST_LOGIN:
      const payload = {...action.payload}
      if (payload.type==='SUCCESS') {
        const expires = new Date().getTime() + 365* 24 * 3600 * 1000 // 一天后过期
        const {token, id, username} = payload.response
        const options = {
          path: '/',
          expires: new Date(expires)
        }
        cookies.set(USER_TOKEN, token, options) // 存储用户token
        state = state.set('type', 'SUCCESS')
          .set('isLogined', true)
          .set('userInfo', {id, username})
      }else{
        state = state.set('type', 'FAILED')
      }
      return state
    case POST_REGISTER:
      return state.merge({...action.payload})
    case LOGOUT:
      cookies.clear()
      return state.clear()
    default:
      return state
  }
}
