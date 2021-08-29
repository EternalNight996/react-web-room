// 工具
import immutable from 'immutable'
import browers from '../utils/browers.js' // 浏览器设备类型
import cookies from '../utils/uCookie.js'
import cryptos from '../utils/cryptos.js'
// 常量与动作
import {
  SHIFT_LANGUAGE, SHIFT_THEME, SAVE_USER_CONFIGS
} from '../constants/pageUI.js'
import {USER_CONFIGS} from '../constants/configs.js'

const userConfigs = cryptos.AES.decode(cookies.get(USER_CONFIGS),USER_CONFIGS, true)
let defaultState = immutable.fromJS({
  userConfigs: userConfigs ? userConfigs
    :
    {
      language: browers.language==='zh-cn' ? 'zh_CN' : 'en_US',
      theme: 'dark',
    }
});

export default function reducer(state = defaultState,action) {
  switch (action.type) {
    case SHIFT_LANGUAGE:
      const regZH = /zh*/i
      const language = state.getIn(['userConfigs', 'language'])
      return state.setIn(['userConfigs','language'], regZH.test(language) ? 'en_US' : 'zh_CN')
    case SHIFT_THEME:
      const theme = state.getIn(['userConfigs','theme'])
      return state.setIn(['userConfigs','theme'], theme==='dark' ? 'light' : 'dark')
    case SAVE_USER_CONFIGS:
      const userConfigs = state.getIn(['userConfigs']).toJS()
      const expires = new Date().getTime() + 365*24*3600*1000 // 1年
      const options = {path: '/', expires: new Date(expires)}
      const encode = cryptos.AES.encode(userConfigs, USER_CONFIGS, true)
      cookies.set(USER_CONFIGS, encode, options)
      return state
    default:
      return state
  }
}
