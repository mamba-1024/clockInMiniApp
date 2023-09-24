import React from 'react';
import { Tag } from '@nutui/nutui-react-taro';



const colorMap = {
  "待审批": (
    <Tag plain color="#faad14" background="#faad14" round>
      待审批
    </Tag>
  ),
  "已批准": (
    <Tag plain color="green" background="green" round>
      已批准
    </Tag>
  ),
  "已拒绝": (
    <Tag plain color="red" background="red" round>
      已拒绝
    </Tag>
  ),
};

export default function RecordItem(props) {
  const { record } = props;
  const { startDate, endDate, status, id, leaveType } = record;
  return (
    <div key={id} className="w-full flex flex-col items-center bg-white">
      <div className="flex flex-row items-center w-full">
        <div className=" text-gray-600 mr-[4px]">请假: </div>
        <div className=" text-gray-600">{colorMap[status]}</div>
      </div>
      <div className="flex flex-row items-center w-full px-[4px] py-[4px]">
        <div className=" text-gray-600 mr-[4px]">请假类型: </div>
        <div className=" text-gray-600">{leaveType}</div>
      </div>
      <div className="flex flex-row items-center w-full px-[4px] py-[4px]">
        <div className=" text-gray-600 mr-[4px]">开始时间: </div>
        <div className=" text-gray-600">{startDate}</div>~
        <div className=" text-gray-600">{endDate}</div>
      </div>
    </div>
  );
}
