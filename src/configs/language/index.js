import store from '../../store/index.js'
// 事实获取页面配置en/zh

const lang = store.getState().getIn(['pageUI','language'])
const regZH = /zh*/i
//const regEN = /en*/i

export const config = {
  'enUS': require('./en.js'),
  'zhCN': require('./zh.js')
}

export const configLanguage = (state) => {
  return (regZH.test(state)) ? config['zhCN'] : config['enUS']
}

export default configLanguage(lang)
