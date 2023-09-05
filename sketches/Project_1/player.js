class Player extends GameObject {
  /** @param {Vec2} pos 
    * @param {Number} speed
    */
  constructor(pos, speed = 5) {
    super(pos)
    this.speed = speed
    this.shot_delay_ms = 500
    this.shot_timer = this.shot_delay_ms
    this.collider = new Collider(pos, 30)
  }

  update() {
    super.update()
    this.collider.pos = this.pos

    if (keyIsDown(65) && this.pos.x > 15) {
      this.pos.x -= this.speed
    }

    if (keyIsDown(68) && this.pos.x < PANE_WIDTH - 15) {
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
        new Bullet(
          new Vec2(this.pos.x, this.pos.y - 21),
          new Vec2(0, -1)
        )
      )
    }
  }
}
