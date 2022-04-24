/**
 * @author 潘维吉
 * @description  通用Http请求传入参数定义
 * 在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型
 */
export interface HttpParams {
  /**
   * API服务基础地址
   */
  baseURL: string;
  /**
   * 是否开启调试 是打印日志等
   */
  isDebug: boolean;
  /**
   * headers参数
   */
  headers: any;
}
