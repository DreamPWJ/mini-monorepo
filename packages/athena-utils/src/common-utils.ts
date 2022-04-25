/**
 * @author 潘维吉
 * @date 2020/3/12 16:07
 * 通用工具类
 */
export class CommonUtils {

  /**
   *  数组去重(只支持js原始类型，数组对象类型不可用)
   */
  static uniqueArray(arr: any[]) {
    return [...new Set(arr)]
  };

  /**
   * 根据key正则表达式对比获取url中的参数值
   */
  static queryUrlParam(key: string, paramsStr?: string) {
    const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)');
    const params = !!paramsStr ? paramsStr.match(reg) : window.location.search.substr(1).match(reg);
    if (params != null) {
      return params[2];
    }
    return '';
  }

  /**
   * json对象布尔类型true false转换成1 0数字类型
   */
  static booleanToNumber(json: any) {
    for (const key of Object.keys(json)) {
      const value = json[key];
      if (value === true) {
        json[key] = 1;
      } else if (value === false) {
        json[key] = 0;
      }
    }
    return json;
  }

  /**
   * 数组并集
   */
  static unionArray(a: any[], b: any[]) {
    return new Set([...a, ...b]);
  }

  /**
   * 数组交集
   */
  static intersectArray(a: any[], b: any) {
    return new Set([...a].filter(x => b.has(x)));
  }

  /**
   * 数组差集
   */
  static differenceArray(a: any[], b: any) {
    return new Set([...a].filter(x => !b.has(x)));
  }

  /**
   * 驼峰转换下划线
   */
  static humpToLine(name: string) {
    if (name) {
      return name.replace(/([A-Z])/g, '_$1').toLowerCase();
    }
    return '';
  }

  /**
   * 产生任意长度随机字母数字组合
   *  min任意长度最小位[固定位数] max任意长度最大位 randomFlag-是否任意长度
   */
  static randomString(min: number, max: number, randomFlag = false) {
    let str = "",
      range = min,
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生
    if (randomFlag) {
      range = Math.round(Math.random() * (max - min)) + min;
    }
    for (let i = 0; i < range; i++) {
      let pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
    }
    return str;
  }

  /**
   *  js判断是否是移动设备
   */
  static isMobile(): boolean {
    let sUserAgent = navigator.userAgent;
    if (sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('iPhone') > -1 || sUserAgent.indexOf('iPad') > -1
      || sUserAgent.indexOf('iPod') > -1 || sUserAgent.indexOf('Symbian') > -1 || sUserAgent.indexOf('Windows Phone') > -1) {
      return true
    } else {
      return false
    }
  }

  /**
   *  暂停程序 毫秒数的函数
   */
  static pauseTime(millTime) {
    let start = Date.now();
    while (true) {
      let nowTime = Date.now();
      let offset = nowTime - start;
      if (offset >= millTime)
        break;
    }
  }

}
