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
      // message.error(msg)
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
      // message.error(data.msg)
    }
  } catch (e) {
    console.error('失败处理: Message全局提示失败')
  }
}

/**
 *  去登录
 */
export function toLogin() {
  localStorage.removeItem('token')
  // window.location.reload()  // 可能导致无限循环
}

/**
 *  驼峰转换下划线
 */
function humpToLine(name: string) {
  if (name) {
    return name.replace(/([A-Z])/g, '_$1').toLowerCase()
  }
  return ''
}

function setOrder(order: string) {
  if (order === 'descend') {
    return 'desc'
  }
  if (order === 'ascend') {
    return 'asc'
  }
  return order
}

export function requestPage(config: any) {
  let {url, data} = config
  if (!url.endsWith('/page')) {
    return
  }
  // 处理请求参数
  const {current, pageSize, sorter} = data
  config.data.page = current // 当前页
  config.data.size = pageSize // 当前页数
  // 排序参数
  if (sorter) {
    const splitIndex = sorter.lastIndexOf('_')
    config.data.sort = humpToLine(sorter.substr(0, splitIndex))
    config.data.order = setOrder(sorter.substr(splitIndex + 1))
  }
}

export function responsePage(data: any, url: any) {
  if (!url.endsWith('/page')) {
    return data
  }
  const {page, size, total, hasNextPage, list} = data.data
  // 分页参数
  const result = {
    current: page,
    pageSize: size,
    code: data.code,
    success: data.code === 200,
    data: list,
    total,
    hasNextPage,
    msg: data.msg,
  }
  return {
    ...data,
    ...result,
  }
}
