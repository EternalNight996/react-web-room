/* ************************************************ */
/*File Name: actions/chat.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年07月04日 星期日 16时48分59秒
*/
// 工具
import Schema from '../middlewares/schemas.js'
import {dispatchEmit, dispatchAction} from './common.js' // 命令
// 常量与动作
import {
  INIT_MESSAGES, ADD_MESSAGE,
  UPDATE_MESSAGE, CLEAR_MESSAGES
} from '../constants/message.js'
import {GET, MESSAGE_API} from '../constants/axiosEmit.js'
import {redirectLogin} from './redirect.js'

export const initMessages = dispatchAction(INIT_MESSAGES)
export const initMessagesEmit = async (params) => {
  const json = {
    endpoint: MESSAGE_API,
    parameters: params ? {...params} : null,
    httpRequestType: GET,
    schema: Schema.historyArray
  }
  const rep = await dispatchEmit(INIT_MESSAGES)(json)
  const {type, response} = rep
  if (type === 'SUCCESS') {
    initMessages(response)
  }
}
export const addMessage = dispatchAction(ADD_MESSAGE)
export const addMessageEmit = async (params) => {
  const json = {
  }
}
export const clearMessages = dispatchAction(CLEAR_MESSAGES)
