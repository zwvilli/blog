import { FloatButton, Button, Row, Col, Card, Avatar } from 'antd';
import { CustomerServiceOutlined } from '@ant-design/icons';
import HeadImage from '@/assets/img/header-img.svg'
import '@/pages/index.less'

import NavBar from "@/components/NavBar";
import Content from "@/components/Content";
import Artcles from '@/components/Article';
import Footer from '@/components/Footer'
import { useEffect, useRef } from 'react';
import { useLocation, history } from 'umi';
import React from 'react';
const { Meta } = Card

const PostInfo: React.FC = () => {
    const location = useLocation();
    const state = location.state
    const actRef = useRef()

    useEffect(() => {
        // console.log(location.state)

    }, [])

    return (
        <div className="APP">
            <NavBar></NavBar>
            <Content></Content>

            <Row>
                <Col span={18} offset={4}>
                    <Card
                        bordered={false}
                        style={{ width: '100%' }}
                        // cover={

                        // }
                        actions={[
                            <a href='/'>回到首页</a>,
                            <div>作者:  {state.author.name}</div>,
                            <div>创建时间： {state.createdAt.substring(0, 10)}</div>,
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src={state.author.avatarUrl ? state.author.avatarUrl : "https://joesch.moe/api/v1/random"} />}
                            title={'标题：' + state.title}
                            description={'所属标签：' + state.tags.replace(',', ' ')}
                        />
                        <div style={{ width: '100%', margin: '20px 0' }} dangerouslySetInnerHTML={{
                            __html: state.content
                        }}>
                        </div>
                        <img
                            style={{ height: 300 }}
                            alt={state.title ? state.title : "example"}
                            src={state.imageUrl ? state.imageUrl : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
                        />
                    </Card>

                </Col>
            </Row>




            <Footer></Footer>

        </div>
    )
};

export default PostInfo