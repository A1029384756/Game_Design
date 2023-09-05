/**
 * Generic parent class for all major objects in the game
 * Holds a list of children that are attached to the main object
 */
class GameObject {
  /** @param {Vec2} pos */
  constructor(pos) {
    /** @type {Vec2} */
    this.pos = pos
    /** @type {Vec2} */
    this.vel = new Vec2()
    /** @type {GameObject[] } */
    this.children = []
  }

  // Iterate over children and draw every child
  draw() {
    this.children.forEach(child => child.draw())
  }

  // Iterate over children and set position and velocity
  update() {
    this.children.forEach(child => {
      // Set base child transform
      child.pos = this.pos
      child.update()
    })
  }
}

/*
 * Logo class that handles the position and drawing of the logo
 * Has a particle system as a child
 */
class Logo extends GameObject {
  /** @param {Vec2} pos */
  constructor(pos) {
    super(pos)
    // Set a random velocity
    // Create a new particle system attached to the logo
    this.children.push(new ParticleSystem(new Vec2(PANE_WIDTH / 2, PANE_HEIGHT / 2), 50))
  }

  // Handle the drawing of the logo and all children
  draw() {
    super.draw()
    noStroke()

    // Logo Background
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

  // Handle game logic for logo and all children
  update() {
    super.update()
  }
}

