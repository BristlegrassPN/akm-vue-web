import vue from '@/main'
import http from '@/providers/http_axios'

/**
 * util:业务无关的工具方法
 * helper:业务或框架有关的工具方法
 */
const successMessage = (message = '操作成功') => {
  vue.$message({
    message: message,
    showClose: true,
    type: 'success'
  })
}
const errorMessage = (message = '操作失败') => {
  vue.$message({
    message: message,
    showClose: true,
    type: 'error'
  })
}
const warningMessage = (message = '') => {
  vue.$message({
    message: message,
    showClose: true,
    type: 'warning'
  })
}

const warningConfirm = (message) => {
  return vue.$confirm(message, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
}

let alertIsExist = false // 用户判断alert已经存在则不再弹出
const alert = (message, title = '提示', callback) => {
  if (alertIsExist) {
    return
  }
  alertIsExist = true
  vue.$alert(message, title, {
    confirmButtonText: '确定',
    callback: () => {
      alertIsExist = false
      callback && callback()
    }
  })
}

const fetchDictData = (type) => {
  return http.postQueryString('/sys/dict/view/findByType', { type }, { cacheData: true })
}

export default {
  successMessage,
  errorMessage,
  warningMessage,
  warningConfirm,
  alert,
  fetchDictData,
}
