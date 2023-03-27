import type { CascaderProps, } from 'antd';
import './pub.less';
import request from "umi-request";

import {
    Button,
    Form,
    Input,
    Select,
    message
} from 'antd';
import React, { useState } from 'react';

const { Option } = Select;



const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const App: React.FC = () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const loading = () => {
        messageApi.open({
            type: 'loading',
            content: '正在添加用户，请稍后..',
        })
    };
    const success = () => {
        messageApi.open({
            type: 'success',
            content: '添加成功',
        });
    };

    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
        loading()
        const data = {
            email: values.email,
            password: values.password,
            name: values.name,
            introduce: values.introduce,
            level: +values.level,
            avatarUrl: values.avatarUrl
        }

        const res = await request.post('/api/user', {
            data
        })
        console.log(res)
        success()
        onReset()

    };
    const onReset = () => {
        form.resetFields();
    };

    return (
        <div>
            {contextHolder}
            <div className='usePubHeader'>
                <p>添加用户</p>
            </div>
            <div className='userPub'>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
                    style={{ maxWidth: 600 }}
                    scrollToFirstError
                >
                    <Form.Item name="avatarUrl" label="头像链接" rules={[{ required: true }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email" label="E-mail" rules={[
                            { type: 'email', message: 'The input is not valid E-mail!', },
                            { required: true, message: 'Please input your E-mail!', },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password" label="Password" rules={[
                            { required: true, message: 'Please input your password!', },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="name"
                        label="Username"
                        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        name="introduce"
                        label="Introduce"
                        rules={[{ required: true, message: 'Please input Intro' }]}
                    >
                        <Input.TextArea showCount maxLength={100} />
                    </Form.Item>

                    <Form.Item
                        name="level"
                        label="User Auth"
                        rules={[{ required: true, message: '请选择用户权限!' }]}
                    >
                        <Select placeholder="select your auth">
                            <Option value="1">normal</Option>
                            <Option value="2">high</Option>
                            <Option value="3">admin</Option>
                        </Select>
                    </Form.Item>


                    <Form.Item {...tailFormItemLayout} style={{ marginLeft: '30px' }}>
                        <Button type="primary" htmlType="submit" size='middle' style={{ marginRight: '15px' }}>
                            添加
                        </Button>
                        <Button htmlType="button" onClick={onReset} style={{ marginRight: '15px' }}>
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default App;