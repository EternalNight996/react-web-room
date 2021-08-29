/* ************************************************ */
/*File Name: containers/Login.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月26日 星期六 16时32分35秒
*/

import {connect} from 'react-redux'
import Register from '../../modules/auth/Register.jsx'
import {configLanguage} from '../../configs/language'

const mapStateToProps = (state) => {
  const userConfigs = state.getIn(['pageUI','userConfigs']).toJS()
  const configLang = configLanguage(userConfigs['language'])
  const auth = state.getIn(['auth']).toJS()
  return {
    language: configLang,
    userConfigs,
    auth
  }
}
const mapDispatchToProps = () =>{}
export default connect(mapStateToProps/*,mapDispatchToProps*/)(Register)
