// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import { RightContent } from '@ant-design/pro-components';
import { RunTimeLayoutConfig } from '@umijs/max';
import type { ProSettings } from '@ant-design/pro-components';
import { history } from 'umi';
import { getCookie, removeCookie } from '@/utils/cookie'
import Avt from './components/avt'
import userInfo from './models/userInfo';

export async function getInitialState() {
  let userState = {
    isLogin: false,
    userInfo: {},
    level: 1
  }
  let loaclInfo = localStorage.getItem('userInfo')
  if (loaclInfo) {
    loaclInfo = JSON.parse(loaclInfo)
    userState.isLogin = true,
      userState.userInfo = {
        username: loaclInfo.name,
        avatarUrl: loaclInfo.avatarUrl
      },
      userState.level = loaclInfo.level
  }
  return userState
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {

  return {
    iconfontUrl: '//at.alicdn.com/t/c/font_3981326_2t45h144j3u.js',
    logo: 'https://img0.baidu.com/it/u=1328820332,4014752622&fm=253&fmt=auto&app=138&f=JPEG?w=516&h=500',
    dark: true,
    menu: {
      locale: false,
    },
    fixSiderbar: true,
    layout: 'mix',
    // avatarProps: {
    //   src: 'https://img2.baidu.com/it/u=2308712963,3942473931&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    //   size: 'small',
    //   title: 'admin',
    // },
    siderWidth: 180,
    onPageChange: () => {
      if (!initialState.isLogin) {
        history.push('/login')
      }
    },
    rightRender: () => {
      return <Avt></Avt>
    }
  };
};

