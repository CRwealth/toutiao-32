import request from '@/utils/request'

export const getSearchSuggetionAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
  })
}

/**
 * 获取搜索结果
 */
export const getSearchResult = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
