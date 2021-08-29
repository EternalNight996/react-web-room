/* ************************************************ */
/*File Name: index.jsx
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月12日 星期六 08时02分09秒
*/

//
import React,{Component} from 'react';
// 页面与组件
import Login from './login.jsx' // 登录页面
import Register from './register.jsx' // 注册页面
// CSS样式
//import '../../css/auth.css' // 3D翻转布局
// 工具
import autobind from 'autobind-decorator'

class Auth extends Component {
  constructor(props) {
    super(props);
    // 状态结构储存transformBox()所设置的随机值，通过随机实现翻转Y180还是X180
    // 看到是上翻还是下翻，在这种随机的状态，当我们触发的次数频率高时，则可以实现三维反转的状态
    this.state = {
      random: 0,
      status: 1,
    };
  }

  // 通过随机翻转，实现三维旋转效果，目前是顺时针180度的控制。
  @autobind
  transformBox() {
    var A = document.getElementById('card-back-id');
    var B = document.getElementById('card-3d-wrapper-id');
    if (this.state.status === 1) {
      // js里没有做范围选择的随机生成，预Math.random生成的是0.24556......这样的15位小数点的数值。
      // 通过下面算法整理可以得到随机的个位数，再获取偶奇数，就得到0 | 1了。
      this.setState({
        random: (Math.random(1, 2)*10>>1)%2===0 ? 0 : 1
      })
      if (this.state.random) {
        A.style.transform = "rotateY(180deg)";
        B.style.transform = "rotateY(180deg)";
      } else {
        A.style.transform = "rotateX(180deg)";
        B.style.transform = "rotateX(180deg)";
      }
    } else {
      if (this.state.random) {
        A.style.transform = "rotateY(180deg)";
        B.style.transform = "rotateY(0deg)";
      } else {
        A.style.transform = "rotateX(180deg)";
        B.style.transform = "rotateX(0deg)";
      }
    }
    this.setState({
      status: this.state.status * -1
    })
  }

  render() {
    const {language} = this.props
    console.log('auth', this.props)
    return (
      <div className='auth-container'>
        <div className='card-container'>
          <input className="checkbox" type="checkbox" id="reg-log"
            name="reg-log" onClick={this.transformBox} />
          <label for="reg-log" ></label>
	        <div className="card-3d-wrap">
            <div className="card-3d-wrapper" id="card-3d-wrapper-id">
              <div className="card-font">
                <div className="center-wrap">
                  <div className="section text-center">
                    <h2>{language.Public['loginTitle']}</h2>
    	              <Login {...this.props} />
                  </div>
                </div>
              </div>
              <div className="card-back card-back-register" id="card-back-id">
                <div className="center-wrap">
                  <div className="section text-center">
                    <h2>{language.Public['registerTitle']}</h2>
	                  <Register {...this.props} transformBox={this.transformBox} />
  	              </div>
	              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Auth;
