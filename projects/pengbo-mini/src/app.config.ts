export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/my/my',
    'pages/qrpay/index'
  ],
  subPackages: [
    {
      root: 'sub-package',
      pages: [
        'pages/details/details'
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
  // componentFramework: 'glass-easel',
  lazyCodeLoading: 'requiredComponents',
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
    //navigationStyle: 'custom'
  }
})
