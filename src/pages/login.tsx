
import styles from './login.less';
import { Card, message, Button, Checkbox, Form, Input, Row, Col } from 'antd';
import React from 'react';
import { useModel, history } from 'umi';
import request from 'umi-request';
import { signToken } from "@/utils/jwt";

const App = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const [messageApi, contextHolder] = message.useMessage();

  const loading = () => {
    messageApi.open({
      type: 'loading',
      content: '正在登录，请稍后..',
    })
  };
  const success = () => {
    messageApi.open({
      type: 'success',
      content: '登录成功',
    });
  };


  const onFinish = async (values: any) => {
    loading()
    const result = await request.post('/api/login', {
      data: {
        email: values.email,
        password: values.password
      }
    })
    console.log("登陆结果", result);
    if (result) {
      success()
      setInitialState({
        isLogin: true,
        userInfo: result
      })
      history.push('/admin')
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (<Row style={{
    padding: 0,
    margin: 0,
    background: '#f6f6f6',
    height: '100vh',
  }} align='middle' >
    {contextHolder}
    <Col span={6} offset={9}>
      <Card size="small" title="登录" extra={<a href="#">注册</a>}>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Col>
  </Row>)
}

export default App;