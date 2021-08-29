/* ************************************************ */
/*File Name: actions/axiosEmit.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月13日 星期日 13时37分27秒
*/
import axios from 'axios'; // 基于promise的HTTP库,主要的核心
import _ from 'lodash'; // 转换格式简化操作工具
import {normalize} from 'normalizr'
import {
  GET, POST, PUT, PATCH, DELETE,
  AUTH_TYPE
}from '../constants/axiosEmit.js'
import {USER_TOKEN} from '../constants/configs.js'
import {configLanguage} from '../configs/language'
import store from '../store'
//import storage from './storage.js'
import cookies from './uCookie.js'

//const ROOT_URL = process.env.REACT_APP_BACKEND_URL || '';
// 获取服务器URL配置
const {HOST, PORT} = require('../configs/serverURL.js').socket
const siteReg = /.cn|.com/g
const ROOT_URL = (siteReg.test(HOST.substring(HOST.length-4)))
  ? HOST
  : (PORT==='80' ? HOST : `${HOST}:${PORT}`);

// 创建基础设置
const instance = axios.create({
  timeout: 2500, // 设置tiemout时间
  headers: { // 头文件
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",

  },
  /* 代理配置
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },
  */
})

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    config.data = JSON.stringify(config.data);
    config.headers = {
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Removes (sub-) 删除JSON数据中含null和undefine的值
 * @param  {object} jsonObject 接收一个JSON对象
 * @returns {object} 返回一个Removes处理的JSON
 */
export function filterNil(jsonObject) {
  return _.omitBy(jsonObject, _.isNil);
}

/**
 * 执行多个在endpoint上的HTTP请求
 * @param {RequestType} httpRequestType HTTP请求类型: GET, POST, PUT...
 * @param {string} endpoint   URL发送请求到点
 * @param {object} parameters JSON格式参数{JSON: "something"}
 * @param {object} schema     JSON数据规范化，修正不规范格
 * @returns {Promise}         返回Promise期约
 */
export function executeRequest(httpRequestType, endpoint, parameters, schema) {
  const language = configLanguage(store.getState().getIn(['pageUI', 'userConfigs']).toJS()['language'])
  const params = parameters === null ? null : filterNil(parameters);
  let url = `${ROOT_URL}/${endpoint}`;

  // 如果http请求类型没设置则默认为GET
  if (httpRequestType === null) {
    httpRequestType = GET;
  }

  let request;
  switch (httpRequestType) {
    case GET:
      const config = {
         "Content-Type": "application/json; charset=utf-8",
         Accept: "application/json",
         Authorization: AUTH_TYPE+cookies.get(USER_TOKEN),
      }
      if (params === null) {
        request = instance.get(url, {
          headers: config,
        });
      } else {
        request = instance.get(url, {
        headers: config,
          ...params
        });
      }
      break;
    case POST:
      request = instance.post(url, {
        ...params
      });
      break;
    case PATCH:
      if (params !== null) {
        request = instance.patch(url, {
          ...params
        });
      } else {
        throw new Error(language['ErrorPatchNull']);
      }
      break;
    case PUT:
      if (params !== null) {
        request = instance.put(url, {
          ...params
        });
      } else {
        throw new Error(language['ErrorPutNull']);
      }
      break;
    case DELETE:
      request = instance.delete(url);
      break;
    default:
      break;
  }

  return new Promise((resolve, reject) => {
    request
      .then(response => ({ json: response.data, response }))
      .then(({ json, response }) => {
        resolve(httpRequestType === GET ? normalize(json, schema) : response.data);
      }).catch(error => {
        let message = error.response ? error.response.data : error.message;
        reject({ message });
      });
  });
}

function saltWith() {

}
