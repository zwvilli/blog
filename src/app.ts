// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import { RightContent } from '@ant-design/pro-components';
import { RunTimeLayoutConfig } from '@umijs/max';
import type { ProSettings } from '@ant-design/pro-components';
import { history } from 'umi';
import { getCookie } from '@/utils/cookie'

export async function getInitialState() {
  let userState = {
    isLogin: false,
    userInfo: null
  }
  console.log("getInitialState运行时配置", userState)

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
    avatarProps: {
      src: 'https://img2.baidu.com/it/u=2308712963,3942473931&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      size: 'small',
      title: 'admin',
    },
    onPageChange: () => {
      if (!initialState.isLogin && !getCookie('token')) {
        history.push('/login')
      }

    },
  };
};

