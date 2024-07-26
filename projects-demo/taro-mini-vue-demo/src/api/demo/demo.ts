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
 * API调用示例 单独使用http服务
 */
export function demoHttpApi() {
  return http.get(`http://192.168.1.128:8180${basePath}/base`)
}

/**
 * 微信登录
 */
export async function weiXinLogin() {
  Taro.setStorageSync('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTk0ODA2MjcsInN1YiI6IntcInVzZXJJZFwiOjF9IiwiaXNzIjoicGVuZ2JvLXBhcmstYXBwIn0.ygIW3PVks6_a7br13UnmfOl4wnPjBVii_xYcYOcsR1M')
  let code = ''
  await Taro.login({
    success: function(res) {
      if (res.code) {
        code = res.code
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
  console.log(code)
  return http.post(`http://127.0.0.1:8080/weixin/login`, { 'code': code }) // http://192.168.1.128:8180
}

/**
 * 微信支付创建订单
 */
export function createPay(data) {
  Taro.setStorageSync('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTk0ODA2MjcsInN1YiI6IntcInVzZXJJZFwiOjF9IiwiaXNzIjoicGVuZ2JvLXBhcmstYXBwIn0.ygIW3PVks6_a7br13UnmfOl4wnPjBVii_xYcYOcsR1M')
  return http.post(`http://192.168.1.128:8180/wx/pay/order`, data) // http://192.168.1.128:8180
}

/**
 * 微信获取手机号
 */
export function getPhone(data) {
  Taro.setStorageSync('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTk0ODA2MjcsInN1YiI6IntcInVzZXJJZFwiOjF9IiwiaXNzIjoicGVuZ2JvLXBhcmstYXBwIn0.ygIW3PVks6_a7br13UnmfOl4wnPjBVii_xYcYOcsR1M')
  return http.post(`http://192.168.1.128:8080/weixin/phone`, data) // http://192.168.1.128:8180
}
