import Storage from '@/store/Storage'

const TOKEN = 'HEIMA_TOUTIAO_TOUKEN'

export const setToken = (value) => Storage.set(TOKEN, value)

export const getToken = () => Storage.get(TOKEN)

export const removeToken = () => Storage.remove(TOKEN)
