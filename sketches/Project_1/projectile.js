class Projectile extends GameObject {
  /** @param {Vec2} pos
   *  @param {Vec2} dir 
   *  @param {Number} speed
   *  @param {Vec2} accel
   */
  constructor(pos, dir, speed = 10, accel = new Vec2()) {
    super(pos)
    this.dir = dir
    this.speed = speed
    this.accel = accel
    this.lifetime = PANE_HEIGHT / speed + 20
    this.collider = new Collider(pos, 10)
  }

  update() {
    super.update()
    this.collider.pos = this.pos
    this.pos.x += this.speed * this.dir.x
    this.pos.y += this.speed * this.dir.y
    this.vel.x += this.accel.x
    this.vel.y += this.accel.y
    this.lifetime--
  }

  draw() {
    super.draw()
    fill('blue')
    circle(this.pos.x, this.pos.y, 10)
  }
}

class Bullet extends Projectile {
  /** @param {Vec2} pos
   *  @param {Vec2} dir 
   *  @param {Number} speed
   *  @param {Vec2} accel
   */
  constructor(pos, dir, speed = 10, accel = new Vec2()) {
    super(pos, dir, speed, accel)
  }
}

class Bomb extends Projectile {
  /** @param {Vec2} pos
   *  @param {Vec2} dir 
   *  @param {Number} speed
   *  @param {Vec2} accel
   */
  constructor(pos, dir, speed = 10, accel = new Vec2()) {
    super(pos, dir, speed, accel)
  }
}
