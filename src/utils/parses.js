/* ************************************************ */
/*File Name: utils/parses.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年07月03日 星期六 07时04分27秒
*/

// 解析search字符串
// str (string)
// attribute (string) 是否需要找特定属性，返回值.
export function parseSearch(str, attribute) {
  if (!str || typeof str !== 'string') {
    return
  }
  let search = str
  search = search.substring(1, search.length)
  let array = search.split('&')
  var keys,result = ''
  var object = {}
  for (var i=0; i < array.length; i++) {
    const key = array[i].split('=')
    if (attribute && typeof attribute === 'string') {
      if (key[0] === attribute) {
        result = key[1]
        break
      }
    }else{
      object = Object.assign(object,{
        [key[0]]: key[1]
      })
    }
  }
  if (result) {
    return result
  }
  return object
}

const myParses = {
  search: parseSearch
}
export default myParses
