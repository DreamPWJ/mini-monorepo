/**
 * 管理异步消息任务队列
 */
export class TaskQueue {

  private static queueList: number[] = [] // 保存任务 ID 的数组
  private static queueMap: Map<number, () => void> = new Map() // 保存任务的映射表
  private static queueId: number = 0 // 当前任务 ID
  private static queuing: boolean = false // 标记是否正在处理队列

  /**
   * 向队列中添加一个新的任务
   * @param next 任务执行的回调函数
   * @returns 返回任务的 ID
   */
  static enqueue(next: () => void): number {
    this.queueId += 1
    this.queueList.push(this.queueId)
    this.queueMap.set(this.queueId, next)

    if (!this.queuing) {
      this.queuing = true
      this.consumeQueue()
    }
    return this.queueId
  }

  /**
   * 消耗队列中的第一个任务
   */
  private static consumeQueue(): void {
    const queueId = this.queueList[0]
    // @ts-ignore
    const queue = this.queueMap.get(queueId)
    // @ts-ignore
    this.queueMap.delete(queueId)
    if (queue != null) {
      queue()
    } else {
      this.next()
    }
  }

  /**
   * 处理队列中的下一个任务
   */
  private static next(): void {
    if (this.queueList.length <= 0) {
      this.queuing = false
      return
    }
    this.queueList.shift()
    this.consumeQueue()
  }

  /**
   * 清除所有任务
   */
  static clearQueue(): void {
    this.queueList = []
    this.queueMap.clear()
    this.queueId = 0
    this.queuing = false
  }
}
