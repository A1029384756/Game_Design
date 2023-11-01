class QueueItem {
  /**
  * @param {Vector} pos
  * @param {Number} cost
  * @param {Vector[]} path 
  */
  constructor(pos, cost, path) {
    this.pos = pos
    this.cost = cost
    this.path = path
  }
}

class PriorityQueue {
  constructor() {
    this.items = /** @type {[Number, QueueItem][]} */ ([])
  }

  /** 
   * @param {QueueItem} item 
   * @param {Number} priority
   */
  push(item, priority) {
    this.items.push([priority, item])
    this.items.sort((a, b) => a[0] - b[0])
  }

  /** @returns {QueueItem} */
  pop() {
    return this.items.shift()[1]
  }
}
