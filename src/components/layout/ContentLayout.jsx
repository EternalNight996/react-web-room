/* ************************************************ */
/*File Name: components/ContentLayout.jsx
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月21日 星期一 22时14分24秒
*/

// 组件
import React,{Component} from 'react'

export function ContentLayout({
    children, limit, padding, margin, width,height,
    float, maxHeight, maxWidth
    }) {

    const onChangeFloat = () => {
      var Width = maxWidth,
          Padding = padding ? padding : '';
      if (width==='100%') {
        Width = '100%'
        Padding = '0'
      }
      return (<div style={{
          padding: Padding,
          margin: margin,
          float: float,
          width: Width,
          height: height,
        }}>
        {children}
      </div>)
    }
  return (float ? onChangeFloat()
      :
    <div className="content-layout" style={{
      width: width,
      height: height,
      margin: 'auto',
      overflow: 'auto',
      padding: padding ? padding : '50px 10px 0 10px',
    }}>
       {children}
   </div>
  )
}

export default ContentLayout
