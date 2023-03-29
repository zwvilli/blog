import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Row, Col, Space, Button } from 'antd';
import '@/pages/index.less'
import { history } from 'umi';

const items: MenuProps['items'] = [
  {
    label: 'Home',
    key: 'home',
    icon: <MailOutlined />,
  },
  {
    label: 'skills',
    key: 'skills',
    icon: <AppstoreOutlined />,
  },
  {
    label: 'introduce',
    key: 'introduce',
    icon: <SettingOutlined />,
  },
];


const App: React.FC = () => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <nav style={{ backgroundColor: '#121212', position: 'relative' }}>
      <Row align='middle'>
        <Col span={2} offset={4}>
          <Button type="link" style={{ color: 'white' }}><strong>VVVV</strong></Button>
        </Col>
        <Col span={12} >
          <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ backgroundColor: '#121212', color: 'white' }} />
        </Col>
        <Col span={2} offset={2}>
          <Button type="link" style={{ color: 'white' }} onClick={() => {
            history.push('/login')
          }}>登录</Button>
        </Col>
      </Row>
    </nav>
  )
};

export default App;