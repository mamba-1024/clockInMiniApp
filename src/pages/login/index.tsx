
import { Form, Button, Input } from '@nutui/nutui-react-taro';
import Taro from "@tarojs/taro";
import { Api } from '../../api'


const Login = () => {
  const submitFailed = (error: any) => {
    if(error?.length > 0) {
      Taro.showToast({ title: error[0].message, icon: 'error' })
      return
    }
  }

  const submitSucceed = (values: any) => {
    Api.loginApi(values).then((res: any) => {
      console.log('loginApi: ', res)
      if(res.data) {
        Taro.setStorageSync('token', res.data)
        Taro.reLaunch({ url: '/pages/index/index' })
      } else {
        Taro.showToast({ title: '登录失败', icon: 'error' })
      }
    })
  }

  const valueRangeValidator = (rule: any, value: string) => {
    // 密码必须是6位数字
    return /^\d{6}$/.test(value)
  }

  return (
    <div className="bg-white h-full w-full pt-10">
      <Form
        className="mt-0px"
        onFinish={(values) => submitSucceed(values)}
        onFinishFailed={(values, errors) => submitFailed(errors)}
        footer={
          <div
            className="w-full flex justify-center"
          >
            <Button formType="submit" type="primary" className="w-3/4">
              登录
            </Button>
          </div>
        }
      >
        <Form.Item
          label="姓名"
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input placeholder="请输入姓名" type="text" />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[
            { required: true, message: "请输入密码" },
            { validator: valueRangeValidator, message: "必须6位密码" },
          ]}
        >
          <Input placeholder="密码是6位数字" type="password" />
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login;
