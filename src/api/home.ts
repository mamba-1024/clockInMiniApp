// 引入封装后的请求方法
import request from '../service'


/**
* 首页信息
* /index/info
* @returns
*/
export const getHomeInfoApi = () => {
  return request.get('/index/info')
}
