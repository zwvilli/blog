import { Card, Col, Row, Avatar } from 'antd';
import React, { useEffect, useState } from 'react';
const { Meta } = Card;
import './footer.less'
import logo from '@/assets/img/logo.svg'
import navIcon1 from '@/assets/img/nav-icon1.svg'
import navIcon2 from '@/assets/img/nav-icon2.svg'
import navIcon3 from '@/assets/img/nav-icon3.svg'

const App: React.FC = () => {

    return (
        <div className='footer'>
            <Row align='middle'>
                <Col size={12} span={6} offset={4}>
                    <img src={logo} alt="Logo" />
                </Col>
                <Col size={12} span={6} style={{ padding: '15px 0' }}>
                    <div className="social-icon">
                        <a href="#"><img src={navIcon1} alt="Icon" /></a>
                        <a href="#"><img src={navIcon2} alt="Icon" /></a>
                        <a href="#"><img src={navIcon3} alt="Icon" /></a>
                    </div>
                    <p style={{ color: 'white' }}>Copyright 2023. All Rights Reserved</p>
                </Col>
            </Row>
        </div>)

};

export default App;