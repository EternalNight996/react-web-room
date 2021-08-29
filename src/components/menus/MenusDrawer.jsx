/* ************************************************ */
/*File Name: components/DrawerMenus.jsx
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月23日 星期三 19时28分07秒
*/
// icon 图标
import {
  CloseOutlined, MailOutlined, ExportOutlined, UserAddOutlined,
  CalendarOutlined, AppstoreOutlined, SettingOutlined,
  LinkOutlined, UserOutlined, LogoutOutlined,
  MenuOutlined, MenuUnfoldOutlined, MessageOutlined
} from '@ant-design/icons'
// 组件
import {Menu, Drawer, Button, Avatar} from 'antd'
import {Link} from 'react-router-dom'
// 动作与常量
import {LOGIN_API, REGISTER_API, CHAT_API} from '../../constants/redirect.js'
// 配置
import '../../css/menus/MenusDrawer.css'

const URL = require('../../configs/serverURL.js')
const images = require('../../configs/images.js')

const LoginedLinks = ({userConfigs, auth, language, showConfirm}) => {
  const {userInfo, isLogined} = auth
  const {theme} = userConfigs
  return (
    isLogined
    ?
    <>
	  <Menu.Item key="avatar2" className="menu-item"
      icon={
        (userInfo && userInfo.avatar)
        ?
        <img src={userInfo['avatar']}
          shape="circle" alt={language.Public['avatar']}
        />
        :
        <UserOutlined style={{fontSize: "var(--iconSize)"}}/>
      }
      style={{
        borderColor: theme==='dark' ? 'var(--colorDarkBlue)' : 'var(--colorGrey)',
      }}
    >
      <span style={{position: "absolute", left: '50px'}}>
        {userInfo ? userInfo.username : ''}
      </span>
	  </Menu.Item>
	  <Menu.Item key="logout" className="menu-item menu-item-end"
      onClick={showConfirm}
      icon={<LogoutOutlined
        style={{fontSize: "var(--iconSize)"}} />}
      style={{
        borderColor: theme==='dark' ? 'var(--colorDarkBlue)' : 'var(--colorGrey)',
      }}
    >
	    {language.Public['logout']}
	  </Menu.Item>
    </>
    :
    <>
	  <Menu.Item key="login" className="menu-item"
      icon={<ExportOutlined
        style={{fontSize: "var(--iconSize)"
        }}/>}
      style={{
        borderColor: theme==='dark' ? 'var(--colorDarkBlue)' : 'var(--colorGrey)',
      }}
    >
      <Link to={`/${LOGIN_API}`}>
  	    {language.Public['login']}
      </Link>
	  </Menu.Item>

	  <Menu.Item key='register' className="menu-item"
      icon={<UserAddOutlined
        style={{fontSize: "var(--iconSize)"
        }}/>}
      style={{
        border: 'unset',
      }}
    >
      <Link to={`/${REGISTER_API}`}>
  	    {language.Public['register']}
      </Link>
	  </Menu.Item>
    </>
  )
}

const MenusButton = ({userConfigs, onClose, showDrawer, state}) => {
  const {visible, placement} = state
  const {theme} = userConfigs
  return (
	  placement==='left'
    ?
    <Button className="sider-menu-button button1" type="link"
	    onClick={visible ? onClose : showDrawer}
	    icon={ visible
	      ?
	      <CloseOutlined className="sider-menu-button-icon"
	      style={{
	        color: theme==='dark' ? "var(--colorWhite)" : "var(--colorBlack)",
	        }}
	      />
	      :
	      <MenuUnfoldOutlined className="sider-menu-button-icon"
	      style={{
	        color: theme==='dark' ? "var(--colorWhite)" : "var(--colorBlack)",
	        }}
	      />
	    }
	    style={{
	      background: theme==='dark' ? "var(--colorDark)" : "var(--colorOpacityLight)",
	      left: visible ? "var(--MenusMaxWidth)" : '0px',
        zIndex: "1001",
	    }}
	  />
    :
    <Button className="sider-menu-button button2" type="link"
	    onClick={visible ? onClose : showDrawer}
	    icon={
	      <MenuOutlined className="sider-menu-button-icon"
	      style={{
	        color: theme==='dark' ? "var(--colorWhite)" : "var(--colorBlack)",
	        }}
	      />
	    }
	    style={{
	      background: theme==='dark' ? "var(--colorDark)" : "var(--colorOpacityLight)",
        visibility: visible ? 'hidden' : '',
        zIndex: '999',
	    }}
    />
  )
}

export function MenusDrawer(props) {
  const {
    userConfigs, onClose, auth, language,
    showConfirm
  } = props
  const {visible, placement} = props.state
  const {theme} = userConfigs
  const {isLoading, userInfo} = auth
  return (
    <div className="menus-drawer-container">
      {MenusButton({...props})}
	    <Drawer className="sider-drawer" title=""
        width={placement==='left' ? 'var(--DrawerMaxWidth)' : ''}
        height={placement==='left' ? '' : 'var(--DrawerMaxHeight)'}
	      placement={placement}
        closable={false}
        onClose={onClose}
	      visible={visible}
        key={placement}
        getContainer={false}
      >
	      <Menu className="sider-menu"
	        defaultSelectedKeys={['xgithub']}
	        defaultOpenKeys={['config']}
	        mode=''
          theme=''
          style={{
            background: theme==='dark' ? "var(--colorDark)" : "var(--colorWhite)",
          }}
	      >
	        <Menu.Item key="avatar1" className="menu-item"
            style={{
              color: theme==='light' ? 'var(--colorLightDark)' : 'var(--colorLightDark)',
              borderColor: theme==='dark' ? 'var(--colorDarkBlue)' : 'var(--colorGrey)',
            }}
          >
            <img src={images.MyInfo['webLogo']}
              shape="circle" alt={language.Public['avatar']}
            />
            <span style={{position: "absolute", left: '50px'}}>
              {language.MyInfo['webName']}
            </span>
	        </Menu.Item>

	        <Menu.Item key="config" className="menu-item"
            icon={<SettingOutlined style={{fontSize: "var(--iconSize)"}}/>}
            style={{
              color: theme==='light' ? 'var(--colorLightDark)' : 'var(--colorLightDark)',
              borderColor: theme==='dark' ? 'var(--colorDarkBlue)' : 'var(--colorGrey)',
            }}
          >
	          {language.Public['myConfig']}
	        </Menu.Item>
	        <Menu.Item key="github" className="menu-item"
            icon={<LinkOutlined
              style={{fontSize: "var(--iconSize)"}}
            />}
            style={{
              color: theme==='light' ? 'var(--colorLightDark)' : 'var(--colorLightDark)',
              borderColor: theme==='dark' ? 'var(--colorDarkBlue)' : 'var(--colorGrey)',
            }}
          >
	          <a href={URL['github']}
	            target="_blank" rel="noopener noreferrer"
              style={{
              }}
            >
	            {language.MyInfo['github']}
	          </a>
	        </Menu.Item>
	        <Menu.Item key="blog" className="menu-item menu-item-start"
            icon={<MessageOutlined
              style={{fontSize: "var(--iconSize)"}} />}
            style={{
              color: theme==='light' ? 'var(--colorLightDark)' : 'var(--colorLightDark)',
              borderColor: theme==='dark' ? 'var(--colorDarkBlue)' : 'var(--colorGrey)',
            }}
          >
	          <Link to={`/${CHAT_API}`}>
	            {language.Chat['title']}
	          </Link>
	        </Menu.Item>
          {LoginedLinks({...props})}
	      </Menu>
	    </Drawer>
    </div>
  )
}
export default MenusDrawer
