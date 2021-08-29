/* ************************************************ */
/*File Name: containers/Layout.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月24日 星期四 18时21分06秒
*/
import {connect} from 'react-redux'
import Layout from '../../components/layout/Layout.jsx'

export default connect((state)=>({
  theme: state.getIn(['pageUI','userConfigs']).toJS()['theme']
}))(Layout)
