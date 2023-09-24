import { useState } from 'react';
import { DatePicker, Cell, Picker, Button } from '@nutui/nutui-react-taro';
import { Right } from '@nutui/icons-react-taro';
import Taro from '@tarojs/taro';
import { getToken } from '../../utils';
import { Api } from '../../api'


const startDate = new Date(2023, 0, 1);

const listData = [
  {
    value: '1',
    text: '事假',
  },
  {
    value: '2',
    text: '病假',
  },
  {
    value: '3',
    text: '年假',
  },
  {
    value: '4',
    text: '亲子假',
  },
  {
    value: '5',
    text: '婚假',
  },
  {
    value: '6',
    text: '产假',
  },
  {
    value: '7',
    text: '陪产假',
  },
  {
    value: '8',
    text: '丧假',
  },
];

export default function Vacate() {
  const [show1, setShow1] = useState(false); // 开始时间
  const [desc1, setDesc1] = useState(''); // 开始时间
  const [show2, setShow2] = useState(false); // 结束时间
  const [desc2, setDesc2] = useState(''); // 结束时间
  const [show3, setShow3] = useState(false); // 假期类型
  const [desc3, setDesc3] = useState(''); // 假期类型

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

  const confirmPicker = (options: any[], values: (string | number)[]) => {
    console.log(options, values);
    setDesc3(options[0].text);
  };

  const handleSubmit = () => {
    if (!desc1 || !desc2) {
      Taro.showToast({
        title: '请选择时间',
        icon: 'none',
        duration: 1500,
      });
      return;
    }
    if(!desc3) {
      Taro.showToast({
        title: '请选择假期类型',
        icon: 'none',
        duration: 1500,
      });
      return;
    }
    const user: any = getToken();
    const params = {
      startDate: desc1,
      endDate: desc2,
      leaveType: desc3,
      employeeId: user.id,
      employeeName: user.employeeName,
    };
    Api.postApprovals(params).then((res: any) => {
      if (res.data) {
        Taro.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1500,
        });
        Taro.navigateBack();
      }
    });
  };

  return (
    <div className="flex flex-col justify-start items-center w-full h-full">
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
      <Cell
        title="假期类型"
        description={desc3}
        extra={<Right size={16} />}
        onClick={() => setShow3(!show3)}
      />
      <Picker
        visible={show3}
        options={listData}
        onConfirm={(list, values) => confirmPicker(list, values)}
        onClose={() => setShow3(false)}
      />
      <div className="flex-1 w-full pb-20 flex flex-col justify-end items-center">
        <Button type="primary" className="w-2/4" onClick={handleSubmit}>
          提交
        </Button>
      </div>
    </div>
  );
}
