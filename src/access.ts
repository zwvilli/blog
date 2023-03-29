export default (initialState: API.UserInfo) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://umijs.org/docs/max/access
  // console.log('access', initialState)
  return {
    admin: initialState.level === 3,
    high: initialState.level === 2 || initialState.level === 3,
    normal: initialState.level === 1 || initialState.level === 2 || initialState.level === 3,
  }
};
