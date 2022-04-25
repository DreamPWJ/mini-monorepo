import Taro from '@tarojs/taro'

/**
 * @author 潘维吉
 * @description http核心工具类
 * 用于扩展各种需求 根据动态参数 插拔式扩展
 */

/**
 *  Http错误处理
 */
export function httpErrorMsg(status: number, msg: string) {
  try {
    if (status != 401 && msg) {
      // Message全局提示
      Taro.showToast({
        title: msg,
        icon: 'error',
        duration: 2000
      })
    }
  } catch (e) {
    console.error('错误处理: Message全局提示失败')
  }
}

/**
 * 业务失败处理
 * @param data
 */
export function failHandle(data: any) {
  try {
    // Http状态码是200 非成功处理响应 消息提示
    if (data.code != 200 && data.msg) {
      // Message全局提示
      Taro.showToast({
        title: data.msg,
        icon: 'error',
        duration: 2000
      })
    }
  } catch (e) {
    console.error('失败处理: Message全局提示失败')
  }
}

/**
 *  去登录
 */
export function toLogin() {
  // Taro.clearStorage()
  Taro.removeStorageSync('token')
  Taro.reLaunch({
    url: "/pages/login/login"
  });
  // window.location.reload()  // 可能导致无限循环
}

