import '../http-instance'
import Taro from '@tarojs/taro'

/**
 * 示例
 */
const basePath = `${process.env.baseURL}/token`;

export function demoApi() {
  return Taro.request({url: `${basePath}/base`})
}
