import request from '@/utils/request'

export const getSearchSuggetionAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
  })
}
