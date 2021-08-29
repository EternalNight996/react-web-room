/* ************************************************ */
/*File Name: Login.jsx
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月12日 星期六 08时19分39秒
*/

//
import React,{Component, createRef} from 'react'
// 页面与组件
import {
  Input, Form, Checkbox, message,
  Spin, Button, Select
} from 'antd'
import {Link} from 'react-router-dom'
// icon 图标
import {
  UserOutlined, LockOutlined, PhoneOutlined,
  GithubOutlined, WechatOutlined, QqOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons'
// 常量与动作
import {POST_LOGIN} from '../../constants/auth.js'
import {TIMER_CAPTCHA} from '../../constants/configs.js'
import {postLoginEmit} from '../../actions/auth.js'
import {saveUserConfigs} from '../../actions/pageUI.js'
import {
  redirectMain,
  redirectChat,
} from '../../actions/redirect.js'
import {
  REGISTER_API,
  FORGOT_API,
  CHAT_API,
} from '../../constants/redirect.js'
// 布局
import Content from '../../containers/layout/Content.js'
// 工具与中间件
import cookies from '../../utils/uCookie.js'
import parses from '../../utils/parses.js'
import cryptos from '../../utils/cryptos.js'
// CSS样式
import '../../css/auth/Login.css'

const links = {
  register: function(language){
    return <Link className="login-item-link"
        to={`/${REGISTER_API}`} target="_blank">
      {language.Public['register']}
      </Link>
  },
  forgot: function(language){
    return <Link className="login-item-link"
        to={`/${FORGOT_API}`} target="_blank">
      {language.Public['forgot']}
      </Link>
  }
}

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select
      style={{
        width: 70,
      }}>
      <Select.Option value="86">+86</Select.Option>
      <Select.Option value="87">+87</Select.Option>
    </Select>
  </Form.Item>
)

//批量生成元素,结构：string, int;
function MakeElement(element, num) {
  var temp = {element: element}
  return Array(num).fill(0).map(()=>{return <temp.element></temp.element>});
}
export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      phoneLogin: false,
      captchaLoading: false,
      captchaTimer: 0,
      style: null,
      search: null,
    }
  }
  formRef = createRef();

  componentWillMount() {
    this.setState({
      style: this.props.style ? this.props.style : {},
      search: window.location.search
        ? parses.search(window.location.search)
        : null
    })
  }
  componentDidMount() {
    const captchaTimer = this.onCheck(TIMER_CAPTCHA)
    if (captchaTimer) {
      this.onClock(captchaTimer)
    }
  }

  onClock = (timer) => { // 检查
	  let timeout = null,
	    _this = this, // 指向对象
      i = timer
	  this.setState({
      captchaLoading: true,
      captchaTimer: i
    })
	  setTimeout(async function f(){
	    if (i>0){
	      i--
        _this.setState({captchaTimer: i})
	    }else{ // 如果判断结束则清除timeout,且退出跳动
        _this.setState({
          captchaTimer: 0,
          captchaLoading: false
        })
	      clearTimeout(f)
	      return
	    }
	    timeout = await setTimeout(f,1000) // 进行下一轮递归，实现倒计时
	    }, 1000
    )
  }

  onCheck = (name) => { // 获取存储在storage中的timer
    //const getJSON = storage.get(target)
    const timer = cookies.get(name)
    const now = new Date().getTime()
    if (!timer) {
      //storage.remove(name)
      cookies.remove(name, {path: '/'})
      return
    }
    return parseInt((timer-now)/1000)
  }

	handleCaptcha = (language) => {  // 监控验证码按钮
    var phone = this.formRef.current.getFieldValue('phone')
    let regPhone = /^[1][3,4,5,7,8][0-9]{9}$/g
    if (!regPhone.test(phone)) {
      message.error(this.props.language.Error['rulePhoneReg'])
      return
    }
    const name = TIMER_CAPTCHA
    const expires = new Date().getTime() + 60 * 1000
    const data = expires
    //storage.set(name, data, expire)
    const options = {
      path: '/',
      expires: new Date(expires),
    }
    cookies.set(name, data, options)
    this.onClock(this.onCheck(name))
	}

  render(){
    const {language, userConfigs} = this.props
    const {theme} = userConfigs

    // 密码正则
    const regPasswd = /^[a-zA-Z0-9~!@#$%^&*()=|{}:;,\\.\S]*$/g
    // 用户名正则
    const regUsername = /^[^~!@#$%^&*()=|{}:;,\\.<>/'`"?￥…（）—【】《》“”’‘：。，、？\s]*$/g
    // 邮箱正则
    const regEmail = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/g
    // 手机号正则
    const regPhone = /^[1][3,4,5,7,8][0-9]{9}$/g

    /*
    const onRest = ()=>{
      this.formRef.current.resetFields() // 重置数据
    }
    */
    const onFill = ()=> {
      this.setState({
        isLoading: false,
      })
      this.formRef.current.setFieldsValue({ // 设置数据
        passwd: '',
        captcha: ''
      })
    }
    const onFinish = async (values) => {
      // 唯一对外接口
      this.setState({isLoading: true})
      if (this.state['phoneLogin']) {
        const {prefix, phone, captcha} = values
        await postLoginEmit({prefix, phone, captcha})// 传递参数到store -> reducer 再返回
      } else {
        const {username, passwd} = values
        await postLoginEmit({username,passwd})// 传递参数到store -> reducer 再返回
      }
      const {isLogined, type} = this.props.auth
      if (isLogined || type==='SUCCESS') {
        await saveUserConfigs()
        let from = null
        if (this.state.search && this.state.search.from) {
          from = this.state.search.from
        }
        const {pathname} = window.location
        if (from === CHAT_API ||
            pathname === `/${CHAT_API}`) {
          redirectChat()
        }else{
          redirectMain()
        }
      }
      onFill()
	  }
    const search = this.state.search
    return (
    <div className="login-layout" style={this.state.style}>
      <Content>
      <Spin tip={language.Public['loging']} spinning={this.state['isLoading']}>
	    <Form name="login" className="login-form form-group" autoComplete="off"
        initialValues={{
          prefix: '86',
          username: search && search.username
              ? cryptos.AES.decode(search.username) : '',
          passwd: search && search.passwd
            ? cryptos.AES.decode(search.passwd) : '',
        }} ref={this.formRef} onFinish={onFinish}
         scrollToFirstError>
        {
          this.state.phoneLogin
          ?
          <>
          <Form.Item name="phone"
	          rules={[{
	          required: true,
	          message: language.Public['phoneEmpty'],
	          },
            ({ getFieldValue }) => ({ // 密码规则设置
  	          validator(_, value) {
                if (value){
                  if (!value.match(regPhone)) {
	                  return Promise.reject(new Error(language.Error['rulePhoneReg']))
                  }
                }
	              return Promise.resolve()
              }
            })
            ]} hasFeedback>
	          <Input className="form-input"
              prefix={<PhoneOutlined className="site-form-item-icon"/>}
	           placeholder={language.Public['phone']} addonBefore={prefixSelector} />
  	      </Form.Item>
                  {/*extra={language.Public['captchaExtra']}*/}
	        <Form.Item  className="captcha-form">
	          <Form.Item name="captcha" noStyle
  	          rules={[{
	             required: true,
	             message: language.Public['captchaEmpty'],
	           }]} hasdback>
	          <Input prefix={<SafetyCertificateOutlined className="site-form-item-icon"/>}
	             className="captcha-form-input form-input"
               placeholder={language.Public['captcha']} />
	          </Form.Item>
	          <Button  onClick={this.handleCaptcha} className="captcha-form-button"
  	          loading={this.state.captchaLoading}>
	            {this.state.captchaLoading ? this.state.captchaTimer : language.Public['captchaGet']}</Button>
	        </Form.Item>
          </>
          :
	        <>
          <Form.Item name="username"
	          rules={[{
	            required: true,
	            message: language.Public['usernameEmpty']
	          },
            ({ getFieldValue }) => ({ // 用户规则设置
  	          validator(_, value) {
                if (value){
                  if (value.length < 3) {
	                  return Promise.reject(new Error(language.Error['ruleUsernameSort']))
                  } else if (value.length > 30) {
	                  return Promise.reject(new Error(language.Error['ruleUsernameLength']))
                  } else if (value.match(regEmail)) {
	                  return Promise.resolve()
                  } else if (!value.match(regUsername)) {
	                  return Promise.reject(new Error(language.Error['ruleUsernameReg']))
                  }
                }
	              return Promise.resolve()
              }
            })
            ]} hasFeedback>
	          <Input className="form-input" prefix={<UserOutlined className="site-form-item-icon" />}
  	          placeholder={language.Public['usernameExtends']} />
	        </Form.Item>

  	      <Form.Item name="passwd" className="form-style"
            rules={[{
	            required: true,
	            message: language.Public['passwdEmpty'],
	          },
            ({ getFieldValue }) => ({ // 密码规则设置
	            validator(_, value) {
                if (value){
                  if (value.length < 8) {
	                  return Promise.reject(new Error(language.Error['rulePasswdSort']))
                  } else if (value.length > 30) {
	                  return Promise.reject(new Error(language.Error['rulePasswdLength']))
                  } else if (!value.match(regPasswd)) {
	                  return Promise.reject(new Error(language.Error['rulePasswdReg']))
                  }
                }
	              return Promise.resolve()
              }
            })
            ]} hasFeedback>
	          <Input.Password  className="form-input" prefix={<LockOutlined className="site-form-item-icon" />}
  	          type="password" placeholder={language.Public['passwd']}
              autoComplete="new-password" />
	        </Form.Item>
        </>
        }

        <div style={{
          height: '40px', lineHeight: '40px',
          padding: '0px 10px 0px 10px'
        }}classNeme="login-box-left-right">
  	      <Form.Item className="login-form-button login-box-left">
            <a href="#" id="" className={theme==='dark' ? 'btn' : 'btnLight'}>
              {MakeElement('span', 4)}
              <Input type="submit" value='' className="form-input"
              />
              <h3 style={{color: 'unset'}}><b>
                {this.state['isLoading'] ?
                  language.Public['loging'] :
                  language.Public['login']}</b>
              </h3>
            </a>
  	      </Form.Item>
          <div className="login-box-right">
            {links.register(language)}
            <span> | </span>
            {links.forgot(language)}
          </div>
        </div>

        <div className="other-item-link"
        style={{
          borderColor: theme==='dark' ? 'var(--colorDarkBlue)' : 'var(--colorGrey)'
        }}>
          {
            !this.state.phoneLogin
            ?
            <Button type="none" icon={
              <PhoneOutlined style={{fontSize: 'var(--iconSize)',color: 'var(--colorGrey)'}}/>
            }
            onClick={()=>this.setState({phoneLogin: true})}
            >
            <span>{language.Public['phoneLogin']}</span>
            </Button>
            :
            <Button type="none" icon={
              <UserOutlined style={{fontSize: 'var(--iconSize)',color: 'var(--colorGrey)'}}/>
            }
            onClick={()=>this.setState({phoneLogin: false})}
            >
            <span>{language.Public['usernameLogin']}</span>
            </Button>
          }

          <Button type="none" icon={
            <GithubOutlined style={{fontSize: 'var(--iconSize)', color: 'var(--colorBlack)'}}/>
            }
            >
            <span>{language.Public['github']}</span>
          </Button>
          <Button
            type="none"
            icon={<WechatOutlined
              style={{fontSize: 'var(--iconSize)',color: 'var(--colorGreen)'}}
              />}>
            <span>{language.Public['wechat']}</span>
          </Button>
          <Button
            type="none"
            icon={<QqOutlined
              style={{fontSize: 'var(--iconSize)',color: 'var(--colorRed)'}}
            />}
          >
            <span>{language.Public['qq']}</span>
          </Button>
        </div>
	    </Form>
      </Spin>
      </Content>
    </div>
	  )
  }
}
export default Login
