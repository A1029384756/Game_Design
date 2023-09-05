class Player extends GameObject {
  /** @param {Vec2} pos 
    * @param {Number} speed
    */
  constructor(pos, speed = 5) {
    super(pos)
    this.speed = speed
    this.shot_delay_ms = 500
    this.shot_timer = this.shot_delay_ms
  }

  update() {
    super.update()
    if (keyIsDown(65)) {
      this.pos.x -= this.speed
    }

    if (keyIsDown(68)) {
      this.pos.x += this.speed
    }

    if (keyIsDown(32)) {
      this.shoot()
    }
    this.shot_timer += deltaTime
  }

  draw() {
    super.draw()
    fill('white')
    circle(this.pos.x, this.pos.y, 30)
  }

  shoot() {
    if (this.shot_timer >= this.shot_delay_ms) {
      this.shot_timer = 0
      game.objects.push(
        new Projectile(
          new Vec2(this.pos.x, this.pos.y - 20),
          new Vec2(0, -1)
        )
      )
    }
  }
}

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
  }

  update() {
    super.update()
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
