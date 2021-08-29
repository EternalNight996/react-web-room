/* ************************************************ */
/*File Name: chat.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年07月04日 星期日 21时34分19秒
*/

import immutable from 'immutable'

import {
  INIT_MESSAGES,
  ADD_MESSAGE,
  UPDATE_MESSAGE,
  CLEAR_MESSAGES,
} from '../constants/message.js'

let defaultState = immutable.fromJS({})

export default function reducer(state=defaultState, action) {
  switch (action.type) {
    case INIT_MESSAGES: {
      return state.merge(immutable.fromJS(action.payload))
    }
    case ADD_MESSAGE: {
      return state.merge(immutable.fromJS(action.payload))
    }
    case UPDATE_MESSAGE: {
      return state.mergeDeep(immutable.fromJS(action.payload))
    }
    case CLEAR_MESSAGES: {
      let messages = state
      action.payload.forEach((history) => messages = messages.delete(history))
      return messages
    }
    default:
      return state
  }
}
