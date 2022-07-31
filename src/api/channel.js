import request from '@/utils/request'
import store from '@/store'

// 让所有自动添加上Authorization请求头
export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
