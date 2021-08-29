/* ************************************************ */
/*File Name: routerList.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月06日 星期日 20时32分25秒
*/

// 插件
//import Bundle from '../plugins/Bundle.js';
//import PureRender from '../plugins/PureRender.js'
import { lazy } from 'react'
// 变量与动作
import {
  MAIN_API, CHAT_API, LOGIN_API,
  REGISTER_API
} from '../constants/redirect.js'

// import Login from '../containers/auth/Login.js'
//const Auth = (props) => (<Bundle load={() => import('../containers/auth.js')}>{(Auth) => <Auth {...props}/>}</Bundle>)
const Login = lazy(()=> import('../containers/auth/Login.js'))
const Register = lazy(()=> import('../containers/auth/Register.js'))
const Main = lazy(()=> import('../containers/main/Main.js'))
const Chat = lazy(()=> import('../modules/chat'))

const list =  [
  {
    path: '/',
    name: 'Root',
    redirect: MAIN_API,
  },
  {
    path: `/${LOGIN_API}`,
    name: 'Login',
    component: Login,
    meta: {auth: false}
  },
  {
    path: `/${REGISTER_API}`,
    name: 'Register',
    component: Register,
    meta: {auth: false}
  },
  {
    path: `/${MAIN_API}`,
    name: 'Main',
    component: Main,
    meta: {auth: false},
  },
  {
    path: `/${CHAT_API}`,
    name: 'Chat',
    component: Chat,
    meta: {auth: false}
  }
  /*
  {
    path: `/${CHAT_API}`,
    name: 'Chat',
    component: Chat,
    redirect: `/${CHAT_API}/x`,
    meta: {auth: true},
    role: ['admin', 'user1', 'user2'],
    children: [
      path: `x`,
      name: 'CHAT',
      component: Chat,
      meta: {auth: false}
    ]
  },
  */
]
export default list
