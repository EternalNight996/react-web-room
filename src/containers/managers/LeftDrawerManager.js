/* ************************************************ */
/*File Name: containers/layout.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月20日 星期日 13时35分47秒
*/
// 主要组件
import LeftDrawerManager from '../../components/managers/LeftDrawerManager.jsx'
// 仓库与中间件
import { connect } from 'react-redux'
// 配置
import {configLanguage} from '../../configs/language'

// state是仓库store资源
const mapStateToProps = (state/*,可扩展props*/) => {
  const userConfigs = state.getIn(['pageUI','userConfigs']).toJS()
  const auth = state.getIn(['auth']).toJS()
  const configLang = configLanguage(userConfigs['language'])
  return {
    language: configLang,
    auth,
    userConfigs,
  }
}
export default connect(mapStateToProps)(LeftDrawerManager)
