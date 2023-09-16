class Collider {
  /** 
   * @param {Vector} pos 
   * @param {Number} d
   */
  constructor(pos, d) {
    this.pos = pos
    this.r = d / 2
  }

  /** @param {Collider} rhs */
  collides(rhs) {
    // Deep copy to prevent "this.pos" changing
    const this_pos = createVector(this.pos.x, this.pos.y)
    const rhs_pos = createVector(rhs.pos.x, rhs.pos.y)
    const d = this_pos.sub(rhs_pos)
    const rad = this.r + rhs.r
    return ((d.x * d.x) + (d.y * d.y)) <= (rad * rad)
  }
}
