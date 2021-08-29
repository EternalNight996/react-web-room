/* ************************************************ */
/*File Name: utils/timer.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月27日 星期日 18时17分22秒
*/
import {useState, useEffect} from 'react'
import immutable from 'immutable'

function lengthCheck(str, length) {
  let result = null
  const str_ = JSON.stringify(str)
  if (str_) {
    result = (str_.length <= length)
      ?
      Array(length).fill(0)+str_
      :
      str_
  }
  return result.toString().replace(/,/g,'')
}

function getTime(time, item) {
  let num, keep=0;
  if (item === 'Y' || item === 'Y_') {
    num = item === 'Y' ? new Date(time).getFullYear() : time/(1000*3600*24*365)
    keep = 2
  }else if (item === 'M' || item === 'M_') {
    num = item === 'M' ? new Date(time).getMonth() : time/(1000*3600*24*12)%12
    keep = 1
  }else if (item === 'd' || item === 'd_') {
    num = item === 'd' ? new Date(time).getDay() : time/(1000*3600*24)%365
    keep = 1
  }else if (item === 'D' || item === 'D_'){
    num = item === 'D' ? new Date(time).getDate() : time/(1000*3600*24)
    keep = item ==='D' ? 1 : 2
  }else if (item === 'h' || item === 'h_') {
    num = item === 'h' ? new Date(time).getHours() : time/(1000*3600)%24
    keep = 1
  }else if (item === 'm' || item === 'm_') {
    num = item === 'm' ? new Date(time).getMinutes() : time/(1000*60)%60;
    keep = 1
  }else if (item === 's' || item === 's_') {
    num = item === 's' ? new Date(time).getSeconds() : time/(1000)%60
    keep = 1
  }else if (item === 'ms' || item === 'ms_') {
    num = item === 'ms' ? new Date(time).getMilliseconds() : time%1000
    keep = 1
  }
  return lengthCheck(Math.floor(num),keep)
}

// time (Date().getTime())
// format (string) 格式'Y:Y_:M:M_:D:D_:d:d_'...
// dash (string) '-' '2021-20-20' '_' '2021_20_20'
// language (object) language['Y'] language['Y_']
export function timeToFormat(time, format, dash, language) {
  let result = '',
    _dash = dash ? dash : ':',
    _format = format ? format : '';
  const _time = time ? time : new Date().getTime();
  if (_format && typeof _format === 'string') {
    _format = _format.split(':')
  }
  if (typeof _format === 'object') {
    let s = _dash
    _format.forEach((item,index) => {
      if (language) {
        s = (![2,5].includes(index)? language[item] : ' ')
      }else{
        s = (_format.length>1 &&_format.length!==index+1 ? _dash : '')
      }
      result += getTime(_time, item)+s
    });
  }else if (_format !== null && _format){
    result = getTime(_time, _format)
  }else{
    ['Y','M','D','h','m','s'].forEach((item,index)=>{
      let s = _dash
      if (language) {
        s = (![2,5].includes(index)? language[item] : ' ')
      }else {
        if (index < 2) {
          s = (![2,5].includes(index)? '-' : ' ')
        }else{
          s = (![2,5].includes(index)? ':' : ' ')
        }
      }
      result += getTime(_time, item)+s
    });
  }
  return result
}

// time (Date() | Date().getTime())
// format (string)
// dash (string)
// language (object)
// timeout (number)
// children (dom)
export function TimerReverse({fontSize, color, time, format, dash, language, timeout, children}) {
  let _end = time ? time : '2381/1/1 00:00:00',
    _timeout = timeout ? timeout : 1000,
    _format = format ? format : 'Y_:M_:d_:h_:m_:s_:ms_';

  const nowtime = new Date(),  //获取当前时间
      endtime = new Date(_end);  //定义结束时间
  const lefttime = endtime.getTime() - nowtime.getTime()  //距离结束时间的毫秒数
  const [count, setCount] = useState(0)
  useEffect(() => {
    const id = window.setTimeout(() => {
      if (lefttime <= 0) {
        setCount(0)
        return () => window.clearTimeout(id)
      }
      setCount(c => c + 1);
    }, _timeout)
    return () => clearTimeout(id)
  }, [count])
  return <div className="myclick" style={{
      zIndex: "1",
      opacity: (count===0) ? "10%" : '80%',
    }}>
    {children}
    <span style={{
        fontSize: fontSize ? fontSize : '20px',
        color: color ? color : 'var(--colorGrey)'
      }}>{count>0 ? timeToFormat(lefttime, _format, dash, language)
        :<span style={{opacity: '0%'}}>-</span>}
    </span>
    </div>
}

// time (Date() | Date().getTime())
// language (object)
export function getMoment(time, language) {
  const now = new Date().getTime()
  const _time = new Date(time).getTime()
  const leftTime = Math.floor((_time - now)/1000)
  const lang = language ? language : {
    beforeFewSeconds: 'a few seconds before',
    beforeOneMinute: 'a minutes before',
    beforeTenMinutes: 'ten minutes before',
    beforeHalfHour: 'a half hour before',
    beforeOneHour: 'a hour before',
    beforeOneDay: 'a day before',
    beforeTowDay: 'tow day before',
    beforeThreeDay: 'three day before',
    beforeOneWeek: 'a week before',
  };
  if (leftTime<30) {
    return lang['beforeFewSeconds']
  }else if (leftTime<60){
    return lang['beforeOneMinute']
  }else if (leftTime<60*10){
    return lang['beforeTenMinutes']
  }else if (leftTime<60*30) {
    return lang['beforeHalfHour']
  }else if (leftTime<3600) {
    return lang['beforeOneHour']
  }else if (leftTime<(3600*24)) {
    return lang['beforeOneDay']
  }else if (leftTime<(3600*24*2)) {
    return lang['beforeTowDay']
  }else if (leftTime<(3600*24*3)) {
    return lang['beforeThreeDay']
  }else if (leftTime<(3600*24*7)) {
    return lang['beforeOneWeek']
  }else{
    return timeToFormat(_time, '', '', language)
  }
}

const Timer = {
  reverse: TimerReverse,
  toFormat: timeToFormat,
  getMoment,
}
export default Timer
