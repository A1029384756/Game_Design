class Collider extends GameObject {
  /** @param {Vec2} pos
   *  @param {Number} diameter 
   */
  constructor(pos, diameter) {
    super(pos)
    this.radius = diameter / 2
  }

  /** @param {Collider} rhs */
  collides(rhs) {
    let dx = this.pos.x - rhs.pos.x
    let dy = this.pos.y - rhs.pos.y
    let rad = this.radius + rhs.radius
    return ((dx * dx) + (dy * dy)) <= (rad * rad)
  }
}

