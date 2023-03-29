
import styles from './login.less';
import { Card, message, Button, Checkbox, Form, Input, Row, Col } from 'antd';
import React, { useEffect } from 'react';
import { useModel, history, connect } from 'umi';
import request from 'umi-request';
import { signToken } from "@/utils/jwt";

const App = (probs) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [form] = Form.useForm();
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
    const data = {
      email: values.email,
      password: values.password
    }

    const result = await request.post('/api/login', {
      data
    })
    if (result) {
      success()
      setInitialState({
        isLogin: true,
        userInfo: result,
        level: result.level
      })
      if (values.remember) {
        localStorage.setItem('userInfo', JSON.stringify(result))
      }
      probs.dispatch({
        type: 'userInfo/updateUserName',
        payload: {
          username: result.name,
          avatarUrl: result.avatarUrl
        }
      })
      history.push('/admin')
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    let data = localStorage.getItem('userInfo')
    console.log(data);
    if (data) form.setFieldsValue(JSON.parse(data))
  }, [])

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
          form={form}
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

export default connect()(App)