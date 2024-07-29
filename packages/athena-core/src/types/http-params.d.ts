/**
 * @author 潘维吉
 * @description  通用Http请求传入参数定义
 * 在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型
 */
export interface HttpParams {
  /**
   * API服务基础地址
   */
  httpURL: string;
  /**
   * 是否开启调试 打印接口入参、响应数据日志等
   */
  isDebug: boolean;
  /**
   * 是否添加请求loading加载提示
   */
  isLoading: boolean;
  /**
   * headers参数
   */
  headers: any;
}
