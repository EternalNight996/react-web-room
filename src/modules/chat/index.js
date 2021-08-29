/* ************************************************ */
/*File Name: pages/chat/index.jsx
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月20日 星期日 21时53分18秒
*/

// 组件
import React,{Component} from 'react'
// Icon图标
// 本地组件
import Content from '../../containers/layout/Content.js'
import ContentChat from '../../containers/chat/ContentChat.js'
// 配置
// 工具

class Chat extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="chat-layout">
        <ContentChat />
      </div>
    )
  }
}
export default Chat
