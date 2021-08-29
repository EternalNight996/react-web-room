/* ************************************************ */
/*File Name: middlewares/axiosEmit.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月13日 星期日 10时07分46秒
*/
// 配置
import {configLanguage} from '../configs/language'
// 工具
import store from '../store'
// 动作与常量
import {
  GET, POST, PUT, DELETE, PATCH, REDIRECT,
} from '../constants/axiosEmit.js' // 接入口
import {
  POST_LOGIN, POST_REGISTER
} from '../constants/auth.js'
import {executeRequest} from '../utils/axiosEmit.js'
// 组件
import {message} from 'antd'

// 解析指定的action与传递的特殊属性
const axiosMiddle = (action) => {
  if (action.payload === null) {
    return action;
  }

  // 服务器接口、参数、schemaXML标准、动作类型、请求类型
  const language = configLanguage(store.getState().getIn(['pageUI', 'userConfigs']).toJS()['language'])
  const { endpoint, parameters, schema, httpRequestType } = action.payload;
  const actionType = action.type

  // 验证获取的元素,是否规范的类型!
  if (typeof endpoint !== 'string') {
    throw new Error(language.Error['endpointEmit'])
  }
  if (!schema && (!httpRequestType || httpRequestType === GET)) {
    throw new Error(language.Error['schemaEmit'])
  }
  if ((httpRequestType !== REDIRECT && typeof(actionType) !== 'string')) {
    throw new Error(language.Error['arrayEmit'])
  }

  // 定义一个额函数添加mutations建立新action
  function actionWith(mutations) {
    const newAction = Object.assign({}, action, mutations);
    delete newAction.payload;
    return newAction;
  }

  if (httpRequestType === null || httpRequestType !== REDIRECT) {
    /*
    message.loading({
      content: language.Public['loading'],
      maxCount: 1
    })
    */
    return executeRequest(httpRequestType, endpoint, parameters, schema).then(
      response => {
        switch (actionType) {
          case POST_LOGIN:
            message.success(response.username+' '+language.Public['male']+'/'
              +language.Public['female']+':'+language.Socket.SUCCESS['login'])
            break
          case POST_REGISTER:
            message.success(response.username+' '+language.Public['male']+'/'
              +language.Public['female']+':'+language.Socket.SUCCESS['register']+response.id)
            break
          default:
            break
        }
        return actionWith({
          parameters,
          response,
          type: 'SUCCESS',
        })
      },
      error => {
        const reg = /timeout/g
        if (error.message && reg.test(error.message)){
          message.error(language.Socket.ERROR['server'])
        }else{
          switch (actionType) {
            case POST_LOGIN:
              message.error(language.Socket.ERROR['login'])
              break
            case POST_REGISTER:
              if (error.message.code === 6){
                message.error(language.Socket.ERROR['registerExists'])
              }else{
                message.error(language.Socket.ERROR['register'])
              }
              break
            default:
              break
          }
        }
        return actionWith({
          parameters,
          response: { errorMessage: error.message || 'Unexpected error' },
          type: 'FAILED',
        })
      }
    )
  } else if (httpRequestType !== null && httpRequestType === REDIRECT) {
    // 重定向浏览器用户代理
    window.location = endpoint;
  }
};

export default axiosMiddle;
