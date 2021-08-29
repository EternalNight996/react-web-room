/* ************************************************ */
/*File Name: containers/Header.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月23日 星期三 18时14分30秒
*/
// 本地组件
import HeaderManager from '../../components/managers/HeaderManager.jsx'
// 中间价与仓库
import {connect} from 'react-redux'
// 配置
import {configLanguage} from '../../configs/language'


const mapStateToProps = (state) => {
  const userConfigs = state.getIn(['pageUI', 'userConfigs']).toJS()
  const configLang = configLanguage(userConfigs['language'])
  const auth = state.getIn(['auth']).toJS()
  return {
    auth,
    userConfigs,
    language: configLang
  }
}

export default connect(mapStateToProps)(HeaderManager)
