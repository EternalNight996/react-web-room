/* ************************************************ */
/*File Name: utils/md5.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年07月03日 星期六 08时43分33秒
*/
import CryptoJS from 'crypto-js'
import md5 from 'blueimp-md5'

// bash64加密解密
export const bash64 ={
  // str (string)
  // secret (string)
  encode: function(str, secret) {
    if (str && typeof str === 'string') {
      var hash = `@!secret!@${str}`+(secret ? `@!${secret}!@` : '')
      hash = hash.split("").reverse()
      hash = hash.toString().replace(/,/g, '')
      return  window.btoa(hash)
    }
    return
  },
  // encode (string)
  // secret (string)
  decode: function(encode, secret) {
    if (encode && typeof encode === 'string') {
      var string = window.atob(encode)
      string = string.split('').reverse().toString().replace(/,/g,'')
      string = string.replace(/@!secret!@/g, '')
      string = secret ? string.replace(`@!${secret}!@`, '') : string
      return string
    }
    return
  }
}
// 内置加密解密
export const escaper = {
  // str (string)
  // secret (string)
  encode: function(str, secret) {
    if (str && typeof str === 'string') {
      var hash = `@!秘密!@${str}`+(secret ? `@!${secret}!@` : '')
      hash = hash.split("").reverse()
      hash = hash.toString().replace(/,/g, '')
      return escape(hash)
    }
  },
  // encode (string)
  // secret (string)
  decode: function(encode, secret) {
    if (encode && typeof encode === 'string') {
      unescape(encode)
      var string = unescape(encode)
      string = string.split('').reverse().toString().replace(/,/g,'')
      string = string.replace(/@!秘密!@/g,'')
      string = secret ? string.replace(`@!${secret}!@`,'') : string
      return string
    }
  }
}
// 256加密解密
export const sha = {
  // data (string||object)
  // type (string)
  SHA: function(data, type) {
    if (data && typeof data === 'string') {
      const myType = (type && typeof type === 'string') ? type : '256'
      let result = null
      if (type === '256') {
        result = CryptoJS.SHA256(data)
      }else if (type === '1') {
        result = CryptoJS.SHA1(data)
      }else if (type === '512') {
        result = CryptoJS.SHA512(data)
      }else if (type === '3') {
        result =  CryptoJS.SHA3(data, {outputLength: 256})
      }
      return result.toString(CryptoJS.enc['Hex'])
    }else if (typeof data === 'object') {
      var sha256 = CryptoJS.algo.SHA256.create()
      data.map((key)=>{
        if (key && typeof key === 'string') {
          sha256.update(key)
        }
      })
      return sha256.finalize().toString(CryptoJS.enc['Hex'])
    }
    return
  },
  // data (string||object)
  // secret (string)
  // type (string)
  HmacSHA: function(data, secret, type) {
    const mySecret = secret ? secret : ''
    if (data && typeof data === 'string') {
      const myType = (type && typeof type === 'string') ? type : '256'
      let result = null
      if (type === '256') {
        result = CryptoJS.HmacSHA256(data, mySecret)
      }else if (type === '1') {
        result = CryptoJS.HmacSHA1(data, mySecret)
      }else if (type === '512') {
        result = CryptoJS.HmacSHA512(data, mySecret)
      }
      return result.toString(CryptoJS.enc['Hex'])
    }else if (data && typeof data === 'array') {
      var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, mySecret)
      data.map((key)=>{
        if (key && typeof key === 'string') {
          hmac.update(key)
        }
      })
      return hmac.finalize().toString(CryptoJS.enc['Hex'])
    }
    return
  }
}

// AES加密解密
export const AES = {
  // str (string || object)
  // secret (string)
  // isObject (boolean)
  // options (object)
  encode: function(str, secret, isObject, options) {
    if (str) {
      var hash = null
      if (typeof str === 'string') {
        hash = str
      }else if (isObject){
        hash = JSON.stringify(str)
      }else{
        return
      }
      const mySecret = secret ? secret: ''
      return CryptoJS.AES.encrypt(hash, mySecret, options ? options:{
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.AnsiX923,
      }).toString()
    }
    return
  },
  // encode (string)
  // secret (string)
  // isObject (true)
  decode: function(encode, secret, isObject, options) {
    if (encode && typeof encode === 'string') {
      const mySecret = secret ? secret : ''
      var bytes = CryptoJS.AES.decrypt(encode, mySecret, options ? options :{
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.AnsiX923,
      })
      var string = bytes.toString(CryptoJS.enc.Utf8)
      if (isObject) {
        string = JSON.parse(string)
      }
      return string
    }
    return
  }
}

const myCryptos= {
  md5: md5,
  bash64: bash64,
  escaper: escaper,
  AES: AES,
  sha: sha,
  enc: CryptoJS.enc,
}
export default myCryptos
