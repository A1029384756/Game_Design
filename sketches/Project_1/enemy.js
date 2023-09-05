class Enemy extends GameObject {
  /** @param {Vec2} pos */
  constructor(pos) {
    super(pos)
    this.vel = new Vec2(random(-0.5, 0.5) * 3, random(-0.5, 0.5) * 3)
    this.collider = new Collider(pos, 30)
  }

  update() {
    super.update()

    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    this.collider.pos = this.pos

    // Screen border collission
    if ((this.pos.x < 15) || (this.pos.x > PANE_WIDTH - 15)) {
      this.vel.x = -this.vel.x
    }

    if ((this.pos.y < 15) || (this.pos.y > PANE_HEIGHT - 15)) {
      this.vel.y = -this.vel.y
    }

    if (random() > 0.99 && this.pos.y < PANE_HEIGHT / 2) {
      game.objects.push(
        new Bomb(
          new Vec2(this.pos.x, this.pos.y + 21),
          new Vec2(0, 1),
          2
        )
      )
    }
  }

  draw() {
    fill('red')
    circle(this.pos.x, this.pos.y, 30)
  }
}


