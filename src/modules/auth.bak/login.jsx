/* ************************************************ */
/*File Name: Login.jsx
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月12日 星期六 08时19分39秒
*/

//
import React,{Component, createRef} from 'react'
// 页面与组件
import { Input, Form, Checkbox, Spin } from 'antd'
// icon 图标
import { UserOutlined, LockOutlined } from '@ant-design/icons'
// 常量与动作
import {POST_LOGIN} from '../../constants/auth.js'

//批量生成元素,结构：string, int;
function MakeElement(element, num) {
  var temp = {element: element}
  return Array(num).fill(0).map(()=>{return <temp.element></temp.element>});
}
class Login extends Component {
  state = {
    loginLoading: false,
  }
  formRef = createRef();

  componentWillMount() {
  }

  render(){
    const {language} = this.props
    // 密码正则
    const regPasswd = /^[a-zA-Z0-9~!@#$%^&*()=|{}:;,\\.\S]*$/g
    // 用户名正则
    const regUsername = /^[^~!@#$%^&*()=|{}:;,\\.<>/'`"?￥…（）—【】《》“”’‘：。，、？\s]*$/g
    // 邮箱正则
    const regEmail = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/g
    /*
    const onRest = ()=>{
      this.formRef.current.resetFields() // 重置数据
    }
    */
    const onFill = ()=> {
      this.formRef.current.setFieldsValue({ // 设置数据
        passwd: ''
      })
      this.setState({loginLoading: false})
    }
    const onFinish = async (values) => {
      this.setState({loginLoading: true})
      // 唯一对外接口
      const {username, passwd} = values
      await this.props.postLoginEmit({username,passwd})// 传递参数到store -> reducer 再返回
      console.log(this.props)
      if (this.props.currentAction === POST_LOGIN && this.props.type === 'SUCCESS') {
        await this.props.saveUserConfigs()
        this.props.redirectMain()
      }
      onFill()
	  }

	  return (
      <Spin tip={language.Public['loging']} spinning={this.state.loginLoading}>
	    <Form name="login" className="login-form form-group" autoComplete="off"
        initialValues={{
          remember: true,
        }} ref={this.formRef} onFinish={onFinish}
         scrollToFirstError>
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

	      <Form.Item>
	        <Form.Item name="remember" valuePropName="checked" noStyle>
	          <Checkbox>{language.Public['remember']}</Checkbox>
	        </Form.Item>

	        <a style={{float: 'right'}}
            className="login-form-forgot" href="#">{language.Public['forgot']}</a>
	      </Form.Item>

	      <Form.Item className="login-form-button">
          <a href="#" id="" className="btn btn-login">{MakeElement('span', 4)}
            <Input type="submit" value='' className="form-input" />
            <p>{this.state.loginLoading ? language.Public['loging'] : language.Public['login']}</p>
          </a>
	      </Form.Item>
	    </Form>
      </Spin>
	  )
  }
}
export default Login
