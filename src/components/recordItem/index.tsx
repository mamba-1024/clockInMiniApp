import React from 'react';
import { Tag } from '@nutui/nutui-react-taro';

const actionMap = {
  vacate: '请假',
  overtime: '加班',
};

const statusMap = {
  pending: '待审批',
  approved: '已通过',
  rejected: '已拒绝',
};

const descMap = {
  vacate: '请假类型',
  overtime: '加班事由',
};

const colorMap = {
  pending: (
    <Tag plain color="yellow" background="yellow" round>
      待审批
    </Tag>
  ),
  approved: (
    <Tag plain color="green" background="green" round>
      已通过
    </Tag>
  ),
  rejected: (
    <Tag plain color="red" background="red" round>
      已拒绝
    </Tag>
  ),
};

export default function RecordItem(props) {
  const { record } = props;
  const { action, startTime, endTime, status, id, desc } = record;
  return (
    <div key={id} className="w-full flex flex-col items-center bg-white">
      <div className="flex flex-row items-center w-full">
        <div className=" text-gray-600 mr-[4px]">{actionMap[action]}: </div>
        <div className=" text-gray-600">{colorMap[status]}</div>
      </div>
      <div className="flex flex-row items-center w-full px-[4px] py-[4px]">
        <div className=" text-gray-600 mr-[4px]">{descMap[action]}: </div>
        <div className=" text-gray-600">{desc}</div>
      </div>
      <div className="flex flex-row items-center w-full px-[4px] py-[4px]">
        <div className=" text-gray-600 mr-[4px]">开始时间: </div>
        <div className=" text-gray-600">{startTime}</div>~
        <div className=" text-gray-600">{endTime}</div>
      </div>
    </div>
  );
}
