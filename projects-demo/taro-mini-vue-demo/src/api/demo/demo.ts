import http from '../http-instance'

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
  return http.get(`${basePath}/base`)
}
