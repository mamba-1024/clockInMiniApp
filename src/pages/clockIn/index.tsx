import { useState, useEffect } from 'react';
import { Cell, Avatar } from '@nutui/nutui-react-taro';
import { My } from '@nutui/icons-react-taro';
import Taro, { useDidShow } from '@tarojs/taro';
import { getToken } from '../../utils';
import { formatTime } from '../../utils/formatTime';
import { Api } from '../../api';

export default function ClockIn() {
  const [user, setUser] = useState<any>({});
  const [time, setTime] = useState(new Date());
  // 保存打卡记录
  const [clockInRecord, setClockInRecord] = useState<any>({});
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  const handleClick = () => {
    if (clockInRecord.checkIn && clockInRecord.checkOut) {
      Taro.showToast({
        title: '今日已打卡',
      });
      return;
    }

    const clockInTime = formatTime(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const checkDate = formatTime(new Date(), 'yyyy-MM-dd');
    const clockInRecordItem = {
      checkDate: checkDate,
      employeeId: user.id,
      [clockInRecord.checkIn ? 'checkOut' : 'checkIn']: clockInTime,
      type: clockInRecord.checkIn ? '2' : '1', // 上班 1 ， 下班 2
    };
    // 调用打卡接口
    Api.doAttendanceApi(clockInRecordItem).then((res: any) => {
      console.log('doAttendanceApi: ', res);
      if (res.data) {
        Taro.showToast({
          title: '打卡成功',
          icon: 'success',
        });
        setClockInRecord({ ...clockInRecord, ...clockInRecordItem });
      } else {
        Taro.showToast({
          title: '打卡失败',
          icon: 'error',
        });
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useDidShow(() => {
    // 从缓存中获取token, token不存在则跳转到登录页
    const token: any = getToken();
    if (!token) {
      Taro.reLaunch({ url: '/pages/login/index' });
    }
    // token 就是用户信息
    setUser(token);
    // 获取打卡信息
    Api.getClockInRecordApi({
      employeeId: Number(token.id),
      checkDate: formatTime(new Date(), 'yyyy-MM-dd'),
    }).then((res: any) => {
      console.log('getClockInRecordApi: ', res);
      if (res.data) {
        setClockInRecord(res.data);
      }
    });
  });

  return (
    <div className="page-container flex flex-col">
      <Cell>
        <div className="flex flex-row items-center">
          {/* <Avatar
            className="avatar w-[40xp] h-[40px]]"
            shape="square"
            src="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
          /> */}
          <Avatar icon={<My />} shape="square" />
          <span className="ml-[10px]">{user?.employeeName}</span>
        </div>
      </Cell>
      <Cell
        align="center"
        className="flex flex-col justify-between items-center flex-1"
      >
        <div className="w-full">
          <span className="text-14px mb-8px">
            上班时间：{clockInRecord.checkIn}
          </span>
          <span className="text-14px mb-8px">
            下班时间：{clockInRecord.checkOut}
          </span>
        </div>
        <div
          onClick={handleClick}
          className="mb-50px h-140px w-140px bg-primary rounded-full flex  flex-col justify-center items-center text-white"
        >
          <span>{clockInRecord.checkIn ? '下班打卡' : '上班打卡'}</span>
          <span>{`${hours}:${minutes}:${seconds}`}</span>
        </div>
        <div className="">
          <span className="mb-8px text-desc">上班：09:00-下班18:00</span>
        </div>
      </Cell>
    </div>
  );
}
