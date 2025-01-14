var queueList = new Array()
var queueMap = new Map()
var queueId = 0
var queuing = false

/**
 * @author 潘维吉
 * @date 2014-07-02 17:17
 * JS实现简单的消息队列
 */

/**
 * 添加到队列
 */
const enqueue = (next) => {
  queueId += 1
  queueList.push(queueId)
  queueMap.set(queueId, next)

  if (!queuing) {
    queuing = true
    consumeQueue()
  }
  return queueId
}

const consumeQueue = () => {
  const queueId = queueList[0]

  const queue = queueMap.get(queueId)
  queueMap.delete(queueId)

  if (queue != null) {
    // 将next 权限回调出去
    queue(next)
    return
  }
  next()
}

export const next = () => {
  if (queueList.length <= 0) {
    queuing = false
    return
  }
  queueList.shift()
  consumeQueue()
}

const clearQueue = () => {
  queueList = new Array()
  queueMap = new Map()
  queueId = 0
  queuing = false
}

export {
  enqueue,
  clearQueue
}
