// 引入封装后的请求方法
import request from '../service'

/**
* 登录
* @returns
*/
export const loginApi = (data: any) => {
  return request.post('/users/login', data)
}


