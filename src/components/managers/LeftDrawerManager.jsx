/* ************************************************ */
/*File Name: components/sider.jsx
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月17日 星期四 14时18分44秒
*/

//
import React,{Component} from 'react'
// 动作与常量
import {logout} from '../../actions/auth.js'
// 组件
import {Button,Modal} from 'antd'
// Icon 图标
import {
  ExclamationCircleOutlined,
} from '@ant-design/icons'
// 本地组件
import MenusDrawer from '../menus/MenusDrawer.jsx'

const {confirm} = Modal

function destroyAll() {
  Modal.destroyAll()
}

class LeftDrawerManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      placement: 'left'
    }
  }

  showConfirm = () => {
    confirm({
      title: <>{this.props.language.Public['logout']}</>,
      icon: <ExclamationCircleOutlined />,
      content: <Button onClick={destroyAll}>{this.props.language.Public['quit']}</Button>,
      onOk() {
        logout()
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      }
    })
  }
  showDrawer = () => {
    this.setState({visible: true})
  }
  onClose = () => {
    this.setState({visible: false})
  }
  render() {
    return (
      <div className="left-drawer-settings">
        <MenusDrawer {...this}{...this.props} />
      </div>
    )
  }
}
export default LeftDrawerManager
