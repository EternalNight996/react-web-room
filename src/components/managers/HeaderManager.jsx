/* ************************************************ */
/*File Name: components/Header.jsx
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月23日 星期三 17时54分57秒
*/
import React,{Component} from 'react'
// ICON 图标
import Icon,{
  UserOutlined, UpOutlined, ExclamationCircleOutlined,
  ExportOutlined, UserAddOutlined, MessageOutlined
} from '@ant-design/icons'
// 组件
import {Button, Modal, Avatar} from 'antd'
import { Link } from 'react-router-dom'
// 本地组件
import MenusDrawer from '../menus/MenusDrawer.jsx'
import Timer from '../../utils/timer.js'
import Login from '../../containers/auth/Login.js'
import Register from '../../containers/auth/Register.js'
import ContentChat from '../../containers/chat/ContentChat.js'
// 监听与工具
import {Controls} from '../../utils/eventListeners.js'
// 动作与常量
import {logout} from '../../actions/auth.js'
import {
  MAIN_API, AUTH_API, LOGIN_API, REGISTER_API
} from '../../constants/redirect.js'
// CSS样式
import '../../css/managers/HeaderManager.css'

const images = require('../../configs/images.js')
const {confirm} = Modal

const links = ({auth, language, theme, onVisibilityChat,
  onVisibilityLogin, onVisibilityRegister}) => {

  const {isLogined, userInfo} = auth
  return (
    <div className="item-link">
      <>
        <Button type="ghost" style={{borderColor: theme==='dark' ? 'var(--colorDarkBlue)' : 'var(--colorGrey)'}}
          onClick={onVisibilityChat}
          icon={<MessageOutlined style={{
            fontSize: 'var(--iconSize)'
          }}/>}
        >
          <span>{language.Chat['title']}</span>
        </Button>
      </>
      {isLogined ?
        <Button type="link">
        {(userInfo && userInfo.avatar)
        ?
        <Avatar src={userInfo.avatar}
          shape="circle" alt={language.Public['avatar']}
        />
        :
        <UserOutlined style={{fontSize: "var(--iconSize)"}}/>
        }
        <span>{userInfo.username}</span>
        </Button>
      :
      <>
        <Button type="ghost" style={{borderColor: theme==='dark' ? 'var(--colorDarkBlue)' : 'var(--colorGrey)'}}
          onClick={onVisibilityLogin}
          icon={<ExportOutlined style={{
            fontSize: 'var(--iconSize)'
          }}/>}
        >
          <span>{language.Public['login']}</span>
        </Button>

        <Button type="ghost" className="item-link-end"
          onClick={onVisibilityRegister}
          style={{borderColor: 'unset'}}
          icon={<UserAddOutlined style={{
            fontSize: 'var(--iconSize)'
          }}/>}
        >
          <span>{language.Public['register']}</span>
        </Button>
      </>}
    </div>
  )
}
/*
      <Link to={`/${LOGIN_API}`} target='_blank'>
        <Button type="ghost" style={{borderColor: theme==='dark' ? 'var(--colorDarkBlue)' : 'var(--colorGrey)'}}
          icon={<ExportOutlined style={{
            fontSize: 'var(--iconSize)'
          }}/>}
        >
          <span>{language.Public['login']}</span>
        </Button>
      </Link>
      <Link to={`/${REGISTER_API}`} target='_blank'>
        <Button type="ghost" className="item-link-end"
          style={{borderColor: 'unset'}}
          icon={<UserAddOutlined style={{
            fontSize: 'var(--iconSize)'
          }}/>}
        >
          <span>{language.Public['register']}</span>
        </Button>
      </Link>
*/

function destroyAll() {
  Modal.destroyAll()
}
class HeaderManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      placement: 'top',
      visibilityLogin: false,
      visibilityRegister: false,
      visibilityChat: false,

    }
    this.onVisibilityLogin = this.onVisibilityLogin.bind(this)
    this.onVisibilityRegister = this.onVisibilityRegister.bind(this)
    this.onVisibilityChat = this.onVisibilityChat.bind(this)
  }

  onVisibilityChat(visibilityChat) {
    this.setState({visibilityChat})
  }
  onVisibilityLogin(visibilityLogin) {
    this.setState({visibilityLogin})
  }
  onVisibilityRegister(visibilityRegister) {
    this.setState({visibilityRegister})
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
    const {auth, userConfigs, language} = this.props
    const {isLogined, userInfo} = auth
    const {theme} = userConfigs
    const {
      onVisibilityLogin,
      onVisibilityRegister,
      onVisibilityChat
    } = this

    return (
      <>
      <Modal
        title=""
        visible={this.state.visibilityChat}
        onOk={()=> onVisibilityChat(false)}
        onCancel={()=> onVisibilityChat(false)}
        closable={false}
        footer={null}
        destroyOnClose={true}
        getContainer={false}
        width={550}
        style={{
          position:'absolute',
          top:'0',
          right:'0',
          width: '550px',
          overflow: 'hidden',
          height: '100%',
        }}
        bodyStyle={{
          position: 'absolute',
          background: theme==='dark' ? 'var(--colorDark)' : 'var(--colorWhite)',
          padding: '0 0 0 0',
          width: '550px',
          top: '0',
          right: '0',
          overflow: 'hidden'
        }}
      >
        <ContentChat authLogin={true} Width={550}
          onVisibilityChat={onVisibilityChat}
        />
      </Modal>

      <Modal
        title=""
        centered
        visible={this.state.visibilityLogin}
        onOk={()=> this.onVisibilityLogin(false)}
        onCancel={()=> this.onVisibilityLogin(false)}
        closable={false}
        footer={null}
        destroyOnClose={true}
        getContainer={false}
        width='400'
        bodyStyle={{
          background: theme==='dark' ? 'var(--colorDark)' : 'var(--colorWhite)',
          padding: '0px 0px 0px 0px',
          width: '400px',
          height: '100%',
        }}
      >
        <Login style={{overflow: 'unset'}}/>
      </Modal>

      <Modal
        title=""
        centered
        visible={this.state.visibilityRegister}
        onOk={()=> this.onVisibilityRegister(false)}
        onCancel={()=> this.onVisibilityRegister(false)}
        closable={false}
        footer={null}
        destroyOnClose={true}
        getContainer={false}
        width='400px'
        bodyStyle={{
          background: theme==='dark' ? 'var(--colorDark)' : 'var(--colorWhite)',
          padding: '0px 0px 0px 0px',
          width: '400px'
        }}
      >
        <Register style={{overflow: 'unset'}}/>
      </Modal>
      <div className="header-layout">
        <div className="header-drawer-menus">
          <MenusDrawer {...this}{...this.props}/>
        </div>
        <div className="header-container">
          <div className="header-item-link">
            {links({auth, language, theme,
              onVisibilityLogin, onVisibilityRegister,
              onVisibilityChat
            })}
          </div>
          <div className="header-title-item-link">
            <img src={images.MyInfo['webLogo']}
              shape="circle" alt={language.Public['avatar']}
              style={{width: '40px', height: '40px'}}
            />
            <Link className="main-title-link"
              to={`/${MAIN_API}`}
              style={{textDecoration: 'none'}}
              >
              {language.MyInfo['webName']}
            </Link>
              <Timer.reverse
                format="Y_:M_:d_:h_:m_:s_:ms_"
                dash=' '
                timeout={1000}
              >
              </Timer.reverse>
          </div>
        </div>
      </div>
      </>
    )
  }
}
export default HeaderManager
