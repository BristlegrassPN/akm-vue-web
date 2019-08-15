import vue from '@/main'
/**
 * util:业务无关的工具方法
 * helper:业务或框架有关的工具方法
 */
// import { Dialog, Toast } from 'vant'
//
// const alert = function(message = '', callBack, title = '提示') {
//   Dialog.alert({
//     title,
//     message
//   }).then(() => {
//     callBack && typeof callBack === 'function' && callBack()
//   })
// }
//
// const confirm = function(
//   message = '',
//   confirmCallBack,
//   cancelCallBack,
//   title = '提示'
// ) {
//   Dialog.confirm({
//     title,
//     message
//   })
//     .then(() => {
//       confirmCallBack &&
//         typeof confirmCallBack === 'function' &&
//         confirmCallBack()
//     })
//     .catch(() => {
//       cancelCallBack && typeof cancelCallBack === 'function' && cancelCallBack()
//     })
// }
//
// const showLoading = function(message = '加载中...', callBack, duration = 0) {
//   Toast.loading({
//     mask: true,
//     forbidClick: true,
//     duration,
//     message,
//     onClose: () => {
//       callBack && typeof callBack === 'function' && callBack()
//     }
//   })
// }
//
// const hideLoading = function() {
//   Toast.clear()
// }
//

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
export default {
  successMessage,
  errorMessage,
  warningMessage,
}
