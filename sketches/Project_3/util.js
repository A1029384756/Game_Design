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
  const p1_copy = copy_vector(p1)
  const p2_copy = copy_vector(p2)
  const d = p1_copy.sub(p2_copy)
  const rad = c1.radius + c2.radius
  return ((d.x * d.x) + (d.y * d.y)) <= (rad * rad)
}
