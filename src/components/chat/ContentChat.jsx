import * as React from 'react'

import ContentLayout from '../../components/layout/ContentLayout.jsx'
import Messages from './Messages.jsx'
import UserItem from './UserItem.jsx'
import {message} from 'antd'

// 常量与动作
import {DEVICES_MOBILE} from '../../constants/configs.js'
// 工具与监听
import {Controls} from '../../utils/eventListeners.js'
import brosers from '../../utils/browers.js'
// css样式
import '../../css/chat/ContentChat.css'

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo'
const DEVICE = brosers.versions()

export default class InfiniteListExample extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      width: '100%',
      height: '100%',
    }
    this.onResize = this.onResize.bind(this)
  }

  initData() {
    const width = document.body.clientWidth
    if (DEVICES_MOBILE.includes(DEVICE)) {
      const height = document.body.clientHeight
      this.setState({height})
    }else{
      if (width > 768) {
        if (width < 920) {
          this.setState({
            width: 'var(--MaxWidthSmall)',
            height: 500,
          })
        }else if (width < 1024) {
          this.setState({
            width: 'var(--MaxWidthMiddle)',
            height: 500,
          })
        }else {
          this.setState({
            width: 'var(--MaxWidthLarge)',
            height: 500,
          })
        }
      }else{
        this.setState({height: 500})
      }
    }
  }

  onResize(event) {
    Controls.preventDefault(event)
    Controls.stopPropagation(event)

    const Width = event.srcElement.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    const Height = event.srcElement.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    const {width, height} = this.state
    if (Width !== width) {
      const small = 'var(--MaxWidthSmall)',
        middle = 'var(--MaxWidthMiddle)',
        large = 'var(--MaxWidthLarge)';
      if (Width > 768) {
        if (Width < 920) {
          if (width !== small) {
            this.setState({width: small})
          }
        }else if (Width < 1024) {
          if (width !== middle) {
            this.setState({width: middle})
          }
        }else {
          if (width !== large) {
            this.setState({width: large})
          }
        }
      }else{
        if (Width < 768 && width !== '100%') {
          this.setState({width: '100%'})
        }
      }
    }
  }

  componentWillMount() {
    this.initData()
  }
  componentDidMount() {
    if (!DEVICES_MOBILE.includes(DEVICE)) {
      Controls.addEvent('window', 'resize', this.onResize, false)
    }
  }
  componentWillUnmount() {
    if (!DEVICES_MOBILE.includes(DEVICE)) {
      Controls.removeEvent('window', 'resize', this.onResize, false)
    }
  }

  render() {
    const {width, height} = this.state
    const {language, Width, Height, userConfigs} = this.props
    const {theme} = userConfigs
    const _width = Width ? Width : width,
      _height = Height ? Height : height;
    return (
      <ContentLayout width={_width}>
        <ContentLayout limit={false} width={_width}
          float="left" padding="0" maxWidth="24%"
          margin="0 5px 0 0"
        >
          <UserItem language={language} height={_height}
            width={_width} theme={theme} />
        </ContentLayout>
        <ContentLayout limit={false} width={_width}
          float="right" padding="0" maxWidth="75%"
        >
          <Messages language={language} height={_height} width={_width}/>
        </ContentLayout>
        <ContentLayout limit={false} width={_width}
          maxWidth="100%" padding="0" float="left"
        >
          <span>发送消息框</span>
        </ContentLayout>
      </ContentLayout>
    )
  }
}
