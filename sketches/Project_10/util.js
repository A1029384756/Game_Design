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
 * @template T
 * @param {T} obj
 * @returns {T}
 */
function clone_object(obj) {
  return Object.assign(Object.create(Object.getPrototypeOf(obj)), obj)
}

/**
  * @param {Vector} p1
  * @param {Collider} c1
  * @param {Vector} p2
  * @param {Collider} c2
  * @returns {Boolean}
  */
const collides = (p1, c1, p2, c2) => {
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
