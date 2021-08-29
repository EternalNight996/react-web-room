/* ************************************************ */
/*File Name: zh.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年06月11日 星期五 13时32分11秒
*/
module.exports = {
  Socket: {
    SUCCESS: {
		  login: '登录成功, 欢迎你的到来',
		  register: '恭喜你注册成功，并成为本站VIP工号->',
		  logout: '成功退出登录',
    },
    ERROR: {
      0: '未知错误',
      1: '插入错误',
      2: '查询错误',
      3: '更新错误',
      4: '删除错误',
      5: '数据不完整',
      6: '数据不匹配',
      7: '生成凭证错误',
      8: '未认证登录',

		  login: '登录失败',
		  register: '注册失败',
		  registerExists: '注册帐号已存在',

		  server: '服务器到了火星',
		  1001: 'token解析失败',
		  1002: '用户已存在',
		  1003: '用户不存在',
		  1004: '密码错误',
		  1005: '房间不存在',
		  1006: '文件类型错误',
		  1007: '文件过大',
		  1008: '文件读取失败',
		  1009: '文件上传失败',
		  10010: '超出限制，用户最多能创建3个房间',
		  10011: '成功创建房间',
		  10012: '该房间已存在',
		  10013: '权限不足',
		  10014: '昵称被占用',
		  10015: '账号在其他设备登录!!!',
	    10016: '撤回失败，超出两分钟',
    }
  },

  Error: {
    patchNull: 'PATCH错误: 参数不能为null!',
	  putNull: 'PUT错误: 参数不能为null!',
	  endpointEmit: 'Endpoint错误: 接口点有误!',
	  schemaEmit: 'Schema错误: !',
	  arrayEmit: 'Array Emit: 类型有误!',
	  actionEmit: 'Action Emit: 请转换为字符串!',
	  rulePasswdLength: '密码长度太长!',
	  rulePasswdSort: '密码长度太短!',
	  rulePasswdReg: '密码格式不能含特殊字符!',
	  ruleUsernameLength: '用户名长度太长!',
	  ruleUsernameSort: '用户名长度太短!',
	  ruleUsernameReg: '用户名格式不能含特殊字符!',
	  ruleNicknameLength: '昵称长度太长!',
	  ruleNicknameSort: '昵称长度太短!',
	  ruleNicknameReg: '昵称格式不能含特殊字符!',
	  ruleEmailLength: '邮箱长度太长!',
	  ruleEmailSort: '邮箱长度太短!',
	  ruleEmailReg: '邮箱格式不能含特殊字符!',
	  rulePhoneReg: '手机号码格式不正确!',
	  email: '邮箱格式出错',
	  confirmPasswd: '请确认密码是否一致，匹配过程中发生错误!',
	  agreement: '请阅读协议',
    github: "github地址出错!",
    blog: "blog地址出错",
  },

  Public: {
	  email: '邮箱',
	  emailEmpty: '请输入邮箱',
	  remember: '记住',
	  login: '登录',
	  loging: '登录中...',
	  loginTitle: '登录界面',
	  register: '注册',
	  registering: '注册中...',
	  registerTitle: '注册界面',
	  nicknameExtra: '别人可视名称',
	  nicknameEmpty: '请输入昵称!',
	  nickname: '昵称',
	  username: '用户名',
	  usernameExtra: '请输入正确格式的用户名!',
	  usernameExtends: '用户名 | 手机号 | 邮箱',
	  usernameEmpty: '请输入你的用户名!',
    usernameLogin: '用户名或其他登录',
	  forgot: '忘记密码了',
	  passwdExtra: '请输入正确格式的密码!',
	  passwdEmpty: '请输入你的密码!',
	  passwd: '密码',
	  confirmPasswdEmpty: '请确认密码',
	  confirmPasswd: '确认密码',
	  phone: '手机号',
	  phoneEmpty: "请输入手机号",
    phoneLogin: '手机登录',
	  gender: '性别',
	  genderEmpty: "请选择性别",
	  captcha: "验证码",
	  captchaGet: '获取验证码',
	  captchaEmpty: "请输入验证码",
	  captchaExtra: '必须确认你不是机器人',
	  agreement: '协议',
	  agreementExtra: '我已阅读 ',
	  male: '先生',
	  female: '女士',
	  other: '其他',
	  loading: '加载中...',
    logout: '退出登录',
    myConfig: '我的配置',
    quit: '关闭',
    avatar: '头像',
    backTop: '回顶',
    waitDevelopment: "待作者开发",
    about: '关于',
    github: 'Github登录',
    wechat: '微信登录',
    qq: 'QQ登录',
    save: '保存',
    theme: '主题',
  },
  Chat: {
    name: '聊天',
    title: '聊天室'
  },

  Confirm: {
    logout: "请确认是否退出?",
  },

  Header: {
    main: '主页',
  },

  Footer: {
    sourceRecomment: "资源推荐",
    sponsor: "赞助商",
    otherInfo: "其他信息",
  },

  Date: {
    Y: '年',
    Y_: '-',
    M: '月',
    M_: '-',
    D: '号',
    D_: ' ',
    d: '日',
    d_: ' ',
    h: '时',
    h_: ':',
    m: '分',
    m_: ':',
    s: '秒',
    s_: ' ',
    ms: '毫秒',
    ms_: ' ',
    date: '日期',
    beforeFewSeconds: '几秒钟前',
    beforeOneMinute: '一分钟前',
    beforeTenMinutes: '十分钟前',
    beforeHalfHour: '半小时前',
    beforeOneHour: '一小时前',
    beforeOneDay: '一天前',
    beforeTowDay: '两天前',
    beforeThreeDay: '三天前',
    beforeOneWeek: '一周前',
  },

  MyInfo: {
    webName: "1379号监听站",
    author: "玫瑰与屠夫",
    github: "前往作者的github",
    blog: "前往作者的博客",
  },
}
