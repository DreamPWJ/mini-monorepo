export default defineAppConfig({
  pages: [
    'pages/my/my',
    'pages/index/index'
  ],
  subPackages: [
    {
      root: 'sub-package',
      pages: [
        'pages/details/details',
      ]
    }
  ],
  lazyCodeLoading: 'requiredComponents',
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#666',
    selectedColor: '#4171ff',
    backgroundColor: '#f5f5f5',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/images/tabbar/home.png',
        selectedIconPath: 'assets/images/tabbar/home_active.png'
      },
      {
        pagePath: 'pages/my/my',
        text: '我的',
        iconPath: 'assets/images/tabbar/my.png',
        selectedIconPath: 'assets/images/tabbar/my_active.png'
      }
    ]
  }
})
