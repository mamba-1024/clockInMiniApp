import React, { useEffect } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { Cell, Avatar, Button } from '@nutui/nutui-react-taro';
import { getToken } from '../../utils'

import './index.scss'


function Index() {
  const [user, setUser] = React.useState<any>({}) // {"id":1004,"employeeName":"赵六12","department":"技术部","position":"软件工程师"}

  useDidShow(() => {
    // 从缓存中获取token, token不存在则跳转到登录页
    const token = getToken()
    if(!token) {
      Taro.reLaunch({ url: '/pages/login/index' })
    }
    // token 就是用户信息
    setUser(token)
  })

  const handleLogout = () => {
    Taro.clearStorageSync()
    Taro.reLaunch({ url: '/pages/login/index' })
  }


  return (
    <div className="page-container">
      <Cell>
        <div className="flex flex-row items-center">
          <Avatar
            className="avatar w-[40xp] h-[40px]]"
            shape="square"
            src="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
          />
          <span className="ml-[10px]">{user?.employeeName}</span>
        </div>
      </Cell>
      <Cell title='部门' extra={user?.department}></Cell>
      <Cell title='职位' extra={user?.position}></Cell>
      <Cell className='flex justify-center items-center mt-40px'>
        <span className='text-primary' onClick={handleLogout}>退出登录</span>
      </Cell>
    </div>
  )
}

export default Index
