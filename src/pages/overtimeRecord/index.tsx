import { useDidShow } from '@tarojs/taro';
import { useState } from 'react';
import RecordItem from '../../components/recordItem';
import { Cell } from '@nutui/nutui-react-taro';

const mockData = [
  {
    id: 1,
    action: 'overtime',
    startTime: '2023/8/1 18:00',
    endTime: '2023/8/1 22:00',
    status: 'approved',
    desc: "今天有点事情要处理"
  },
  {
    id: 2,
    action: 'overtime',
    startTime: '2023/8/3 19:00',
    endTime: '2023/8/3 22:00',
    status: 'approved',
    desc: "今天有点事情要处理"
  },
  {
    id: 3,
    action: 'overtime',
    startTime: '2023/8/5 18:00',
    endTime: '2023/8/5 22:00',
    status: 'rejected',
    desc: "今天有点事情要处理"
  },
];

export default function OvertimeRecord() {
  const [record, setRecord] = useState<any[]>([]);
  useDidShow(() => {
    console.log('OvertimeRecord');
    setRecord(mockData);
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
