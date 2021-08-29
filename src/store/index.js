// 中间件
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
// 业务曾
import reducer from '../reducers'
// 工具
import { composeWithDevTools } from 'redux-devtools-extension'

let store
if(process.env.NODE_ENV === 'development'){// 调试模式
  const extend = composeWithDevTools(applyMiddleware(thunk))
  store = createStore(reducer,extend)
  const hot = module.hot ? module.hot : null
  if (hot) { // 热启动
    hot.accept('../reducers', ()=>{
      const nextReducer = require('../reducers').defualt
      store.replaceReducer(nextReducer)
    })
  }
} else{ // 正常模式
  const extend = compose(applyMiddleware(thunk))
  store = createStore(reducer, extend)
}
let unsubscribe = store.subscribe(() =>{
  console.log('store监控:', store.getState().toJS()) // 监听打印所有动作
  }
);
export default store
