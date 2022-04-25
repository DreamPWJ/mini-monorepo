/**
 * @author 潘维吉
 * http请求API接口服务
 * 组件不应该直接获取或保存数据，它们应该聚焦于展示数据，而把数据访问的职责委托给某个服务
 * 服务使组件更容易使用模拟服务进行单元测试
 * 将来任何时候你都可以改变目前服务的实现方式，而不用改动任何组件。 这些组件不需要了解该服务的内部实现
 * 服务可创建的单一、共享的实例，并且把它注入到任何请求注入它的类中
 * 服务使代码更加模块化、可复用，而且高效
 */
import type {HttpParams} from 'athena-core'
import {Http} from 'athena-core'

/**
 * 通用Http请求传入参数定义
 */
const httpParams: HttpParams = {
  baseURL: `${process.env.BASE_URL}`,
  isDebug: `${process.env.IS_DEBUG}`,
}

/**
 * 初始化Http请求服务
 */
const http = new Http().init(httpParams)

export default http
