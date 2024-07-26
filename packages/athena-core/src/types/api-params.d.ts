/**
 * @author 潘维吉
 * @description  通用Http API请求传入参数定义
 */
export interface ApiParams {

  /**
   * headers参数
   */
  headers: any;

  /**
   * 是否添加请求loading加载提示
   */
  isLoading: boolean;

  /**
   * 是否提示错误信息
   */
  isErrorToast: boolean;

}
