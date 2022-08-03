// 封装 axios 请求模块
import store from '@/store'
import axios from 'axios'
// 克隆一个
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net', // 基础路径
  timeout: 3000
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // config是本次请求的配置
    // 在发送请求前做些什么
    const token = store.state.tokenObj.token
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    // config一定要返回
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
export default request
