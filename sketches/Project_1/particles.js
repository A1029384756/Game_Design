/**
 * Particle that fades out over a set lifetime
 */
class Particle extends GameObject {
  /** @param {Vec2} pos
  *   @param {String} color
  *   @param {Number} lifetime
  *   @param {Vec2} vel 
  *   @param {Vec2} accel
  */
  constructor(
    pos,
    color = 'rgb(255, 255, 255)',
    lifetime = 250,
    vel = new Vec2(random(-0.1, 0.1), random(-0.1, 0.1)),
    accel = new Vec2(random(-0.1, 0.1), random(-0.1, 0.1)),
  ) {
    super(pos)
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

  // Handles position, velocity, lifetime, and color of the particle
  update() {
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    this.vel.x += this.accel.x
    this.vel.y += this.accel.y
    this.life_remaining -= 1

    // Fades the color out to the background color over time
    this.color = interpolate_color(this.color, BACKGROUND, (this.lifetime - this.life_remaining) / this.lifetime)
  }

  // Draw each particle on the screen according to its parameters
  draw() {
    noStroke()
    fill(this.color)
    // Scale the circle based on the lifetime of the particle
    circle(this.pos.x, this.pos.y, 50 * (this.lifetime - this.life_remaining) / this.lifetime)
  }

  // Whether the particle has exceeded its given lifetime
  is_alive() {
    return this.life_remaining > 0
  }
}

/**
 * A generic particle system that spawns {Particle} objects
 * and handles culling them when they exceed their lifetimes
 */
class ParticleSystem extends GameObject {
  /** @param {Vec2} pos
  *   @param {Number} radius
  */
  constructor(pos, radius = 0) {
    super(pos)
    /** @type {Particle[]} */
    this.particles = Array(250)
    /** @type {Number} */
    this.radius = radius
  }

  update() {
    // Only create new particles when array is not full
    if (this.particles[249] == undefined) {
      this.particles.push(
        new Particle(
          new Vec2(
            this.pos.x + random(-this.radius, this.radius),
            this.pos.y + random(-this.radius, this.radius)
          ), ACCENT_1)
      )
    }

    // Update particle dynamics
    this.particles.forEach(p => {
      p.update()
      if (!p.is_alive()) {
        p.pos.x = this.pos.x + random(-this.radius, this.radius)
        p.pos.y = this.pos.y + random(-this.radius, this.radius)
        p.vel.x = random(-0.1, 0.1)
        p.vel.y = random(-0.1, 0.1)
        p.life_remaining = p.lifetime
        p.color = ACCENT_1
      }
    });
  }

  // Draw each particle
  draw() {
    this.particles.forEach(particle => particle.draw())
  }
}
