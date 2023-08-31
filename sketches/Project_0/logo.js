class GameObject {
  /** @param {Number} x
   *  @param {Number} y 
  */
  constructor(x, y) {
    /** @type {Vec2} */
    this.pos = new Vec2(x, y)
    /** @type {Vec2} */
    this.vel = new Vec2(0, 0)
    /** @type {GameObject[] } */
    this.children = []
  }

  draw() {
    this.children.forEach(child => child.draw())
  }

  update() {
    this.children.forEach(child => {
      child.update()
      child.pos = this.pos
      child.vel = this.vel
    })
  }
}

class Logo extends GameObject {
  /** @param {Number} x
   *  @param {Number} y 
  */
  constructor(x, y) {
    super(x, y)
    this.vel = new Vec2(random(-1, 1) * 10, random(-0.5, 0.5) * 10)
    this.children.push(new ParticleSystem(PANE_WIDTH / 2, PANE_HEIGHT / 2, 50))
  }

  draw() {
    super.draw()
    noStroke()

    fill(ACCENT_1)
    circle(this.pos.x, this.pos.y, 120)

    // Draw 'H'
    fill(ACCENT_2)
    rect(this.pos.x - 45, this.pos.y - 25, 10, 50, 3)
    rect(this.pos.x - 15, this.pos.y - 25, 10, 50, 3)
    rect(this.pos.x - 45, this.pos.y - 5, 40, 10, 3)

    // Draw 'G'
    arc(this.pos.x + 25, this.pos.y, 50, 50, 0.6, -0.6)
    fill(ACCENT_1)
    circle(this.pos.x + 25, this.pos.y, 30)
    fill(ACCENT_2)
    rect(this.pos.x + 35, this.pos.y, 10, 25, 3)
    rect(this.pos.x + 30, this.pos.y, 15, 10, 3)
  }

  update() {
    super.update()
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y

    if ((this.pos.x < 60) || (this.pos.x > PANE_WIDTH - 60)) {
      this.vel.x = -this.vel.x
    }

    if ((this.pos.y < 60) || (this.pos.y > PANE_HEIGHT - 60)) {
      this.vel.y = -this.vel.y
    }
  }
}

