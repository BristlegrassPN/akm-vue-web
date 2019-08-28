export function validator(reg) {
  return reg.test(value)
}

export function elementValidator(reg, errorMessage) {
  return (rule, value, callback) => {
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error(errorMessage))
    }
  }
}

// 常用的正则
export const regex = {
  // 手机号码
  phone: /^[1][0-9]{10}$/,
  // 用户名，只能是字母或数字，4到16位字符
  username: /^[a-zA-Z0-9]{4,16}$/,
  // 姓名，只能是字母或中文，2到16位字符
  name: /^[a-zA-Z\u4E00-\u9FA5]{2,16}$/,
  // 包含中文
  ch: /[\u4E00-\u9FA5]/,
  // 18位身份证，15位已被淘汰
  idCard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  // url地址
  url: /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/,

}