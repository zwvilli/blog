import './pub.less';
import request from "umi-request";

import {
    Button,
    Form,
    Input,
    Select,
    message,
    Switch
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, history } from 'umi';

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

const App: React.FC = (probs) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const location = useLocation();

    const loading = () => {
        messageApi.open({
            type: 'loading',
            content: '正在修改用户，请稍后..',
        })
    };
    const success = () => {
        messageApi.open({
            type: 'success',
            content: '修改成功',
        });
    };

    const onFinish = async (values: any) => {
        let newData = { ...location.state }
        console.log('Received values of form: ', values);
        console.log("old data", newData)

        loading()
        const tabledata = {
            email: values.email,
            // password: values.password,
            name: values.name,
            introduce: values.introduce,
            level: +values.level,
            avatarUrl: values.avatarUrl
        }
        newData = { ...newData, ...tabledata }

        const res = await updateUser(newData)
        console.log(res)

        success()
        // onReset()
    };

    async function updateUser(record: any) {
        try {
            const res = await request.post(`/api/user/${record.id}`, {
                data: {
                    userId: record.id,
                    name: record.name,
                    introduce: record.introduce,
                    isAvailable: record.isAvailable,
                    avatarUrl: record.avatarUrl,
                    level: record.level,
                }
            })
            return res
        } catch (error) {
            console.error(error)
        }
    }

    const onReset = () => {
        form.resetFields();
    };

    useEffect(() => {
        // console.log(probs)
        // console.log("state", location.state)
        form.setFieldsValue(location.state)
    }, [])

    return (
        <div>
            {contextHolder}
            <div className='usePubHeader'>
                <p>修改用户信息</p>
            </div>
            <div className='userPub'>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
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
                        name="isAvailable"
                        label="状态"
                        rules={[{ required: true, message: 'Please setting status!' }]}
                    >
                        <Switch checkedChildren="开启" unCheckedChildren="禁用" checked={location.state.isAvailable} />

                    </Form.Item>

                    <Form.Item
                        name="level"
                        label="User Auth"
                        rules={[{ required: true, message: '请选择用户权限!' }]}
                    >
                        <Select placeholder="select your auth">
                            <Option value={1}>normal</Option>
                            <Option value={2}>high</Option>
                            <Option value={3}>admin</Option>
                        </Select>
                    </Form.Item>


                    <Form.Item {...tailFormItemLayout} style={{ marginLeft: '30px' }}>
                        <Button type="primary" htmlType="submit" size='middle' style={{ marginRight: '15px' }}>
                            修改
                        </Button>
                        <Button htmlType="button" onClick={() => {
                            history.push('/admin/user/lists')
                        }} style={{ marginRight: '15px' }}>
                            返回
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default App;