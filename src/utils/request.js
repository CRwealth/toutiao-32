// 封装 axios 请求模块

import axios from 'axios'
// 克隆一个
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net', // 基础路径
  timeout: 3000
})

export default request
