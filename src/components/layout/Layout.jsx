/* ************************************************ */
/*File Name: components/Layout.jsx
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月24日 星期四 18时06分59秒
*/
import '../../css/layout/Layout.css'

function Layout(props) {
  return (
    <div className="layout" id="layout-id"
      style={{background: props.theme==='dark' ? 'var(--colorDarkDeep)' : 'var(--colorLight)'}}
    >
      {props.children}
    </div>
  )
}

export default Layout
