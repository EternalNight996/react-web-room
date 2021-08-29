/* ************************************************ */
/*File Name: components/content.jsx
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月21日 星期一 18时33分09秒
*/
import '../../css/layout/Content.css'
export function Content({
    height, width, overflowY, overflowX, background,
    border, theme, style, Ref, children, centered,
    padding, margin, lineHeight, key, float, className, id,
    position, top, left,
  }) {
  return (
    <div className={className ? className :"content-container"}
      style={style ? style
        :
        {
        background: background ? background
          :theme==='dark' ? 'var(--colorDark)' : 'var(--colorWhite)',
        border: border ? border
          :theme==='dark' ? '1px solid var(--colorLightBlue)'
            : '1px solid var(--colorGrey)',
        width: width,
        height: height,
        padding: padding,
        margin: margin,
        overflowY: overflowY,
        overflowX: overflowX,
        textAlign: centered ? 'center' : '',
        lineHeight: lineHeight,
        float: float,
        position: position,
        top: top,
        left: left,
      }}
      ref={Ref}
      key={key}
      id={id}
    >
      {children}
    </div>
  )
}
export default Content
