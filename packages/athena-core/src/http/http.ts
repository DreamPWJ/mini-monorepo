import Taro from '@tarojs/taro'
import type { HttpParams } from '../types/http-params'
import { failHandle, httpErrorMsg, toLogin } from '../utils/http-util'
import { Constant } from 'athena-constants'

/**
 * @author 潘维吉
 * @description 核心通用http请求配置和拦截器
 * token授权、调试日志、输入输出数据处理、错误异常处理等
 * 基于Taro做跨端网络请求实现: https://taro-docs.jd.com/docs/apis/network/request/
 * 跨端请求库: https://docs.taro.zone/docs/request
 */
export class Http {

  // API服务基础地址
  httpURL = ''
  // 是否开启调试 是打印日志等
  isDebug = true
  // 是否添加请求loading加载提示
  isLoading = true
  // headers参数
  headers = {}
  // API性能调式日志标签
  timeLabel = '接口响应总耗时统计'

  /**
   * 初始化 请求和响应拦截器
   */
  init(httpParams: HttpParams) {
    // 统一基建代码根据Taro.getEnv()环境判断 适配不同端不同的代码
    console.log(Taro.getEnv() + '环境Http全局初始化: httpURL=' + httpParams.httpURL)
    // 初始化全局动态参数
    this.httpURL = httpParams.httpURL
    this.isDebug = httpParams.isDebug
    this.isLoading = httpParams.isLoading === undefined ? true : httpParams.isLoading
    this.headers = httpParams.headers
    // 添加HTTP请求拦截器
    Taro.addInterceptor(this.interceptor)
    return this
  }

  /**
   * 基础请求
   */
  baseRequest(params, method = 'GET') {
    let { path, data, headers, isLoading } = params
    // 给所有请求添加自定义header 登录获取token 未登录情况默认用基础token鉴权验证 token值不可泄露
    const userTokenKey = Constant.TOKEN_KEY
    const baseTokenKey = Constant.BASE_TOKEN_KEY
    let token
    if (!!Taro.getStorageSync(userTokenKey)) {
      token = Taro.getStorageSync(userTokenKey)
    } else if (!!Taro.getStorageSync(baseTokenKey)) {
      token = Taro.getStorageSync(baseTokenKey)
    }
    let httpURL = this.httpURL  // 防止变量全局污染
    // 适配同一个前端访问多个服务器地址情况 如果path配置服务地址 使用单独配置的地址
    if (path.indexOf('http://') > -1 || path.indexOf('https://') > -1) {
      httpURL = ''
    }
    // 基础配置
    const option: any = {
      method: method, // 请求方式
      url: httpURL + path,  // 配置请求基础地址
      data: data,   // 传参数据
      timeout: 60000, // 配置请求超时时间
      header: {  // 定义公共headers请求头
        ...this.headers, // 全局header
        'content-type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${token}` || '', // token授权
        ...headers // 具体请求header
      },
      isLoading: isLoading === undefined || isLoading === null ? this.isLoading : isLoading
    }
    return Taro.request(option)
  }

  /**
   * 处理拦截器
   * http响应数据规范 { code: 200, data: {}, msg: 'success' }
   */
  interceptor = (chain) => {
    const requestParams = chain.requestParams
    const { data, url, isLoading } = requestParams

    // 请求处理拦截器
    if (isLoading) {
      // 加载动画
      Taro.showToast({
        title: '',
        icon: 'loading',
        duration: 5000
      })
    }
    if (JSON.parse(String(this.isDebug))) {
      // 打印出请求体
      console.time(url + this.timeLabel)
      if (!!data) {
        console.log(
          `%c ${url} 接口请求参数`,
          'color:#1890FF;;font-weight:bold;'
        )
        console.log(data)
      }
    }

    // 响应处理拦截器
    return chain.proceed(requestParams)
      .then(res => {
        if (isLoading) {
          Taro.hideToast()
        }
        if (JSON.parse(String(this.isDebug))) {
          console.log(
            `%c ${url} 接口响应数据`,
            'color:#16C23A;font-weight:bold;'
          )
          // 打印出响应结果
          //console.table(res);
          console.log(res.data)
          console.timeEnd(url + this.timeLabel)
        }

        // 业务失败处理
        failHandle(res.data)

        // http响应状态码
        const status = res.statusCode

        if (status != 200) {
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
        }

        return res
      })
  }

  /**
   * GET网络请求
   */
  get(path, data: any = null, headers = {}, isLoading: boolean = false) {
    let option = { path, data, headers, isLoading }
    return this.baseRequest(option, 'GET')
  }

  /**
   * POST网络请求
   */
  post(path, data: any = null, headers = {}, isLoading = null) {
    let option = { path, data, headers, isLoading }
    return this.baseRequest(option, 'POST')
  }

  /**
   * PUT网络请求
   */
  put(path, data: any = null, headers = {}, isLoading = null) {
    let option = { path, data, headers, isLoading }
    return this.baseRequest(option, 'PUT')
  }

  /**
   * DELETE网络请求
   */
  delete(path, data: any = null, headers = {}, isLoading = null) {
    let option = { path, data, headers, isLoading }
    return this.baseRequest(option, 'DELETE')
  }

}
