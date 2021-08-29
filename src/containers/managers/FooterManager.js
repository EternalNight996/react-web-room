/* ************************************************ */
/*File Name: containers/Footer.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月25日 星期五 14时22分03秒
*/
import {connect} from 'react-redux'
import FooterManager from '../../components/managers/FooterManager.jsx'
import {configLanguage} from '../../configs/language'

const mapStateToProps = (state) => {
  const userConfigs = state.getIn(['pageUI','userConfigs']).toJS()
  const configLang = configLanguage(userConfigs['language'])
  return {
    theme: userConfigs['theme'],
    language: configLang
  }

}
export default connect(mapStateToProps)(FooterManager)

