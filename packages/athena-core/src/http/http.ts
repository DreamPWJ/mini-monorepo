import Taro from '@tarojs/taro'
import type {HttpParams} from '../types/http-params'

/**
 * @author 潘维吉
 * @description 核心通用http请求配置和拦截器
 * token授权、调试日志、输入输出数据处理、错误异常处理等
 * 基于Taro做跨端网络请求实现: https://taro-docs.jd.com/taro/docs/apis/network/request/
 */
export class Http {
  // 调式日志标签
  timeLabel = '接口响应总耗时统计'
  // 基础URL
  baseURL = ''

  /**
   * 初始化 请求和响应拦截器
   */
  init(httpParams: HttpParams) {
    console.log("Http初始化: " + httpParams.baseURL)
    this.baseURL = httpParams.baseURL
    Taro.addInterceptor(this.interceptor)
    return this;
  }

  /**
   * 基础请求
   */
  baseRequest(params, method = "GET") {
    let {path, data, headers} = params;
    // 基础配置
    const option: any = {
      method: method, // 请求方式
      url: this.baseURL + path,  // 配置请求基础地址
      data: data,   // 传参数据
      timeout: 60000, // 配置请求超时时间
      header: {  // 定义公共headers请求头
        'content-type': "application/json;charset=UTF-8",
        'Authorization': Taro.getStorageSync('token') || "",
        ...headers
      }
    };
    return Taro.request(option)
  }

  /**
   * GET网络请求
   */
  get(path, data = "", headers = {}) {
    let option = {path, data, headers};
    return this.baseRequest(option, "GET");
  }

  /**
   * POST网络请求
   */
  post(path, data = "", headers = {}) {
    let option = {path, data, headers};
    return this.baseRequest(option, "POST");
  }

  /**
   * PUT网络请求
   */
  put(path, data = "", headers = {}) {
    let option = {path, data, headers};
    return this.baseRequest(option, "PUT");
  }

  /**
   * DELETE网络请求
   */
  delete(path, data = "", headers = {}) {
    let option = {path, data, headers};
    return this.baseRequest(option, "DELETE");
  }


  /**
   * 处理拦截器
   */
  interceptor(chain) {
    const requestParams = chain.requestParams
    const {method, data, url} = requestParams

    console.log(`Http接口请求参数 ${method || 'GET'} --> ${url} data: `, data)

    return chain.proceed(requestParams)
      .then(res => {
        console.log(`Http接口响应数据 <-- ${url} result:`, res.data)
        return res
      })
  }

  /**
   * 请求处理拦截器
   */
  /*  request(httpParams: HttpParams) {
      instance.interceptors.request.use(
        (config) => {
          let {headers, method, url, params} = config
          if (method !== 'GET') {
            // 加载动画
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
    }*/

  /**
   * 响应处理拦截器
   */
  /*  response(httpParams: HttpParams) {
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
    }*/

}
