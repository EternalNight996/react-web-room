/* ************************************************ */
/*File Name: components/EventListeners.jsx
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月28日 星期一 01时12分51秒
*/

import {Component} from 'react'
import {Button} from 'antd'
import {UpOutlined, DownOutlined} from '@ant-design/icons'
import '../css/EventListeners.css'

// 跟踪鼠标组件模块
export function FloatMouse() {
	class Mouse extends Component {
	  state = {
	    x: 0,
	    y: 0,
	  }
	  handleMouseMove = e => {
      preventDefault(e)
      stopPropagation(e)
	    this.setState({
	      x: e.pageX,
	      y: e.pageY
	    })
	  }
	  componentDidMount() {
      const {options} = this.props
	    addEvent('window', 'mousemove', this.handleMouseMove, false)
	  }
	  componentWillUnmount() {
      const {options} = this.props
	    removeEvent('window', 'mousemove', this.handleMouseMove)
	  }
	  render() {
	    return this.props.render(this.state)
	  }
	}
  return (
  <Mouse render={(mouse) => {
    return <div alt='动画' style={{
      position: "absolute",
      top: mouse.y+30,
      left: mouse.x,
      zIndex: "997",
      color: "#ff9900"
      }}><span>[{mouse.x},{mouse.y}]</span></div>
    }}>
  </Mouse>);
}

// 滚动监听
export function GoBack(props){
  class BackTop_ extends Component {
    constructor(props) {
      super(props)
      this.state={
        visibility: false,
        isLock: false,
      }
      this.onScroll = this.onScroll.bind(this)
    }
    onScroll(event) {
      event.preventDefault()
      if (!this.state.isLock) {
        const scrollTop =
          (event.srcElement ? event.srcElement.scrollTop : false)
	      	|| window.pageYOffset;
        if (scrollTop > 400) {
          this.setState({
            visibility: true,
          })
        }else {
          this.setState({visibility: false})
        }
      }
    }

    componentDidMount() {
      const {target, options} = this.props
      var targetEvent = document.getElementById(target)
      addEvent(targetEvent, 'scroll', this.onScroll, false)
    }
    componentWillUnmount() {
      const {target, options} = this.props
      var targetEvent = document.getElementById(target)
      removeEvent(targetEvent, 'scroll', this.onScroll)
    }
    onClickTop(){
      this.setState({
        isLock: true,
        visibility: false,
      })
      const {target} = this.props
      var onTop = document.getElementById(target)
      if (target){
        var handler = () => {
          let pos = onTop.scrollTop
          if (pos > 0) {
            onTop.scrollTop = pos - 20
          }else{
            this.setState({
              isLock: false,
            })
            window.clearInterval(timeout)
          }
        }
        const timeout = window.setInterval(handler,10)
      }else{
        var handler = () => {
          let pos = window.pageYOffset
          if (pos > 0) {
            window.scrollTo( 0, pos-20)
          }else{
            this.setState({
              isLock: false,
            })
            window.clearInterval(timeout)
          }
        }
        const timeout = window.setInterval(handler,10)
      }
    }

    render() {
      let {visibility} = this.state
      return (
        visibility &&
        <div className="back-container">
           <Button onClick={this.onClickTop.bind(this)}
              icon={<UpOutlined style={{
               fontSize: 'var(--buttonSize)',
               color: 'var(--colorGreen)',
             }}/>}
              style={{border: 'unset'}}
              type="ghost" className="back-button">
           </Button>
        </div>
      )
    }
  }

  class BackBottom_ extends Component {
    constructor(props){
      super(props)
      this.state={
        visibility: true,
        isLock: false,
      }
      this.onScroll = this.onScroll.bind(this)
    }
    onScroll(event) {
      event.preventDefault()
      if (!this.state.isLock) {
        var scrollTop =
          (event.srcElement ? event.srcElement.scrollTop : 0)
          || document.body.scrollTop
	      	|| window.pageYOffset;
        if (scrollTop <400) {
          this.setState({visibility: true})
        }else {
          this.setState({visibility: false})
        }
      }
    }
    componentDidMount() {
      const {target, options} = this.props
      var targetEvent = document.getElementById(target)
      addEvent(targetEvent, 'scroll', this.onScroll, false)
    }
    componentWillUnmount() {
      const {target, options} = this.props
      var targetEvent = document.getElementById(target)
      removeEvent(targetEvent, 'scroll', this.onScroll)
    }
    onClickBottom(){
      this.setState({
        isLock: true,
        visibility: false,
      })
      const {target} = this.props
      const screenWidth = document.documentElement.clientWidth
        ||document.body.clientWidth;
      if (target){
        let backup,count = 0
        var onTop = document.getElementById(target)
        const scrollHeight = onTop.scrollHeight
        var handler = () => {
          let pos = onTop.scrollTop
          if (pos < scrollHeight && count === 0) {
            onTop.scrollTop = pos+20
            if (onTop.scrollTop === backup) {
              count++
            }
            backup = onTop.scrollTop
          }else{
            this.setState({
              isLock: false,
            })
            window.clearInterval(timeout)
          }
        }
        const timeout = window.setInterval(handler,1)
      }else{
        let backup,count = 0
        const scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight
        var handler = () => {
          let pos = window.pageYOffset
          if (pos < scrollHeight && count===0) {
            window.scrollTo( 0, pos+20)
            if (window.pageYOffset === backup){
              count++
              if (screenWidth && scrollHeight > 753) {
                let height = screenWidth > 753 ? 360 : 620
                const timeout2 = window.setInterval(function(){
                  if (height > 0) {
                    window.scrollTo(0, window.pageYOffset-20)
                    height -= 20
                  }else{
                    window.clearInterval(timeout2)
                  }
                }, 10)
              }
            }
            backup = window.pageYOffset
          }else{
            this.setState({
              isLock: false,
            })
            window.clearInterval(timeout)
          }
        }
        const timeout = window.setInterval(handler, 1)
      }
    }

    render() {
      return (
        this.state.visibility &&
        <div className="back-container">
           <Button onClick={this.onClickBottom.bind(this)}
              icon={<DownOutlined style={{
                fontSize: 'var(--buttonSize)',
                color: 'var(--colorBlue)',
             }}/>}
              style={{border: 'unset',
              }}
              type="ghost" className="back-button">
           </Button>
        </div>
      )
    }
  }

  class GoBack_ extends Component {
    constructor(props) {
      super(props)
      this.state={
        visibilityTop: false,
        visibilityBottom: true,
        isLock: false,
      }
      this.onScroll = this.onScroll.bind(this)
      this.onClickTop = this.onClickTop.bind(this)
      this.onClickBottom = this.onClickBottom.bind(this)
    }
    onScroll(event) {
      preventDefault(event)
      stopPropagation(event)
      if (!this.state.isLock) {
        const scrollTop =
          (event.srcElement ? event.srcElement.scrollTop : false)
	      	|| window.pageYOffset;
        if (scrollTop > 400) {
          this.setState({
            visibilityTop: true,
            visibilityBottom: false
          })
        }else {
          this.setState({
            visibilityTop: false,
            visibilityBottom: true
          })
        }
      }
    }

    componentDidMount() {
      const {target, options} = this.props
      var targetEvent = document.getElementById(target)
      addEvent(targetEvent, 'scroll', this.onScroll, false);
    }
    componentWillUnmount() {
      const {target, options} = this.props
      var targetEvent = document.getElementById(target)
      removeEvent(targetEvent, 'scroll', this.onScroll)
    }
    onClickTop(){
      this.setState({
        isLock: true,
        visibilityTop: false,
        visibilityBottom: false,
      })
      const {target} = this.props
      if (target){
        var onTop = document.getElementById(target)
        var handler = () => {
          let pos = onTop.scrollTop
          if (pos > 0) {
            onTop.scrollTop = pos - 20
          }else{
            this.setState({
              isLock: false,
              visibilityBottom: true
            })
            window.clearInterval(timeout)
          }
        }
        const timeout = window.setInterval(handler,10)
      }else{
        var handler = () => {
          const speed = parseInt((document.body.scrollHeight-window.pageYOffset)/20)
          let pos = window.pageYOffset
          if (pos > 0) {
            window.scrollTo( 0, pos-100)
          }else{
            this.setState({
              isLock: false,
              visibilityBottom: true,
            })
            window.clearInterval(timeout)
          }
        }
        const timeout = window.setInterval(handler,10)
      }
    }
    onClickBottom(){
      this.setState({
        isLock: true,
        visibilityTop: false,
        visibilityBottom: false,
      })
      const {target} = this.props
      const screenWidth = document.documentElement.clientWidth
        ||document.body.clientWidth;
      if (target){
        let backup,count = 0
        var onTop = document.getElementById(target)
        const scrollHeight = onTop.scrollHeight
        var handler = () => {
          let pos = onTop.scrollTop
          if (pos < scrollHeight && count === 0) {
            onTop.scrollTop = pos+100
            if (onTop.scrollTop === backup) {
              count++
            }
            backup = onTop.scrollTop
          }else{
            this.setState({
              isLock: false,
              visibilityTop: true,
            })
            window.clearInterval(timeout)
          }
        }
        const timeout = window.setInterval(handler,1)
      }else{
        let backup,count = 0
        const scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight
        var handler = () => {
          let pos = window.pageYOffset
          if (pos < scrollHeight && count===0) {
            window.scrollTo( 0, pos+100)
            if (window.pageYOffset === backup){
              count++
              if (screenWidth && scrollHeight > 753) {
                let height = screenWidth > 753 ? 340 : 600
                var handler2 = () => {
                  if (height > 0) {
                    window.scrollTo(0, window.pageYOffset-20)
                    height -= 20
                  }else{
                    this.setState({
                      isLock: false,
                      visibilityTop: true,
                    })
                    window.clearInterval(timeout2)
                  }
                }
                const timeout2 = window.setInterval(handler2,10)
              }
            }
            backup = window.pageYOffset
          }else{
            window.clearInterval(timeout)
          }
        }
        const timeout = window.setInterval(handler, 1)
      }
    }

    render() {
      return (
        this.state.visibilityTop
        ?
        <div className="back-container">
          <Button onClick={this.onClickTop}
            icon={<UpOutlined style={{
             fontSize: 'var(--buttonSize)',
             color: 'var(--colorGreen)',
           }}/>}
            style={{border: 'unset'}}
            type="ghost" className="back-button">
          </Button>
        </div>
        :
        this.state.visibilityBottom
        ?
        <div className="back-container">
          <Button onClick={this.onClickBottom}
            icon={<DownOutlined style={{
              fontSize: 'var(--buttonSize)',
              color: 'var(--colorBlue)',
           }}/>}
            style={{border: 'unset',
            }}
            type="ghost" className="back-button">
          </Button>
        </div>
        :
        <></>
      )
    }
  }
  return (
    props.type
    ?
      (props.type==='bottom')
      ? <BackBottom_ {...props}/>
      : <BackTop_ {...props}/>
    :
    <GoBack_ {...props} />
  )
}

// 封装状态
// callback (function | string | number | any)
const callbackWith = (callback) => {
  return (typeof callback !== 'function')
    ? function(e){
      return callback
    }
    :callback
}

// 监听右键事件
// element (element)
// callback (function | string | number | any)
export function rightClick(element, callback) {
  if (element.oncontextmenu || typeof element.oncontextmenu === 'object') {
    element.oncontextmenu = callbackWith(callback)
  }else{
    document.oncontextmenu = callbackWith(callback)
  }
}
// 监听左键事件
// element (element)
// callback (function | string | number | any)
export function leftClick(element, callback) {
  if (element.onselectstart || typeof element.onselectstart === 'object') {
    element.onselectstart = callbackWith(callback)
  }else{
    document.onselectstart = callbackWith(callback)
  }
}
// 监听键盘按下事件
// element (element)
// callback (function | string | number | any)
export function keyDown(element, callback) {
  if (element.onkeydown || typeof element.onkeydown === 'object') {
    element.onkeydown = callbackWith(callback)
  }else{
    window.onkeydown = callbackWith(callback)
  }
}
// 监听键盘松开事件
// element (element)
// callback (function | string | number | any)
export function keyUp(element, callback) {
  if (element.onkeyup || typeof element.onkeyup === 'object'){
    element.onkeyup = callbackWith(callback)
  }else{
    window.onkeyup = callbackWith(callback)
  }
}
// 监听键盘press事件
// element (element)
// callback (function | string | number | any)
export function keyPress(element, callback) {
  if (element.onkeypress || typeof element.onkeypress === 'object'){
    element.onkeypress = callbackWith(callback)
  }else{
    window.onkeypress = callbackWith(callback)
  }
}
// 监听键盘事件
// element (element)
// callback (function | string | number | any)
export function keyBoard(element, callback) {
  keyPress(element, callback)
  keyUp(element, callback)
  keyDown(element, callback)
}
// 监听粘贴
// element (element)
// callback (function | string | number | any)
export function onPaste(element, callback) {
  if (element.onpaste || typeof element.onpaste === 'object') {
    element.onpaste = callbackWith(callback)
  }else{
    document.onpaste = callbackWith(callback)
  }
}
// 监听复制
// element (element)
// callback (function | string | number | any)
export function onCopy(element, callback) {
  if (element.oncopy || typeof element.oncopy === 'object') {
    element.oncopy = callbackWith(callback)
  }else {
    document.oncopy = callbackWith(callback)
  }
}
// 监听剪切
// element (element)
// callback (function | string | number | any)
export function onCut(element, callback) {
  if (element.oncut || typeof element.oncut === 'object') {
    element.oncut = callbackWith(callback)
  }else{
    document.oncut = callbackWith(callback)
  }
}
// 关闭窗口
export function closeWindow() {
  window.close()
  window.location = 'about:blank'
}

// 监听事件
// element (element)
// type (string)
// handler (function)
// options (object)
export function addEvent(element, type, handler, options) {
  let Options = {capture: false, passive: false, once: false}
  if (options && typeof options === 'object') {
    Options = options
  }
  if (element && element.addEventListener) {
    element.addEventListener(type, handler, Options)
  }else if (element && element.attachEvent) {
    element.addEventListener("on"+type, handler)
  }else if (element && element['on'+type]) {
    element["on" + type] = handler
  }else {
    window.addEventListener(type, handler, Options)
  }
}
// 移除监听
// element (element)
// type (string)
// handler (function)
export function removeEvent(element, type, handler) {
  if (element && element.removeEventListener) {
    element.removeEventListener(type, handler, false)
  }else if (element && element.detachEvent) {
    element.detachEvent('on'+type, handler)
  }else if (element && element['on'+type]){
    element['on'+type] = null
  }else {
    window.removeEventListener(type, handler, false)
  }
}
// 不返回冒泡
export function stopPropagation(event) {
  if (event.stopPropagation) {
    event.stopPropagation()
  }else{
    event.cancelBubble = true
  }
}
// 不返回父事件
export function preventDefault(event) {
  if (event.preventDefault) {
    event.preventDefault()
  }else {
    event.returnValue = false
  }
}
// 获取事件
export function getEvent(event) {
  return event ? event : window.event
}
export const Controls = {
  rightClick,
  leftClick,
  keyDown,
  keyUp,
  keyPress,
  keyBoard,
  closeWindow,
  paste: onPaste,
  copy: onCopy,
  cut: onCut,
  addEvent,
  removeEvent,
  stopPropagation,
  preventDefault,
  getEvent,
}

export default {
  FloatMouse,
  GoBack,
  Controls,
}
