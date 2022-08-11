// 引入axios
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

// 克隆一个
// request.defaults.baseURL = 'http://toutiao.itheima.net'
// request.defaults.timeout = 3000
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 10000,
  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [
    function (data) {
      try {
        // 如果转换成功则返回转换的数据结果
        return JSONBig.parse(data)
      } catch (err) {
        // 如果转换失败，则包装为统一数据格式并返回
        return data
      }
    }
  ]
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // config是本次请求的配置
    // 在发送请求之前做些什么
    const token = store.state.tokenObj.token
    console.log(token)
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    // conifg一定要返回
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// const jsonStr = '{ "art_id": 1245953273786007552 }'

// console.log(JSON.parse(jsonStr)) // 1245953273786007600
// // JSON.stringify()

// // JSONBig 可以处理数据中超出 JavaScript 安全整数范围的问题
// console.log(JSONBig.parse(jsonStr)) // 把 JSON 格式的字符串转为 JavaScript 对象

// // 使用的时候需要把 BigNumber 类型的数据转为字符串来使用
// console.log(JSONBig.parse(jsonStr).art_id.toString()) // 1245953273786007552

// console.log(JSON.stringify(JSONBig.parse(jsonStr)))

// console.log(JSONBig.stringify(JSONBig.parse(jsonStr))) // 把 JavaScript 对象 转为 JSON 格式的字符串转

export default request
