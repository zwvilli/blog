import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space, Button, message } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import request from "umi-request";
import { history } from 'umi';

// const data = Array.from({ length: 23 }).map((_, i) => ({
//     href: 'https://ant.design',
//     title: `ant design part ${i}`,
//     avatar: `https://joesch.moe/api/v1/random?key=${i}`,
//     description:
//         'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//     content:
//         'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
// }));

// const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
//     <Space>
//         {React.createElement(icon)}
//         {text}
//     </Space>
// );

const arcList: React.FC = () => {
    const [posts, setPosts] = useState<any[]>()
    const [messageApi, contextHolder] = message.useMessage();

    const loading = () => {
        messageApi.open({
            type: 'loading',
        })
    };

    async function refresh() {
        try {
            loading()
            const res = await request.get('/api/posts')
            setPosts(res)
            console.log(res)
        } catch (error) {
            console.error(error)
        }
    }

    async function remove(id: Number) {
        try {
            loading()
            const res = await request.delete('/api/posts', {
                data: {
                    id
                }
            })
            let newPosts = posts?.filter(item => item.id !== id)
            setPosts(newPosts)
            console.log(newPosts)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        refresh()
    }, [])

    return (
        <div>

            {contextHolder}
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={posts}
                footer={
                    <div>
                        <b>ant design</b> footer part
                    </div>
                }
                renderItem={(item) => (

                    <List.Item
                        key={item.title}
                        actions={[
                            <Button type="text" onClick={() => {
                                history.push(`/admin/posts/${item.id}`, item)
                            }}>编辑</Button>,
                            <Button type="text" onClick={(e) => {
                                remove(item.id)
                            }}>删除</Button>,
                        ]}
                        extra={
                            <img
                                width={272}
                                height={200}
                                alt="image"
                                src={item.imageUrl ? item.imageUrl : "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"}
                            />
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.author.avatarUrl} />}
                            title={item.title}
                            description={item.author.introduce}
                        />
                        {
                            <div style={{ height: 100, overflow: 'hidden' }} dangerouslySetInnerHTML={{
                                __html: item.content
                            }}></div>
                        }
                    </List.Item>
                )}

            />
        </div>
    )
}

export default arcList
