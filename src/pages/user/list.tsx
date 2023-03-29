import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Button, Switch, message, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import request from "umi-request";
import { history } from "umi";

interface DataType {
    key: string;
    name: string;
    age: number;
    city: string;
    score: number;
}

type TablePaginationPosition =
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight';

const App: React.FC = () => {

    const columns: ColumnsType<DataType> = [
        {
            title: '序号',
            key: 'id',
            dataIndex: 'id',
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            render: (text: any, record: any) => (
                <div>
                    <Image
                        width={50}
                        height={50}
                        src={record.avatarUrl ? record.avatarUrl : "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}
                    />
                    <a>{text}</a>
                </div>),
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '个人简介',
            dataIndex: 'introduce',
            key: 'introduce',
        },
        {
            title: '权限',
            dataIndex: 'level',
            key: 'level',
            render: (text: any) => <p>
                {text === 3 ? 'admin' : text === 2 ? 'high' : 'normal'}
            </p>
        },
        {
            title: '状态',
            dataIndex: 'isAvailable',
            key: 'isAvailable',
            render: (text: any, record: any, index: any) => <Switch checkedChildren="开启" unCheckedChildren="禁用" checked={text} onClick={() => {
                console.log("record:", record);
                record.isAvailable = !record.isAvailable
                updateUser(record)
            }} />
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: any, record: any, index: any) => (
                <Space size="middle">
                    <Button type="link" size='small' onClick={() => {
                        // updateUser(record)
                        console.log(record)
                        history.push('/admin/user/update', record)
                        console.log("history", history)

                    }}>编辑</Button>
                    <Button type="link" size='small' onClick={() => {
                        // deleteUserByid(record)
                        console.log(record)
                    }}>删除</Button>
                </Space>
            ),
        },
    ];

    async function updateUser(record: any) {
        try {
            const res = await request.post(`/api/user/${record.id}`, {
                data: {
                    userId: record.id,
                    name: record.name,
                    introduce: record.introduce,
                    isAvailable: record.isAvailable,
                    avatarUrl: record.avatarUrl
                }
            })
            let newData = [...data]
            for (let i = 0; i < newData.length; i++) {
                if (newData[i].id === res.id) {
                    newData[i] = res
                    console.log("update res:", res);
                    break
                }
            }
            setData(newData)
        } catch (error) {
            console.error(error)

        }
    }
    async function deleteUserByid(record: any) {
        try {
            load()
            const res = await request.delete('/api/user', {
                data: {
                    id: record.id
                }
            })
            console.log("delete res", res)
            setLoading(true)
            loadingUser()
        } catch (error) {
            console.error(error)

        }
    }

    async function loadingUser() {
        try {
            const res = await fetch('/api/user')
            if (res.status === 200) {
                setData(await res.json())
                console.log(data)
                setLoading(false)
            }
            else {
                console.log(await res.text());
            }

        } catch (error) {
            console.error(error)
        }
    }

    let [data, setData] = useState([])
    let [loading, setLoading] = useState(true)
    const [messageApi, contextHolder] = message.useMessage();

    const load = () => {
        messageApi.open({
            type: 'loading',
            content: '正在删除，请稍后..',
        })
    };
    useEffect(() => {
        loadingUser()
    }, [])
    return (
        <div>
            {contextHolder}
            <Table loading={loading} columns={columns} dataSource={data} pagination={{ position: ['bottomCenter'] }} rowKey="id" />
        </div>

    )
}

export default App;