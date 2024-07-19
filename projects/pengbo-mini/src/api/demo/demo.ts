import http from '../http-instance'

const basePath = `/token`

/**
 * API调用示例
 */
export function demoApi () {
  return http.get(`${basePath}/base`)
}

export function test () {
  return http.get('https://www.baidu.com')
}

export function login (code: String) {
  return http.post('/weixin/login', { code })
}
