import axios, {AxiosInstance} from 'axios'
import {failHandle, httpErrorMsg, requestPage, responsePage, toLogin} from '../utils/http-util'
import type {HttpParams} from '../types/http-params'

/**
 * @author 潘维吉
 * @description 核心通用http请求配置和拦截器
 * token授权、调试日志、输入输出数据处理、错误异常处理等
 */
export class Http {
  // 调式日志标签
  timeLabel = '接口响应总耗时统计'

  /**
   * 初始化 请求和响应拦截器
   */
  init(httpParams: HttpParams) {
    // 基础配置
    const instance = axios.create({
      baseURL: httpParams.baseURL, // 配置请求基础地址
      headers: httpParams.headers, // 定义公共headers 如{ 'content-type': 'application/json' }
      withCredentials: true,
      timeout: 60000, // 配置请求超时时间
    })
    // 请求处理拦截器
    this.request(instance, httpParams)
    // 响应处理拦截器
    this.response(instance, httpParams)
    return instance
  }

  /**
   * 请求处理拦截器
   */
  request(instance: AxiosInstance, httpParams: HttpParams) {
    instance.interceptors.request.use(
      (config) => {
        let {headers, method, url, params} = config
        if (method !== 'GET') {
          // 加载动画
        }
        // 分页参数处理
        if (httpParams.isPage) {
          requestPage(config)
        }
        // 给所有请求添加自定义header 登录获取token 未登录情况默认用基础token鉴权验证 token值不可泄露
        const userTokenKey = 'token'
        const baseTokenKey = 'base_token'
        if (!!localStorage.getItem(userTokenKey)) {
          const token = localStorage.getItem(userTokenKey)
          headers['Authorization'] = `Bearer ${token}`
        } else if (!!localStorage.getItem(baseTokenKey)) {
          const baseToken = localStorage.getItem(baseTokenKey)
          headers['Authorization'] = `Bearer ${baseToken}`
        }

        if (JSON.parse(String(httpParams.isDebug))) {
          // 打印出请求体
          console.time(httpParams.baseURL + url + this.timeLabel)
          if (!!params) {
            console.log(
              `%c ${httpParams.baseURL}${url} 接口请求参数`,
              'color:#1890FF;;font-weight:bold;'
            )
            console.log(params)
          }
        }
        return config
      },
      (err) => {
        console.error('请求超时')
        return Promise.reject(err)
      }
    )
  }

  /**
   * 响应处理拦截器
   */
  response(instance: AxiosInstance, httpParams: HttpParams) {
    instance.interceptors.response.use(
      (response) => {
        const {
          data,
          config: {url},
        } = response
        if (JSON.parse(String(httpParams.isDebug))) {
          console.log(
            `%c ${httpParams.baseURL}${url} 接口响应数据`,
            'color:#16C23A;font-weight:bold;'
          )
          // 打印出响应结果
          //console.table(responseData);
          console.log(data)
          console.timeEnd(httpParams.baseURL + url + this.timeLabel)
        }
        // 业务失败处理
        failHandle(data)

        if (httpParams.isPage) {
          return responsePage(data, url)
        }
        return data
      },
      (error) => {
        const {status} = error.response
        if (!status) {
          return Promise.reject(error)
        }
        let errorMsg = `请求发生了错误` // 默认错误消息
        switch (status) {
          case 0:
            errorMsg = '无法连接服务器'
            break
          case 1:
            errorMsg = '请求超时'
            break
          case 400:
            errorMsg = '400请求无效'
            break
          case 401:
            errorMsg = '401请求授权失败'
            // 重新登录
            toLogin()
            break
          case 403:
            errorMsg = '403请求禁止访问'
            break
          case 404:
            errorMsg = '404请求资源不存在'
            break
          case 500:
            errorMsg = '500服务器发生错误'
            break
        }
        console.error(errorMsg)
        // http错误处理
        httpErrorMsg(status, errorMsg)
        return Promise.reject(error)
      }
    )
  }
}
