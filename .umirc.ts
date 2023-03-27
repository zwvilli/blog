import { defineConfig } from "@umijs/max";

export default defineConfig({
  antd: {
    dark: true,
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: "文章管理",
    locale: false
  },
  apiRoute: {
    platform: 'vercel'
  },
  routes: [
    { path: '/', component: 'index', name: '首页' },
    {
      path: '/posts', name: '文章管理', routes: [
        { path: '/posts/lists', component: 'posts/list', name: '所有文章' },
        { path: '/posts/create', component: 'posts/create', name: '新增文章' },
        { path: '/posts/:postId', component: 'posts/post' },
      ]
    },
    {
      path: '/user', name: '用户管理', routes: [
        { path: '/user/lists', component: 'user/list', name: '用户列表' },
        { path: '/user/pub', component: 'user/pub', name: '新增用户' },
        { path: '/user/:userId', component: 'user/userInfo' },
      ]
    },
    {
      path: '/category', name: '分类管理', routes: [
        { path: '/category/lists', component: 'category/catelist', name: '分类列表' },
        { path: '/category/pub', component: 'category/catePub', name: '新增分类' },
        // { path: '/user/:userId', component: 'user/userInfo' },
      ]
    },
    {
      path: '/banner', name: '轮播管理', routes: [
        { path: '/banner/lists', component: 'banner/list', name: '轮播列表' },
        { path: '/banner/pub', component: 'banner/pub', name: '新增轮播图' },
      ]
    },
    { path: '/login', component: 'login' },
    { path: '/*', component: '404' },

  ],
  npmClient: "pnpm",
  // tailwindcss: {},
});
