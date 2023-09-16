class IdGenerator {
  constructor() {
    /** @type {Number} */
    this.num = 0
  }

  /**
   * @returns {String}
  */
  create_id() {
    this.num++
    if (this.num === Number.MAX_SAFE_INTEGER) {
      this.num = 0
    }

    return Date.now().toString() + this.num
  }
}

/**
 * @param {Vector} [v=createVector()] 
 */
function copy_vector(v = createVector()) {
  return createVector(v.x, v.y, v.z)
}

class Timer {
  /** 
   * @param {Number} time_ms
   * @param {Function} complete_action
   */
  constructor(time_ms, complete_action = null) {
    this.time_ms = time_ms
    this.time_remaining = time_ms
    this.complete = false
    this.complete_action = complete_action
  }

  update() {
    this.time_remaining -= deltaTime

    if (this.time_remaining <= 0) {
      this.complete = true

      if (this.complete_action != null) {
        this.complete_action()
      }
    }
  }

  reset() {
    this.time_remaining = this.time_ms
    this.complete = false
  }
}
