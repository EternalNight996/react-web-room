/* ************************************************ */
/*File Name: modules/auth/Register.jsx
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月29日 星期二 01时41分56秒
*/
//
import React, { Component, createRef} from 'react';
// 页面与组件
import {
  Form, Input, Select, Checkbox, Button, Spin, Modal
} from 'antd';
import {postRegisterEmit} from '../../actions/auth.js'
import {redirectLogin} from '../../actions/redirect.js'
// icon图标
import {
  UserOutlined, LockOutlined, MailOutlined, SafetyCertificateOutlined,
  MehOutlined, PhoneOutlined, ManOutlined
} from '@ant-design/icons'
// 本地组件
import Content from '../../containers/layout/Content.js'
// 工具
import cryptos from '../../utils/cryptos.js'
// CSS样式
import '../../css/auth/Register.css'

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
//批量生成元素,结构：string, int;
function MakeElement(element, num) {
  var temp = {element: element}
  return Array(num).fill(0).map(()=>{return <temp.element></temp.element>});
}
class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false, // 注册控制状态
      confirm: false,
      confirmMsg: '',
      style: null,
    }
    this.handle = this.handle.bind(this)
  }

  formRef = createRef()

  componentWillMount() {
    this.setState({
      style: this.props.style
        ?this.props.style : null
    })
  }
  componentDidMount() {
  }

  handle() {
    const {auth} = this.props
    const {type, parameters} = auth
    const {username, passwd} = parameters
    if (type==='SUCCESS') {
      redirectLogin('?username='+
        cryptos.AES.encode(username)+
        '&'+'passwd='+cryptos.AES.encode(passwd)
      );
    }
  }

  render() {
    const {language, userConfigs} = this.props
    const {theme} = userConfigs

    const onRest = () => { // 重置全部数据
      this.formRef.current.resetFields()
    }
    const onFill = () => { // 重置部分
      this.formRef.current.setFieldsValue({ // 设置数据
        username: '',
        passwd: '',
        confirm: '',
        captcha: '',
      })
      this.setState({
        isLoading: false,
      })
    }

    const onFinish = async (values) => { // 注册按钮监控处理
      this.setState({isLoading: true})
      const {
        username, passwd, confirm, email, nickname,
        prefix, phone, gender, agreement
      } = values
      await postRegisterEmit({
        username, passwd, confirm, email, nickname,
        prefix, phone, gender, agreement
      })
      const {auth} = this.props
      if (auth['type'] === 'SUCCESS') {
        const {username, id} = auth.response
        const str = `${username} ${language.Public['male']}/`+
          `${language.Public['female']}:`+
          `${language.Socket.SUCCESS['register']}${id}`
        this.setState({
          confirmMsg: str
        })
        this.setState({confirm: true})
      }
      onFill()
  	}

	  return (
      <div className="register-layout" style={this.state.style}>
      <Content>
      <Spin tip={language.Public['registering']} spinning={this.state.isLoading}>
        <Modal title={language.Public['register']} visible={this.state.confirm} width={400}
          onOk={this.handle}
          onCancel={this.handle}
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



        <div style={{height: '40px', lineHeight: '40px',
          padding: '0px 10px 0px 10px'}}
        >
          <div className="register-box-left">
	          <Form.Item name="agreement" valuePropName="checked"
    	        rules={[{
	              validator: (_, value) =>
	                value ? Promise.resolve() : Promise.reject(new Error(language.Error['agreement'])),
    	        }]}>
	            <Checkbox>
	              {language.Public['agreementExtra']}
                <a href=""><span> | </span>{language.Public['agreement']}</a>
    	        </Checkbox>
	          </Form.Item>
          </div>
	        <Form.Item className="register-form-button register-box-right">
            <a href="#" id="" className={theme==='dark' ? "btn" : 'btnLight'}>
              {MakeElement('span', 4)}
              <Input type="submit" value='' className="form-input" />
              <h3 style={{color: 'unset'}}><b>
                {this.state.isLoading ? language.Public['registering']
                  :language.Public['register']}</b></h3>
            </a>
	        </Form.Item>
        </div>
	    </Form>
      </Spin>
      </Content>
      </div>
    )
  }
}
export default Register
