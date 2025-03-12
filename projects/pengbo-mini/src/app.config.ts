export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/qrpay/index',
    'pages/inner-qrpay/index',
    'pages/coupon-get/index',
    'pages/qrpay-result/index',
  ],
  // subPackages: [
  //   {
  //     root: 'sub-package',
  //     pages: [
  //       'pages/details/details'
  //     ]
  //   }
  // ],
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
    navigationBarTitleText: '澎泊停车',
    navigationBarTextStyle: 'black',
    //navigationStyle: 'custom'
  },
})
