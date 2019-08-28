/**
 * http
 */
import axios from 'axios'

import util from '@/providers/utils'
import helper from '@/providers/helper'
import globalData from '@/providers/globalData'

/**
 *  统一参数
 *  异常处理
 *  控制loading
 *  添加请求头
 *  请求数据缓存
 */

// https://www.kancloud.cn/yunye/axios/234845
const axiosBaseInstance = axios.create({
  baseURL: 'http://localhost:8989/',
  timeout: 10000,
  responseType: 'json'
})

const request = function (config) {
  if (config.cacheData) { // 如果需要缓存，先尝试从sessionStorage中取数据
    let data = util.sessionStorage.get(JSON.stringify(config))
    if (data) {
      return Promise.resolve(data)
    }
  }
  if (globalData.token) { //  添加请求头
    config.headers = { 'Authorization': `Bearer ${globalData.token}`, ...config.headers }
  }
  return axiosBaseInstance.request(config).then(res => {
    let data = res.data
    if (config.cacheData) { // 如果需要缓存，保存数据到sessionStorage中
      util.sessionStorage.set(JSON.stringify(config), data)
    }
    return Promise.resolve(data)
  }, err => {
    let response = err.response
    // 510是和后台约定的业务异常 BusinessException
    if (response.status === 510) {
      // response.data.code默认为0为具体的业务异常，和后台约定
      if (response.data.msg) {
        helper.alert(response.data.msg)
      }
    }
    return Promise.reject(err)
  })
}

const get = function (url, data, config) {
  return request({
    method: 'GET',
    url,
    params: data,
    ...config
  })
}

const del = function (url, data, config) {
  return request({
    method: 'DELETE',
    url,
    data: data,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    ...config
  })
}

const post = (url, data, config) => {
  return request({
    method: 'POST',
    url,
    data,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    ...config
  })
}

const postFormData = (url, data, config) => {
  return request({
    method: 'POST',
    url,
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    ...config
  })
}
const postQueryString = (url, data, config) => {
  return request({
    method: 'POST',
    url,
    params: data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    ...config
  })
}

export default {
  axiosBaseInstance,
  request,
  get,
  del,
  post,
  postFormData,
  postQueryString,
}
