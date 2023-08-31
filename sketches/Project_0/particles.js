class Particle {
  /** @param {Number} x
  *   @param {Number} y
  *   @param {Vec2} vel 
  *   @param {Vec2} accel
  *   @param {String } color
  */
  constructor(x,
    y,
    color = 'rgb(255, 255, 255)',
    lifetime = 250,
    vel = new Vec2(random(-0.1, 0.1), random(-0.1, 0.1)),
    accel = new Vec2(random(-0.1, 0.1), random(-0.1, 0.1)),
  ) {

    /** @type {Vec2} */
    this.pos = new Vec2(x, y)
    /** @type {Vec2} */
    this.vel = vel
    /** @type {Vec2} */
    this.accel = accel
    /** @type {Number} */
    this.lifetime = lifetime
    /** @type {Number} */
    this.life_remaining = lifetime
    /** @type {String} */
    this.color = color
  }

  update() {
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    this.life_remaining -= 1
    this.vel.x += this.accel.x
    this.vel.y += this.accel.y

    this.color = interpolate_color(this.color, BACKGROUND, (this.lifetime - this.life_remaining)/this.lifetime)
  }

  is_alive() {
    return this.life_remaining > 0
  }
}

class ParticleSystem extends GameObject {
  /** @param {Number} x
  *   @param {Number} y
  *   @param {Number} radius
  */
  constructor(x, y, radius = 0) {
    super(x, y)
    /** @type {Particle[]} */
    this.particles = []
    /** @type {Number} */
    this.radius = radius
  }

  update() {
    this.particles.push(new Particle(this.pos.x + random(-this.radius, this.radius), this.pos.y + random(-this.radius, this.radius), ACCENT_1))
    this.particles.forEach(particle => particle.update());
    this.particles = this.particles.filter(particle => particle.is_alive())
  }

  draw() {
    this.particles.forEach(particle => {
      noStroke()
      fill(particle.color)
      ellipse(particle.pos.x, particle.pos.y, 5)
    })
  }
}
