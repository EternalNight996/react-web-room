// 工具
import { combineReducers } from 'redux-immutable'
// 业务
import auth from './auth.js'
import pageUI from './pageUI.js'
import message from './message.js'
const rootReducer = combineReducers({
  auth,
  pageUI,
  message
});
export default rootReducer;
