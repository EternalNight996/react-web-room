/* ************************************************ */
/*File Name: login2.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年05月31日 星期一 16时45分48秒
*/

import axios from 'axios'; // AJAX交互接口
import cookie from 'react-cookies'; // 引入cookiess保存登录信息
import {message} from 'antd'; // 导入错误消息模块

const {POST, HOST} = require('../configs/serverURL.js').socket
const base = `${HOST}:${POST}`

// 创建基础设置
const instance = axios.create({
  /* 默认url
  baseURL: `${base}`,
  */
  timeout: 2500, // 设置默认请求发送超时2.5s
  headers: {
   "Content-Type": "application/json; charset=utf-8",
   Accept: 'application/json',
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
});

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      "Content-Type": "application/json; charset=utf-8",
      Accept: 'application/json',
      }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// http response 拦截器
instance.interceptors.response.use(
  (response) => {
    if (response.data.errCode === 2) {
      console.log("过期");
    }
    return response;
  },
  (err) => {
    try {
      // 处理提示服务器返回的错误信息!!!
      let msgfull = "";
      for (let key in err.response.data) {
        msgfull += key+':'+err.response.data[key]+'\x0A';
      }
      message.error(msgfull);
      if (err.response.data['code'] !== 8) {
        alert(err.response.data['detail']);
      }
      return err
    } catch(err) {
      return err
    }
  }
);

  // 默认接口真允许打印其内容,用以测试
  // 范例： http.print("post", "http://127.0.0.1:8080/login/",
  //  {username: "admin", password: "admin123"})
const test = async (fetch_, URL, params) => {
  await new Promise((resolve,reject) => {
    new axios[fetch_](URL, params).then(rep => {
      console.log("config:",rep.config);
      console.log("data:",rep.data);
      console.log("headers:",rep.headers);
      console.log("request:",rep.request);
      console.log("status:",rep.status);
      console.log("statusText:",rep.statusText);
    }).catch(err => {
      //已被处理
    })
  })
};

// 返回接口
export default {
  test: test,
  // ---登录 (POST)---
  async loginAPI(params) {
    return await instance.post(`${base}/v1/login`, params).then(rep => {
      return rep;
    })
  },
  // ---注册 (POST)---
  async registerAPI(params) {
    return await instance.post(`${base}/v1/user`, params).then(rep => {
      return rep;
    })
  },

  //---登录后获取用户信息 (GET)---
  async getUserInfoAPI(params) {
    const info = cookie.load('userInfo');
    return await instance.get(`${base}/v1/login`, {
      params,
      headers:{
        authorization: 'Bearer '+((info) ? info.token : ''),
      }
    }).then(rep => {
      return rep;
    }).catch(err => {
      return err;
    })
  },
  //---修改密码 (POST)---
  async changePasswdAPI(params) {
    return await instance.post(`${base}/v1/user`, {
      params,
    }).then(rep => {
      return rep;
    })
  },
  //---修改用户信息 (PUT)---
  async changeUserInfoAPI(params) {
    const info = cookie.load('userInfo');
    return await instance.put(`${base}/v1/user`, {
      params,
      headers:{
        authorization: 'Bearer '+((info) ? info.token : ''),
      },
    }).then(rep => {
      return rep;
    })
  },
  //---删除用户 (delete)---
  async deleteUserAPI(params) {
    const info = cookie.load('userInfo');
    return await instance.delete(`${base}/v1/user`, {
      params,
      headers: {
        authorization: 'Bearer '+((info) ? info.token : ''),
      }
    }).then(rep => {
      return rep;
    })
  },
  // ---验证JWT TOKEN (GET), Bearer是认证框架!所以token开头要设置---
  async authHeaderAPI() {
    const info = cookie.load('userInfo');
    return await instance.get(`${base}/v1/token/info`, {
      headers: {
        authorization: 'Bearer '+((info) ? info.token : ''),
      }
    }).then(rep => {
      return rep;
    }).catch(err => {
      return err;
    })
  },
  // 接收消息
  async getMessageAPI() {
    const info = cookie.load('userInfo');
    return await instance.get(`${base}/v1/message`, {
      headers: {
        authorization: 'Bearer '+((info) ? info.token : ''),
      }
    }).then(rep => {
      return rep;
    }).catch(err => {
      return err;
    })
  },
 // 发送消息
  async postMessageAPI(params) {
    const info = cookie.load('userInfo');
    return await instance.post(`${base}/v1/message`, {
      params,
      headers: {
        authorization: 'Bearer '+((info) ? info.token : ''),
      }
    }).then(rep => {
      return rep;
    }).catch(err => {
      return err;
    })
  }
};
