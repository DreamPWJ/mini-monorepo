/**
 * @author 潘维吉
 * @date 2019-06-27 17:44
 * 管道过滤器 数据处理统一定义类
 */

// 统一定义类型别名
type HidePartType = 'name' | 'phone' | 'address' | 'bankcard';

export class Pipe {

  /**
   * 隐藏部分信息***管道  如手机:188****2302  姓名:潘** 等
   * 用法 {Pipe.hidePart("18863302302","phone")}
   */
  static hidePart(value: string | number, type: HidePartType): string | number {
    value = value.toString();

    switch (type) {
      case 'name': // 姓名信息
        return value.replace(value.substr(1, value.length), '**');
      case 'phone':  // 手机信息
        return value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
      case 'address':  // 地址信息
        return value.replace(value.substring(value.lastIndexOf(','), value.length), '*****');
      case 'bankcard':  // 银行卡号
        return '**** **** **** ' + value.substring(value.length - 4, value.length);
      default:
        return value;
    }
  }

}
