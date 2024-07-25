import http from './http-instance'

const basePath = `/qr-pay`


// 支付
export function orderPay (data) {
  return http.post(`${basePath}/order/pay`, data)
}

// 获取订单详情
export function orderInfo (gateCode) {
  return http.get(`${basePath}/order/${gateCode}`)
}

// 获取车牌类型
export async function  getPlateType  () {

  try {
    const { data }  = await http.get('/dict?codes=BIZ0010')
    if (data.code != 200) {
      return []
    }


    return data.data['BIZ0010']
  } catch(e) {
    return []
  }

}