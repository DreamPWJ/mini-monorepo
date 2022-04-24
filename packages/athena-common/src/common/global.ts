/** 分页类型参数 */

// PagingType = 'refresh' | 'loadMore';

/**
 * APP全局常量和方法
 * 业务逻辑相关的 （可含公共的http请求）
 */

export class Global {

  static CONSTANTS = {
    projectName: '', // 项目名称
    version: '1.0.0', // 当前版本号
    timing: 10000, // 计时间隔
  }

  /**
   * 是否登录
   */
  static isLogin(): boolean {
    if (!!localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

}
