import React, { useEffect, useState } from 'react'
import { Row, Col, Space, Button, Image, Card } from 'antd';
import bg from '@/assets/img/banner-bg.png'
import '@/components/Content.less'
import headImage from '@/assets/img/header-img.svg'
import 'animate.css';

export default function Content() {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const [index, setIndex] = useState(1);
    const toRotate = ["Web Developer", "Web Designer"];
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => { clearInterval(ticker) };
    }, [text])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setIndex(prevIndex => prevIndex - 1);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setIndex(1);
            setDelta(500);
        } else {
            setIndex(prevIndex => prevIndex + 1);
        }
    }

    return (
        <div style={{
            backgroundImage: `url(${bg})`,
            width: '100%',
            height: '700px',
        }}>
            <Row align="middle" wrap={false}>
                <Col span={20} offset={4}>
                    <div className='banner'>
                        <Card style={{
                            width: 550, height: 500, margin: '50px 50px', float: 'left',
                            backgroundColor: 'rgba(255,255,255,0)'
                        }} bordered={false}>
                            <div className='animate__animated animate__fadeIn'>
                                <span className="tagline">Welcome to my Blog</span>
                                <h1>{`Hi! I'm VV`}<br />
                                    <span className="txt-rotate" data-period="1000" data-rotate='[ "Web Developer", "Web Designer"]'>
                                        <span className="wrap">{text}</span>
                                    </span></h1>
                                {/* <h1 className="secondfont mb-3 font-weight-bold"> */}
                                {/* <br />欢迎来到我的个人博客 */}
                                <p><span style={{ color: 'skyblue', padding: '5px' }}>郑薇</span>,  1999年，硕士研究生;</p>
                                <p>现就读于<strong>重庆邮电大学</strong>计算机科学与技术学院，<strong>计算机技术专业</strong>，2021-至今</p>
                                <p className="mb-3">目前还有功能正在开发中....</p>
                                <p className="mb-3">敬请期待！</p>
                            </div>
                        </Card>
                        <Card style={{ width: 300, height: 500, margin: '50px -30px', float: 'left' }}>
                            <div className='animate__animated animate__zoomIn'>
                                <img src={headImage} alt="Header Img" />
                            </div>
                        </Card>
                    </div>
                </Col>
                <Col>
                </Col>
            </Row>
        </div>
    )
}
