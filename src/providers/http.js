/**
 * http
 */
let fly = require('flyio')
import util from '@/providers/utils'
import helper from '@/providers/helper'
import store from '@/store/index'

/**
 *  统一参数
 *  异常处理
 *  控制loading
 *  添加请求头
 *  请求数据缓存
 */
// https://wendux.github.io/dist/#/doc/flyio/interceptor
fly.config.baseURL = process.env.VUE_APP_BASE_API
fly.config.timeout = 10000
fly.config.responseType = 'json'

//添加请求拦截器
fly.interceptors.request.use((request) => {
  if (request.cacheData) { // 如果需要缓存，先尝试从sessionStorage中取数据
    let data = util.sessionStorage.get(getCacheKey(request))
    if (data) {
      return Promise.resolve(data)
    }
  }
  let token = store.state.token
  if (token) { // 给所有请求添加自定义header
    request.headers['Authorization'] = `${token}`
  }
  return request
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  ({ data, request }) => {
    let result = data
    if (data.code === 1) {
      result = data.data
    }
    if (request.cacheData) { // 如果需要缓存，先尝试从sessionStorage中取数据
      util.sessionStorage.set(getCacheKey(request), result)
    }
    return result
  },
  ({ response }) => {
    if (response && response.status === 510) { // 510是和后台约定的业务异常 BusinessException
      let responseData = response.data
      responseData.msg && helper.alert(responseData.msg)
      return responseData
    } else {
      return {} // 运行时异常或未知异常,返回给请求
    }
  }
)

const getCacheKey = (request) => {
  return request.url + request.method + JSON.stringify(request.body) + JSON.stringify(request.params)
}

const get = (url, data, config) => {
  return fly.get(url, data, config)
}

const del = (url, body, config) => {
  debugger
  return fly.delete(url, body)
}

const post = (url, body, config) => {
  return fly.post(url, body, {
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    ...config
  })
}
const postQueryString = (url, data, config) => {
  return fly.post(url, data, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    ...config
  })
}
export default {
  fly,
  get,
  del,
  post,
  postQueryString
}
