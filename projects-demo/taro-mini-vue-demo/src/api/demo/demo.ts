import http from '../http-instance'
import Taro from '@tarojs/taro'

const basePath = `/token`

/**
 * API调用示例
 */
export function demoApi() {
  return http.get(`${basePath}/base`)
}

/**
 * 微信支付创建订单
 */
export function createPay() {
  Taro.setStorageSync('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTk0ODA2MjcsInN1YiI6IntcInVzZXJJZFwiOjF9IiwiaXNzIjoicGVuZ2JvLXBhcmstYXBwIn0.ygIW3PVks6_a7br13UnmfOl4wnPjBVii_xYcYOcsR1M')
  return http.post(`http://192.168.1.128:8180/weixin/pay/order`)
}
