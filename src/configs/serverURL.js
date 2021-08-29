/* ************************************************ */
/*File Name: config.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年05月31日 星期一 09时28分29秒
*/

let host, port = null
if (process.env.NODE_ENV === 'development') {
  host = "http://pudge.frpgz1.idcfengye.com"
  port = "80"
  // host = "http://eternal.frpgz1.idcfengye.com"
  // port =  "80"
}else {
  host = "http://pudge.frpgz1.idcfengye.com"
  port =  "80"
}
module.exports = {
  socket: {
    HOST: host,
    PORT: port,
  },
  img: {
    HOST: host,
    POST: port
  },
  blog: "https://www.cnblogs.com/EternalNight",
  github: "https://www.github.com/EternalNight996",
}
