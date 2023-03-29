import { Card, Col, Row, Avatar } from 'antd';
import React, { useEffect, useState } from 'react';
import request from 'umi-request';
import { history, useAccess } from "umi";
const { Meta } = Card;
import './article.less'

const App: React.FC = () => {
    let [articles, setArticles] = useState([])
    let [loading, setLoading] = useState(true)

    async function loadArticle() {
        try {
            const articles = await request.get('/api/posts')
            setArticles(articles)
            setLoading(false)
            console.log(articles)
        } catch (error) {
            alert(error)
        }
    }

    //发起请求
    useEffect(() => {
        loadArticle()
    }, [])

    return (
        <div className='tagline'>
            {loading && <Card style={{ width: 1200, marginTop: '0 150px' }} loading={loading}></Card>}
            <Row>
                <Col offset={3}>
                    {articles.map(item => <a href='/' onClick={(e) => {
                        e.preventDefault()
                        history.push(`/articles/${item.id}`, item)
                        console.log("history", history)
                    }} key={item.id}>
                        <Card
                            hoverable
                            style={{ width: 300, float: 'left', margin: '10px 15px' }}
                            cover={
                                <img
                                    alt={item.title}
                                    src={item.imageUrl ? item.imageUrl : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
                                    style={{ width: '100%', height: 220 }}
                                />
                            }
                        >
                            <Meta
                                avatar={<Avatar src={item.author.avatarUrl ? item.author.avatarUrl : "https://joesch.moe/api/v1/random"} />}
                                title={item.title}
                                description={item.tags.replace(',', ' ')}
                            />
                        </Card>
                    </a>)}

                </Col>
            </Row>
        </div >)

};

export default App;