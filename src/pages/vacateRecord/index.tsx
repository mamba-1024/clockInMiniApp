import Taro, { useDidShow } from '@tarojs/taro';
import { useState } from 'react';
import RecordItem from '../../components/recordItem';
import { Cell } from '@nutui/nutui-react-taro';
import { Api } from '../../api'



export default function VacateRecord() {
  const [record, setRecord] = useState<any[]>([]);
  useDidShow(() => {
    // 从缓存中获取token, token不存在则跳转到登录页
    const token = Taro.getStorageSync('token');
    if (!token) {
      Taro.reLaunch({ url: '/pages/login/index' });
      return;
    }
    Api.getApprovals(Number(token.id)).then((res: any) => {
      console.log('getApprovals: ', res);
      if (res.success) {
        setRecord(res.data.data);
      }
    });
  });

  return (
    <div className="page-container">
      {record.map((item) => (
        <Cell key={item.id}>
          <RecordItem record={item} />
        </Cell>
      ))}
    </div>
  );
}
