import request from '@/utils/request'

/**
 *登录API
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}
/**
 *
 * @param {String} mobile 手机号
 * @returns Promise
 */
export const getCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
// 获取当前用户的个人资料
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}
// 更新用户资料
export const updataUserProfile = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

/**
 * 更新头像
 */
// 如果传的是对象，axios默认将对象转换成json并且加上content-type=application/json
// 如果传的是formData表单，那么axios会将表单提交给后端，并且会默认会加上multipart/form-data
// 如果后端要的是表单(form-data)
// - const fm = new FormData()
//  fm.append(表单的name,表单项)

// file 图片的file对象
// 第一种方式
// export const updateUserPhoto = (file) => {
// const fm = new FormData()
// fm.append('photo', file)
//   return request({
//     method: 'PATCH',
//     url: '/v1_0/user/photo',
//     data:fm
//   })
// }

// 第二种方式
export const updateUserPhoto = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
/**
 * 获取用户自己的信息
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
  })
}

// 关注用户
export const addFollow = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}

// 取消关注
export const deleteFollow = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}
