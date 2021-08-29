/* ************************************************ */
/*File Name: containers/Main.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月21日 星期一 16时42分50秒
*/
// 本地组件
import Main from '../../modules/main'
// 中间件与仓库
import {connect} from 'react-redux'

// 配置
import {configLanguage} from '../../configs/language'

// state是仓库store资源
const mapStateToProps = (state/*,可扩展props*/) => {
  const auth = state.getIn(['auth']).toJS()
  const userConfigs = state.getIn(['pageUI','userConfigs']).toJS()
  const configLang = configLanguage(userConfigs['language'])
  return {
    auth,
    language: configLang,
    userConfigs,
  }
}
export default connect(mapStateToProps)(Main)
