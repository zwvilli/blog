import { Button, Form, Input, Select, message } from 'antd';
import React, { useEffect, useState } from 'react';
import request from "umi-request";
import ImgUpload from '@/components/ImgUpload';

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 12, span: 12 },
};

const BannerPub: React.FC = () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const loading = () => {
        messageApi.open({
            type: 'loading',
            content: '正在新增分类，请稍后..',
        })
    };
    const success = () => {
        messageApi.open({
            type: 'success',
            content: '新增成功',
        });
    };

    const onFinish = async (values: any) => {
        // console.log(values);
        try {
            const name = values.category
            loading()
            const res = await request.post('/api/category', {
                data: {
                    name: name
                }
            })
            console.log("res", res);
            onReset()
            success()

        } catch (error) {
            console.error(error)
        }

    };

    const onReset = () => {
        form.resetFields();
    };

    return (

        <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ marginTop: '100px', maxWidth: 600, marginLeft: '220px' }}
        >
            <Form.Item name="name" label="活动名称" rules={[{ required: true }]} >
                <Input />
            </Form.Item>
            <Form.Item name="imageUrl" label="图片链接" rules={[{ required: true }]} >
                <Input />
            </Form.Item>
            {contextHolder}
            <Form.Item {...tailLayout} style={{ marginLeft: '8px' }}>
                <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
                    提交
                </Button>
                <Button htmlType="button" onClick={onReset} style={{ marginRight: '8px' }}>
                    重置
                </Button>

            </Form.Item>
        </Form>

    );
}

export default BannerPub