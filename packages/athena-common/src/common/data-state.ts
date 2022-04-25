import Taro from "@tarojs/taro";

/**
 * @author 潘维吉
 * @date 2019-07-16 8:20
 * 数据状态共享管理  自定义服务实现简单的redux
 * 使用get set实现
 */
export class DataState {

  static _count: number = 0; //计数

  static get count(): number {
    return this._count;
  }

  static set count(value: number) {
    this._count = value;
  }

  /**
   *  全局常用属性 定义 get set方法 方便获取和设置
   */
  static get userId(): string {
    return Taro.getStorageSync('userId');
  }

  static get userInfo() {
    return Taro.getStorageSync('userInfo');
  }

}
