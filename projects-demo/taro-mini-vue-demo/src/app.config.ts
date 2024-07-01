export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/my/my',
  ],
  subPackages: [
    {
      root: 'sub-package',
      pages: [
        'pages/details/details',
      ]
    }
  ],
  // renderer: 'skyline',
  // rendererOptions: {
  //   'skyline': {
  //     'defaultDisplayBlock': true,
  //     'defaultContentBox': true,
  //     'disableABTest': true
  //   }
  // },
  //componentFramework: 'glass-easel',
  lazyCodeLoading: 'requiredComponents',
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom'
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
