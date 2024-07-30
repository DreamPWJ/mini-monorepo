import http from './http-instance'

const basePath = `/coupon`


// 优惠券的信息
export function couponInfoReq(code) {
  return http.get(`${basePath}/qr-code/coupon-info/${code}`, null, {
    isErrorToast: false
  })
}

// 领取优惠券
export const applyCoupon = (plateNo, plateType, code) => {

  return http.post(`${basePath}/qr-code/apply-coupon`, { plateNo, plateType, code })
}
