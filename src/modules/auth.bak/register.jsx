/* ************************************************ */
/*File Name: Login.jsx
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月12日 星期六 08时19分39秒
*/

//
import React, { Component, createRef} from 'react';
// 页面与组件
import { Form, Input, Select, Checkbox, Button, Spin, Modal } from 'antd';
// icon图标
import {
  UserOutlined, LockOutlined, MailOutlined, SafetyCertificateOutlined,
  MehOutlined, PhoneOutlined, ManOutlined
} from '@ant-design/icons'
// 工具
import storage from '../../utils/storage.js' // 一个localStorage封装工具
//import cookie from '../../utils/cookie.js' // 一个react-cookies封装工具

//批量生成元素,结构：string, int;
function MakeElement(element, num) {
  var temp = {element: element}
  return Array(num).fill(0).map(()=>{return <temp.element></temp.element>});
}
class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      captchaLoading: false, // 控制验证码状态
      captchaTimer: 0, // 验证码倒计时
      registerLoading: false, // 注册控制状态
      confirm: false,
      confirmMsg: ''
    }
  }

  formRef = createRef()

  componentWillMount() {
    const captchaTimer = this.onCheck('captchaTimer')
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
	      clearTimeout(f)
	      return
	    }
	    timeout = await setTimeout(f,1000) // 进行下一轮递归，实现倒计时
	    }, 1000
    )
  }

  onCheck = (target) => { // 获取存储在storage中的timer
    const getJSON = storage.get(target)
    //const getJSON = cookie.load(target)
    const now = new Date().getTime()
    if (!getJSON) {
      storage.remove(target)
      //cookie.remove(target)
      return
    }
    const timer= getJSON[target]
    return parseInt((timer-now)/1000)
  }

	handleCaptcha = () => {  // 监控验证码按钮
    const target = 'captchaTimer'
    const expire = new Date().getTime() + 60 * 1000
    const data = {
      captchaTimer: expire
    }
    storage.set(target, data, expire)
    //cookie.save(target, data, expire)
    this.onClock(this.onCheck(target))
	}

  onRest = () => { // 重置全部数据
    this.formRef.current.resetFields()
  }
  onFill = () => { // 重置部分
    this.formRef.current.setFieldsValue({ // 设置数据
      username: '',
      passwd: '',
      confirm: '',
      captcha: '',
    })
    this.setState({
      registerLoading: false,
    })
  }

  render() {
    const {language} = this.props
    // 密码正则
    const regPasswd = /^[a-zA-Z0-9~!@#$%^&*()=|{}:;,\\.\S]*$/g
    // 用户名正则
    const regUsername = /^[^~!@#$%^&*()=|{}:;,\\.<>/'`"?￥…（）—【】《》“”’‘：。，、？\s]*$/g
    // 邮箱正则
    //const regEmail = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/g
    // 昵称正则
    const regNickname = /^[^~#$^&*()=|{}:;,\\.<>/'`"?￥…（）—【】《》“”’‘：。，、？]*$/g
    // 手机号正则
    const regPhone = /^[1][3,4,5,7,8][0-9]{9}$/g
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
    const onFinish = async (values) => { // 注册按钮监控处理
      this.setState({registerLoading: true})
      const {
        username, passwd, confirm, email, nickname,
        prefix, phone, gender, captcha, agreement
      } = values
      await this.props.postRegisterEmit({
        username, passwd, confirm, email, nickname,
        prefix, phone, gender, captcha, agreement
      })
      const result = this.props
      if (this.props.type === 'SUCCESS') {
        this.setState({
          confirmMsg: result.response.username+' '+this.props.language.Public['male']+'/'+
            this.props.language.Public['female']+':'+
            this.props.language.Socket.SUCCESS['register']+result.response.id
        })
        this.setState({confirm: true})
        this.props.transformBox()
      }
      this.onFill()
  	}

	  return (
      <Spin tip={language.Public['registering']} spinning={this.state.registerLoading}>
      <Modal title={language.Public['register']} visible={this.state.confirm} width={400}
        onOk={()=>{this.setState({confirm: false})}}
        onCancel={()=>{this.setState({confirm: false})}}
      >
        {this.state.confirmMsg}
      </Modal>
	    <Form name="register" autoComplete="off"
	      onFinish={onFinish} ref={this.formRef}
          initialValues={{ prefix: '86'}} className="register-form form-group"
	       scrollToFirstError>
	      <Form.Item name="username"
	        rules={[{
	            required: true,
	            message: language.Public['usernameExtra'],
	          },
            ({ getFieldValue }) => ({ // 用户规则设置
	            validator(_, value) {
                if (value){
                  if (value.length < 3) {
	                  return Promise.reject(new Error(language.Error['ruleUsernameSort']))
                  } else if (value.length > 20) {
	                  return Promise.reject(new Error(language.Error['ruleUsernameLength']))
                  } else if (!value.match(regUsername)) {
	                  return Promise.reject(new Error(language.Error['ruleUsernameReg']))
                  }
                }
	              return Promise.resolve()
              }
            })
          ]} hasFeedback>
	        <Input className="form-input"
            prefix={<UserOutlined className="site-form-item-icon"/>}
	         placeholder={language.Public['usernameEmpty']} />
	      </Form.Item>

	      <Form.Item name="passwd"
	        rules={[{
	            required: true,
	            message: language.Public['passwdExtra'],
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
	        <Input.Password className="form-input" autoComplete="new-password"
            prefix={<LockOutlined className="site-form-item-icon"/>}
	         placeholder={language.Public['passwd']} />
	      </Form.Item>

	      <Form.Item name="confirm"
	        rules={[{
	            required: true,
	            message: language.Public['confirmPasswdEmpty'],
	          },
	          ({ getFieldValue }) => ({
	            validator(_, value) {
	              if (!value || getFieldValue('passwd') === value) {
	                return Promise.resolve();
	              }
	              return Promise.reject(new Error(language.Error['confirmPasswd']));
	            },
	          })]} hasFeedback>
	        <Input.Password className="form-input"
            prefix={<LockOutlined className="site-form-item-icon"/>}
	         placeholder={language.Public['confirmPasswd']} />
	      </Form.Item>

	      <Form.Item name="email"
	        rules={[
	          {
	            type: 'email',
	            required: false,
	            message: language.Error['email'],
	          }
	          ]} hasFeedback>
	        <Input className="form-input"
            prefix={<MailOutlined className="site-form-item-icon"/>}
	         placeholder={language.Public['email']} />
	      </Form.Item>

	      <Form.Item name="nickname" tooltip={language.Public['nicknameExtra']}
	        rules={[{
	            required: false,
	            message: language.Public['nicknameEmpty'],
	          },
            ({ getFieldValue }) => ({ // 密码规则设置
	            validator(_, value) {
                if (value){
                  if (value.length < 1) {
	                  return Promise.reject(new Error(language.Error['ruleNicknameSort']))
                  } else if (value.length > 15) {
	                  return Promise.reject(new Error(language.Error['ruleNicknameLength']))
                  } else if (!value.match(regNickname)) {
	                  return Promise.reject(new Error(language.Error['ruleNicknameReg']))
                  }
                }
	              return Promise.resolve()
              }
            })
          ]} hasFeedback>
	        <Input className="form-input"
            prefix={<MehOutlined className="site-form-item-icon"/>}
	         placeholder={language.Public['nickname']} />
	      </Form.Item>

	      <Form.Item name="phone"
	            rules={[{
	            required: false,
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

	      <Form.Item name="gender"
	        rules={[{
	            required: false,
	            message: language.Public['genderEmpty'],
	        }]} hasFeedback>
	        <Select suffixIcon={<ManOutlined className="site-form-item-icon"/>}
	          placeholder={language.Public['genderEmpty']}>
	          <Select.Option value="male">{language.Public['male']}</Select.Option>
	          <Select.Option value="female">{language.Public['female']}</Select.Option>
	          <Select.Option value="other">{language.Public['other']}</Select.Option>
	        </Select>
	      </Form.Item>

        {/*extra={language.Public['captchaExtra']}*/}
	      <Form.Item  className="captcha-form">
	        <Form.Item name="captcha" noStyle
	         rules={[{
	             required: false,
	             message: language.Public['captchaEmpty'],
	           }]} hasdback>
	         <Input prefix={<SafetyCertificateOutlined className="site-form-item-icon"/>}
	           className="captcha-form-input form-input"
              placeholder={language.Public['waitDevelopment']} />
              {/*placeholder={language.Public['captcha']} />*/}
	        </Form.Item>
	        <Button  onClick={this.handleCaptcha} className="captcha-form-button"
	          loading={this.state.captchaLoading}>
	          {this.state.captchaLoading ? this.state.captchaTimer : language.Public['captchaGet']}</Button>
	      </Form.Item>

	      <Form.Item name="agreement" valuePropName="checked"
	        rules={[{
	          validator: (_, value) =>
	            value ? Promise.resolve() : Promise.reject(new Error(language.Error['agreement'])),
	        }]}>
	        <Checkbox>
	          {language.Public['agreementExtra']}
            <a href="">{language.Public['agreement']}</a>
	        </Checkbox>
	      </Form.Item>

	      <Form.Item className="register-form-button">
          <a href="#" id="" className="btn btn-register">{MakeElement('span', 4)}
            <Input type="submit" value='' className="form-input" />
            {this.state.registerLoading ? language.Public['registering']: language.Public['register']}
          </a>
	      </Form.Item>
	    </Form>
      </Spin>
    )
  }
}
export default Register
