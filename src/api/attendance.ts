// 引入封装后的请求方法
import request from '../service'


/**
* 初始化打卡信息
* /attendance/init
* @returns
*/
export const getAttendanceApi = () => {
  return request.get('/attendance/init')
}

/**
 * 打卡
 * /attendance/doAttendance
 */
export const doAttendanceApi = (data: any) => {
  return request.post('/attendances/punch', data)
}


/**
 * 当天打卡记录
 * /attendance/attendanceRecord
 */
export const getClockInRecordApi = (data: any) => {
  return request.get('/attendances/punchRecord', data)
}

/**
 * 请假记录
 * /approvals
 */
export const getApprovals = (id: any) => {
  return request.get(`/approvals/${id}`)
}

/**
 * 请假
 */
export const postApprovals = (data: any) => {
  return request.post('/approvals', data)
}