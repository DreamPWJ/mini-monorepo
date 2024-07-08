var queueList = new Array()
var queueMap = new Map()
var queueId = 0


var queuing = false

/**
 * 
 * @param {*} next (next) => {}
 */
export const enqueue = (next) => {
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
    return;
  }
  queueList.shift()
  consumeQueue()

}

export const clearQueue = () => {
  queueList = new Array()
  queueMap  = new Map()
  queueId = 0
  queuing = false
}

