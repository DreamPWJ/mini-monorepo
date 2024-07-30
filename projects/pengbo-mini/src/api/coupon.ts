import http from './http-instance'

const basePath = `/coupon`


// 优惠券的信息
export function couponInfoReq(code) {
  return http.get(`${basePath}/qr-code/coupon-info/${code}`)
}

