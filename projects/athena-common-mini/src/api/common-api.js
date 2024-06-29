import Taro from '@tarojs/taro'

/**
 * 上传文件
 * 参考文档: https://docs.taro.zone/docs/apis/network/upload/uploadFile/
 */

export function uploadFile() {
  Taro.chooseImage({
    success (res) {
      const tempFilePaths = res.tempFilePaths
      Taro.uploadFile({
        url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
        filePath: tempFilePaths[0],
        name: 'file',
        formData: {
          'user': 'test'
        },
        success (res){
         // const data = res.data
        }
      })
    }
  })
}
