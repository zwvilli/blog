import { Divider, Space, Tag, Button, message } from 'antd';
import { SettingOutlined, FormOutlined, BarsOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import request from 'umi-request';
import React, { useState, useEffect } from 'react';
import './cateList.less'
import { history } from 'umi'


const cateListApp: React.FC = () => {
    let [cateList, setCateList] = useState([])
    // let [loading, setLoading] = useState(true)
    const [messageApi, contextHolder] = message.useMessage();

    const loading = () => {
        messageApi.open({
            type: 'loading',
            content: '正在加载，请稍后..',
        })
    };
    const success = () => {
        messageApi.open({
            type: 'success',
            content: '加载成功',
        });
    };

    async function loadCate() {
        try {
            loading()
            const res = await request.get('/api/category')
            setCateList(res)
            console.log(res);
            success()

        } catch (error) {
            console.error(error)

        }
    }
    const color = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']

    useEffect(() => {
        loadCate()
    }, [])

    const items: MenuProps['items'] = [
        {
            label: '分类标签',
            key: 'tagLabel',
            icon: <SettingOutlined />,
        },]

    return (
        <div >
            <div className='cateHeader'>
                {/* <Button type="dashed" icon={<BarsOutlined />}></Button> */}
                <p>Category List</p>
                {/* <Button type="primary" icon={<FormOutlined />}> */}
                <Button type="primary" size='small' onClick={() => {
                    history.push('/category/pub')
                }}>
                    添加分类
                </Button>
            </div>
            {contextHolder}
            <div className='cateBody'>

                <Space size={[0, 8]} wrap>
                    {cateList.map((item, index) => (
                        <Tag color={color[index % color.length]} key={item.id} closable>{item.name}</Tag>
                    ))}
                </Space>
            </div>
        </div >

    )
}
export default cateListApp;
