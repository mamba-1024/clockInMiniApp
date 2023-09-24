import Taro from '@tarojs/taro';
import { Cell } from '@nutui/nutui-react-taro';
import { Clock, Add, Right } from '@nutui/icons-react-taro';

export default function Attendance() {
  const onJumpClick = (link: string) => {
    if (link) {
      Taro.navigateTo({ url: link });
    }
  };


  return (
    <div className="page-container">
      <Cell className="flex flex-row justify-center items-center">
        {/* <div
          className="h-[100px] flex flex-col justify-center items-center mr-[70px]"
          onClick={() => onJumpClick('/pages/overtime/index')}
        >
          <Add className="text-primary" />
          <span className="mt-[10px]">加班</span>
        </div> */}
        <div
          className="h-[100px] flex flex-col justify-center items-center"
          onClick={() => onJumpClick('/pages/vacate/index')}
        >
          <Clock className="text-primary" />
          <span className="mt-[10px]">请假</span>
        </div>
      </Cell>
      {/* <Cell
        title="加班申请记录"
        align="center"
        extra={<Right size={16} />}
        onClick={() => onJumpClick('/pages/overtimeRecord/index')}
      ></Cell> */}
      <Cell
        title="请假申请记录"
        align="center"
        extra={<Right size={16} />}
        onClick={() => onJumpClick('/pages/vacateRecord/index')}
      ></Cell>
    </div>
  );
}
