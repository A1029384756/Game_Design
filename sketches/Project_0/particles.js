/**
 * Particle that fades out over a set lifetime
 */
class Particle extends GameObject {
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
    super(x, y)
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
    this.life_remaining -= 1
    this.vel.x += this.accel.x
    this.vel.y += this.accel.y

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
    // Create a new particle at a random point within the radius
    this.particles.push(
      new Particle(
        this.pos.x + random(-this.radius, this.radius),
        this.pos.y + random(-this.radius, this.radius), ACCENT_1
      )
    )

    // Update particle dynamics
    this.particles.forEach(particle => particle.update());
    // Cull expired particles
    this.particles = this.particles.filter(particle => particle.is_alive())
  }

  // Draw each particle
  draw() {
    this.particles.forEach(particle => particle.draw())
  }
}
