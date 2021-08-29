/* ************************************************ */
/*File Name: components/MenusTools.jsx
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月25日 星期五 01时28分52秒
*/
// ICON 图标
import {
  EyeTwoTone, EyeInvisibleTwoTone, ToolOutlined,
  SaveOutlined, InteractionOutlined, MessageOutlined,
} from '@ant-design/icons'
// 组件
import {Button, Menu, Dropdown, Space} from 'antd'
import {Component} from 'react'
// 本地组件
import ContentChat from '../../containers/chat/ContentChat.js'
// 监听与工具
import brosers from '../../utils/browers.js'
// 动作与常量
import {DEVICES_MOBILE} from '../../constants/configs.js'
import {
  shiftTheme, shiftLanguage, saveUserConfigs
} from '../../actions/pageUI.js'
import {
  redirectChat,
} from '../../actions/redirect.js'
// 配置
import '../../css/menus/MenusTool.css'

const changeThemeIcon = (theme) => {
  return theme === 'dark' ? <EyeTwoTone style={{
    fontSize: "var(--iconSize)",
  }} />
    : <EyeInvisibleTwoTone style={{
      fontSize: "var(--iconSize)"
  }} />
}

const menu = (userConfigs, language, onVisibilityChat) => {
  const {theme} = userConfigs
  return (
  <Menu className="menu-tool"
	  mode=''
    theme=''
    style={{
      background: theme==='dark' ? "var(--colorDark)" : "var(--colorLight)",
      borderColor: theme==='dark' ? 'var(--colorDarkBlue)' : 'var(--colorLightDark)',
    }}
	>
    <Menu.Item className="menu-tool-item"
      icon={<MessageOutlined style={{fontSize: 'var(--iconSize)'}}/>}
      onClick={()=>onVisibilityChat(true)}
      style={{
        borderColor: theme==='dark' ? 'var(--colorDarkBlue)' : 'var(--colorGrey)',
      }}
    >
      <h2 style={{color: 'var(--colorGreen)'}}>
        {language.Chat['title']}
      </h2>
    </Menu.Item>

    <Menu.Item className="menu-tool-item"
      icon={<SaveOutlined style={{fontSize: 'var(--iconSize)'}}/>}
      onClick={saveUserConfigs}
      style={{
        borderColor: theme==='dark' ? 'var(--colorDarkBlue)' : 'var(--colorGrey)',
      }}
    >
      <h2 style={{color: 'var(--colorGreen)'}}>
        {language.Public['save']}
      </h2>
    </Menu.Item>

    <Menu.Item className="menu-tool-item"
      icon={changeThemeIcon(userConfigs['theme'])}
      onClick={shiftTheme}
      style={{
        borderColor: theme==='dark' ? 'var(--colorDarkBlue)' : 'var(--colorGrey)',
      }}
    >
      <h2 style={{color: 'var(--colorGreen)'}}>
        {language.Public['theme']}
      </h2>
    </Menu.Item>

    <Menu.Item className="menu-tool-item menu-tool-item-end"
      icon={<InteractionOutlined style={{fontSize: 'var(--iconSize)'}}/>}
      onClick={shiftLanguage}
      style={{
        borderColor: theme==='dark' ? 'var(--colorDarkBlue)' : 'var(--colorGrey)',
      }}
    >
      <h2 style={{color: 'var(--colorGreen)'}}>
        {userConfigs['language'] === 'zh_CN' ? 'enUS' : '中文'}
      </h2>
    </Menu.Item>
  </Menu>
  )
}
const DEVICE = brosers.versions()

class MenusTool extends Component {
  constructor(props){
    super(props)
    this.state = {
      visibilityChat: false,
    }
    this.onVisibilityChat = this.onVisibilityChat.bind(this)
  }
  onVisibilityChat(visibilityChat) {
    redirectChat()
  }
  render() {
  const {userConfigs, language} = this.props
  const {theme} = userConfigs
  return (
    <div className="menus-tool-container" style={{zIndex:'5'}}
      id="menus-tool-container-id"
    >
      <Dropdown trigger={DEVICES_MOBILE.includes(DEVICE) ? 'click' : 'hover'}
        overlay={menu(userConfigs, language,
            this.onVisibilityChat)
        }
          placement="topCenter" >
        <Button className="menus-tool-button"
          icon={<ToolOutlined
            style={{fontSize: "var(--buttonSize)"}}/>
          }
          shape='circle'
          type={'none'}
          style={{
            background: theme==='dark' ? 'var(--colorDark)' : 'var(--colorWhite)',
            color: theme==='dark' ? 'var(--colorWhite)' : 'var(--colorBlack)',
            border: 'unset',
          }}
        >
        </Button>

      </Dropdown>
    </div>
  )
  }
}

export default MenusTool
