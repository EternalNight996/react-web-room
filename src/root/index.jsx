/* ************************************************ */
/*File Name: PrivateRoute.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月06日 星期日 20时54分43秒
*/

// 主要
import React, {Suspense} from 'react'
import {useHistory, BrowserRouter, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from '../store'

// 工具与监听
import routerFun from '../utils/routerFun.js'
// 本地组件
import Layout from '../containers/layout/Layout.js'
import Content from '../containers/layout/Content.js'
import HeaderManager from '../containers/managers/HeaderManager.js'
import FooterManager from '../containers/managers/FooterManager.js'
import LeftDrawerManager from '../containers/managers/LeftDrawerManager.js'
import MenusTool from '../containers/menus/MenusTool.js'

//import {FloatMouse} from '../components/EventListeners.jsx'
import MoveBox from '../components/decorates/MoveBox.jsx'

// 配置
import '../css/root.css'

const routesList = require('../configs/routesList.js').default

function PrivateRoute() {
  return (
    <Provider store={store}>
      <BrowserRouter history={useHistory}>
        <Layout>
          <LeftDrawerManager />
          <HeaderManager />
          <MoveBox />
           <Suspense fallback={<div>Loading...</div>}>
             <Switch>
               {routerFun(routesList)}
             </Switch>
           </Suspense>
          <FooterManager />
          <MenusTool />
        </Layout>
      </BrowserRouter>
    </Provider>
  )
}


// withRouter 向下层传递参数
export default PrivateRoute;
