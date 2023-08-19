import { useState, useEffect } from 'react';
import { Cell, Avatar } from '@nutui/nutui-react-taro';
import Taro, { useDidShow } from '@tarojs/taro';

export default function ClockIn() {
  const [time, setTime] = useState(new Date());
  // 保存打卡记录
  const [clockInRecord, setClockInRecord] = useState<any>({});
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  const handleClick = () => {
    const clockInTime = `${hours}:${minutes}:${seconds}`;
    // const clockInDate = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
    const clockInRecordItem = {
      [clockInRecord.start ? 'end' : 'start']: clockInTime,
    };
    setClockInRecord({...clockInRecord, ...clockInRecordItem});
    Taro.showToast({
      title: '打卡成功',
      icon: 'success',
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="page-container flex flex-col">
      <Cell>
        <div className="flex flex-row items-center">
          <Avatar
            className="avatar w-[40xp] h-[40px]]"
            shape="square"
            src="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
          />
          <span className="ml-[10px]">纪旭</span>
        </div>
      </Cell>
      <Cell
        align="center"
        className="flex flex-col justify-between items-center flex-1"
      >
        <div className="w-full">
          <span className="text-14px mb-8px">上班时间：{clockInRecord.start}</span>
          <span className="text-14px mb-8px">下班时间：{clockInRecord.end}</span>
        </div>
        <div
          onClick={handleClick}
          className="mb-50px h-140px w-140px bg-primary rounded-full flex  flex-col justify-center items-center text-white"
        >
          <span>{clockInRecord.start ? '下班打卡' : '上班打卡'}</span>
          <span>{`${hours}:${minutes}:${seconds}`}</span>
        </div>
        <div className="">
          <span className="mb-8px text-desc">上班：09:00-下班18:00</span>
        </div>
      </Cell>
    </div>
  );
}
