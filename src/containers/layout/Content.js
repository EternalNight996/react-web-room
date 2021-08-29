/* ************************************************ */
/*File Name: containers/Content.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月21日 星期一 22时36分01秒
*/
import Content from '../../components/layout/Content.jsx'

import {connect} from 'react-redux'

export default connect((state)=>({
  theme: state.getIn(['pageUI', 'userConfigs']).toJS()['theme']
}))(Content)
