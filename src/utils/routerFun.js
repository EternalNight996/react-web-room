/* ************************************************ */
/*File Name: routes.jsx
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月18日 星期五 17时23分52秒
*/

// 路由层
import {Route, Redirect} from 'react-router-dom'
// 工具
//import storage from '../utils/storage.js'
import cookies from './uCookie.js'
// 常量与接口
import {USER_TOKEN} from '../constants/configs.js'
import {LOGIN_API} from '../constants/redirect.js'
// 页面
import NoPermissions from '../modules/errors/NoPermissions.js'

const userToken = cookies.get(USER_TOKEN)
// 验证身份,每隔60秒向服务器发送验证
function routerFun(list, props) {
  return list.map((route) => {
    if (route.meta&&route.meta.auth) { // 第一层 验证是否需要登录就可以进入
      if (userToken && userToken['token']) { // 验证是否登录
        const permissions = 'admin'; // 放置测试权限
        const role = route.role; // 获取路由权限
        if (role.includes(permissions)) {// 对比权限
          if (route.children) { //路由是否存在子路由
            return <Route key={route.name} path={route.path} render={() =>
            <route.component key={route.name}{...props}>
              {routerFun(route.children, props)}
              <Route key={route.name} exact path={route.path} render={()=><Redirect to={route.redirect}/>}/>
            </route.component>
            }/>
          } else { // 不存在子路由 直接渲染
            return <Route key={route.name} exact path={route.path} component={route.component} />
          }
        } else { // 权限不足
          return <Route key={route.name} exact path={route.path} component={NoPermissions} />
        }
      } else { // 没有登录，重定向login
        return <Redirect key={route.name} to={`/${LOGIN_API}`} />
      }
    } else if (route.redirect) { // 第一层 判断是否重定向
      return <Route key={route.name} exact path={route.path} render={() =><Redirect to={route.redirect} />}/>
    } else { // 不需要登录
      return <Route key={route.name} path={route.path} exact component={route.component} />
    }
  })
}
export default routerFun
