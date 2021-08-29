/* ************************************************ */
/*File Name: components/MoveBox.jsx
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月28日 星期一 02时22分58秒
*/
import '../../css/decorates/MoveBox.css'
const myImg = require('../../configs/images.js').MyInfo
function MoveBox(){
  return (
<div className="wrap">
<div className="cube">
<div className="out_front">
  <img src={myImg.webLogo} alt="nothing" className="pic" />
</div>
<div className="out_back">
  <img src={myImg.webLogo} alt="nothing" className="pic" />
</div>
<div className="out_left">
  <img src={myImg.webLogo} alt="nothing" className="pic" />
</div>
<div className="out_right">
  <img src={myImg.webLogo} alt="nothing" className="pic" />
</div>
<div className="out_top">
  <img src={myImg.webLogo} alt="nothing" className="pic" />
</div>
<div className="out_bottom">
  <img src={myImg.webLogo} alt="nothing" className="pic" />
</div>

<span className="in_front">
  <img src={myImg.webLogo} alt="nothing" className="in_pic" />
</span>
<span className="in_back">
  <img src={myImg.webLogo} alt="nothing" className="in_pic" />
</span>
<span className="in_left">
  <img src={myImg.webLogo} alt="nothing" className="in_pic" />
</span>
<span className="in_right">
  <img src={myImg.webLogo} alt="nothing" className="in_pic" />
</span>
<span className="in_top">
  <img src={myImg.webLogo} alt="nothing" className="in_pic" />
</span>
<span className="in_bottom">
  <img src={myImg.webLogo} alt="nothing" className="in_pic" />
</span>
</div>
</div>
  )
}
export default MoveBox
