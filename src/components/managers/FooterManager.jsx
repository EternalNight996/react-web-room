/* ************************************************ */
/*File Name: components/Footer.jsx
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月24日 星期四 19时41分06秒
*/

// CSS样式
import '../../css/managers/FooterManager.css'
const images = require('../../configs/images.js')
const styles = (1) ?{
  layout: 'footer-layout',
  container: 'footer-container',
  topContainer: 'footer-top-container',
  title: 'title',
  top: 'footer-top',
  topEnd: 'footer-top-end',
  bottomContainer: 'footer-bottom-container',
  itemLink: 'footer-item-link',
} : {
  layout: 'footer-layout2',
  container: 'footer-container2',
  topContainer: 'footer-top-container2',
  title: 'title2',
  top: 'footer-top2',
  topEnd: 'footer-top-end2',
  bottomContainer: 'footer-bottom-container2',
  itemLink: 'footer-item-link2',
};

function FooterManager(props) {
  const {language, theme} = props
  return (
    <div className={styles.layout} style={{
      background: theme==='dark' ? 'var(--colorDark)' : 'var(--colorDarkGrey)',
      borderColor: theme==='dark' ? 'var(--colorLightBlue)' : 'var(--colorLightDark)'
    }}>
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <div className={styles.top}
            style={{borderColor: theme==='dark' ? 'var(--colorDarkBlue)' : 'var(--colorOpacityLight)'}}
          >
            <div className={styles.title}>
            {language.Public['about']+' '}{language.MyInfo['webName']}
            </div>
            <span>top</span>
          </div>
          <div className={styles.top}
            style={{borderColor: theme==='dark' ? 'var(--colorDarkBlue)' : 'var(--colorOpacityLight)'}}
          >
            <div className="title">{language.Footer['sourceRecomment']}</div>
            <span>测试top</span>
          </div>
          <div className={styles.top}
            style={{borderColor: theme==='dark' ? 'var(--colorDarkBlue)' : 'var(--colorOpacityLight)'}}
          >
            <div className={styles.title}>{language.Footer['sponsor']}</div>
            <span>top</span>
          </div>
          <div className={styles.topEnd}>
            <div className="title">{language.Footer['otherInfo']}</div>
            <span>top-end</span>
          </div>
        </div>
        <div className={styles.bottomContainer} style={{
          borderColor: theme==='dark' ? 'var(--colorDarkBlue)' : 'var(--colorOpacityLight)'
        }}>
          <a className={styles.itemLink}
            href="#" target="_blank" rel="noopener noreferrer">
            粤ICP备18099781号-6
          </a>
          <span> | </span>
          <a className={styles.itemLink}
            href="#" target="_blank" rel="noopener noreferrer">
            <img src={images.Public['110']} />
            粤公网安备 44030502004330号
          </a>
          <span> | </span>
          <a className={styles.itemLink}
            href="#" target="_blank" rel="noopener noreferrer">
            违法和不良信息举报
          </a>
          <br/>
          <span>由 Pudge 设计和编码 ❤</span>
        </div>
      </div>
    </div>
  )
}

export default FooterManager
