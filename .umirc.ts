import { defineConfig } from "@umijs/max";

export default defineConfig({
  antd: {
    dark: false,
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  icons: {},
  layout: {
    title: "后台管理界面",
    locale: false,
    logo: 'https://img0.baidu.com/it/u=1328820332,4014752622&fm=253&fmt=auto&app=138&f=JPEG?w=516&h=500'
  },

  apiRoute: {
    platform: 'vercel'
  },
  routes: [
    { path: '/', component: 'index', name: '首页', layout: false },
    { path: '/articles/:postId', component: 'posts/postInfo', name: '文章详情页', layout: false },
    { path: '/login', component: 'login', name: '登录', layout: false },
    { path: '/admin', redirect: '/admin/posts/lists' },
    {
      path: '/admin/posts', name: '文章管理', icon: 'icon-wenzhang', access: 'normal',
      routes: [
        { path: '/admin/posts/lists', component: 'posts/list', name: '所有文章' },
        { path: '/admin/posts/create', component: 'posts/create', name: '新增文章' },
        { path: '/admin/posts/:postId', component: 'posts/post' },
      ]
    },
    {
      path: '/admin/user', name: '用户管理', icon: 'icon-wode1', access: 'high',
      routes: [
        { path: '/admin/user/lists', component: 'user/list', name: '用户列表' },
        { path: '/admin/user/pub', component: 'user/pub', name: '新增用户' },
        { path: '/admin/user/update', component: 'user/update' },
        { path: '/admin/user/:userId', component: 'user/userInfo' },
      ]
    },
    {
      path: '/admin/category', name: '分类管理', icon: 'icon-xiangmuguanli', access: 'high',
      routes: [
        { path: '/admin/category/lists', component: 'category/catelist', name: '分类列表' },
        { path: '/admin/category/pub', component: 'category/catePub', name: '新增分类' },
      ]
    },
    {
      path: '/admin/banner', name: '轮播管理', icon: 'icon-tuwen', access: 'admin',
      routes: [
        { path: '/admin/banner/lists', component: 'banner/list', name: '轮播列表' },
        { path: '/admin/banner/pub', component: 'banner/pub', name: '新增轮播图' },
      ]
    },
    { path: '/login', component: 'login' },
    { path: '/*', component: '404' },
  ],
  npmClient: "pnpm",
  dva: {}
  // tailwindcss: {},
});
