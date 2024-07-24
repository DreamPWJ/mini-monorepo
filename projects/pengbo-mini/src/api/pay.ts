import http from './http-instance'

const basePath = `/qr-pay`

 
export function orderPay (data) {
  return http.post(`${basePath}/order/pay`, data)
}

export function orderInfo (gateCode) {
  return http.get(`${basePath}/order/${gateCode}`)
}
 