import { useState } from 'react';
import { DatePicker, Cell, TextArea, Button } from '@nutui/nutui-react-taro';
import { Right } from '@nutui/icons-react-taro';
import Taro from '@tarojs/taro';
import { getToken } from '../../utils';

const startDate = new Date(2023, 0, 1);

export default function Overtime() {
  const [show1, setShow1] = useState(false); // 开始时间
  const [desc1, setDesc1] = useState(''); // 开始时间
  const [show2, setShow2] = useState(false); // 结束时间
  const [desc2, setDesc2] = useState(''); // 结束时间

  const confirm1 = (values: (string | number)[], options: any[]) => {
    const date = values.slice(0, 3).join('-');
    const time = values.slice(3).join(':');
    setDesc1(`${date} ${time}`);
  };

  const confirm2 = (values: (string | number)[], options: any[]) => {
    const date = values.slice(0, 3).join('-');
    const time = values.slice(3).join(':');
    setDesc2(`${date} ${time}`);
  };

  const handleSubmit = () => {
    if (!desc1 || !desc2) {
      Taro.showToast({
        title: '请选择时间',
        icon: 'none',
        duration: 1500
      });
      return;
    }
    console.log(getToken())
    const params = {
      userId: getToken().id,
      startTime: desc1,
      endTime: desc2,
    };
    console.log(params);
  }

  return (
    <div className='flex flex-col justify-start items-center w-full h-full'>
      <Cell title="加班事由">
        <TextArea />
      </Cell>
      <Cell.Group className='w-full'>
        <Cell
          title="开始时间"
          description={desc1}
          extra={<Right size={16} />}
          onClick={() => setShow1(true)}
        />
        <DatePicker
          title="日期时间选择"
          startDate={startDate}
          visible={show1}
          type="datetime"
          onClose={() => setShow1(false)}
          onConfirm={(options, values) => confirm1(values, options)}
        />
        <Cell
          title="结束时间"
          description={desc2}
          extra={<Right size={16} />}
          onClick={() => setShow2(true)}
        />
        <DatePicker
          title="日期时间选择"
          startDate={startDate}
          visible={show2}
          type="datetime"
          onClose={() => setShow2(false)}
          onConfirm={(options, values) => confirm2(values, options)}
        />
      </Cell.Group>
      <div className='flex-1 w-full pb-20 flex flex-col justify-end items-center'>
        <Button type='primary' className='w-2/4' onClick={handleSubmit}>提交</Button>
      </div>
    </div>
  );
}
