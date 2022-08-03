import request from '@/utils/request'
import store from '@/store'

// 让所有自动添加上Authorization请求头
export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
/**
 * 获取所有频道
 * @returns Promise
 */
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}
/**
 * 删除用户的频道
 * @param {*} target 频道的id
 * @returns Promise
 */
export const delChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}
