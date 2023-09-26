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
 * @returns {Vector}
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

/**
  * @param {Collider} c1
  * @param {Vector} p1
  * @param {Collider} c2
  * @param {Vector} p2
  * @returns {Boolean}
  */
const collides = (c1, p1, c2, p2) => {
  const r1x_min = p1.x - c1.w / 2
  const r1x_max = p1.x + c1.w / 2
  const r1y_min = p1.y - c1.h / 2
  const r1y_max = p1.y + c1.h / 2
  const r2x_min = p2.x - c2.w / 2
  const r2x_max = p2.x + c2.w / 2
  const r2y_min = p2.y - c2.h / 2
  const r2y_max = p2.y + c2.h / 2

  return (
    r1x_max >= r2x_min &&
    r1x_min <= r2x_max &&
    r1y_max >= r2y_min &&
    r1y_min <= r2y_max
  )
}
