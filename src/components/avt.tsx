import React from 'react';
import { ExportOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Space, Tooltip, Avatar } from 'antd';
import { history } from 'umi';
import { getCookie, removeCookie } from '@/utils/cookie'
import { connect } from 'umi'


const handleMenuClick: MenuProps['onClick'] = () => {
    history.push('/login')
    removeCookie('token')
};

const items: MenuProps['items'] = [
    {
        label: '退出登录',
        key: '1',
        icon: <ExportOutlined />,
    }
];

const menuProps = {
    items,
    onClick: handleMenuClick,
};

const Avt = (probs) => {
    return (<Space wrap>
        <Dropdown.Button menu={menuProps}>
            <Avatar size="small" src={probs.avatarUrl} icon={<UserOutlined />} />
            {probs.username}
        </Dropdown.Button>
    </Space>)
}

export default connect((state) => ({
    username: state.userInfo.username,
    avatarUrl: state.userInfo.avatarUrl
}))(Avt)