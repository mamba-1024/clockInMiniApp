import React, { useEffect } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { Cell, Avatar, Button } from '@nutui/nutui-react-taro';
import { getToken } from '../../utils'

import './index.scss'

function Index() {
  const [user, setUser] = React.useState<any>({})

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
          <span className="ml-[10px]">{user?.username}</span>
        </div>
      </Cell>
      <Cell title='手机号' extra={user?.phone}></Cell>
      <Cell title='年龄' extra={user?.age}></Cell>
      <Cell className='flex justify-center items-center mt-40px'>
        <span className='text-primary' onClick={handleLogout}>退出登录</span>
      </Cell>
    </div>
  )
}

export default Index
