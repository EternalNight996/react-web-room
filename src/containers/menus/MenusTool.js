/* ************************************************ */
/*File Name: containers/MenusTool.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月25日 星期五 01时44分00秒
*/
import {connect} from 'react-redux'
import MenusTool from '../../components/menus/MenusTool.jsx'
import {configLanguage} from '../../configs/language'

export default connect((state)=> {
  const userConfigs = state.getIn(['pageUI', 'userConfigs']).toJS()
  const configLang = configLanguage(userConfigs['language'])
  return {
    userConfigs,
    language: configLang
}})(MenusTool)
