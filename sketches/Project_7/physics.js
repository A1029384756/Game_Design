class EntityMovement extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Player(),
        new Transform(),
      ]),
      new Query([
        new Enemy(),
        new Transform(),
      ]),
      new Query([
        new Wall(),
        new Collider(),
      ]),
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let players = r[0]
    let enemies = r[1]
    let walls = r[2]

    /** 
     * @param {Vector} pos 
     * @param {Collider} c
     */
    const collide_at = (pos, c) => {
      let collide = false

      for (let [_, g_c] of walls.entries()) {
        let wall_transform = system_get_transform(g_c)
        let wall_collider = system_get_collider(g_c)
        if (collides(
          pos,
          c,
          wall_transform.pos,
          wall_collider,
        )) {
          collide = true
          break
        }
      }
      return collide
    }

    /**
     * @param {Transform} transform
     * @param {Collider} collider
     */
    const handle_movement = (transform, collider) => {
      if (transform.vel.x != 0) {
        if (!collide_at(createVector(transform.pos.x + transform.vel.x, transform.pos.y), collider)) {
          transform.pos.x += transform.vel.x
        } else {
          transform.vel.x = 0
        }
      }

      if (transform.vel.y != 0) {
        if (!collide_at(createVector(transform.pos.x, transform.pos.y + transform.vel.y), collider)) {
          transform.pos.y += transform.vel.y
        } else {
          transform.vel.y = 0
        }
      }

      if (transform.pos.x < -14) {
        transform.pos.x = 386
      }
      if (transform.pos.x > 386) {
        transform.pos.x = -14
      }
      if (transform.pos.y < -14) {
        transform.pos.y = 386
      }
      if (transform.pos.y > 386) {
        transform.pos.y = -14
      }
    }

    players.forEach(c => {
      let transform = system_get_transform(c)
      let collider = system_get_collider(c)
      handle_movement(transform, collider)

      if (transform.vel.magSq() > 0.1) {
        transform.dir = transform.vel.heading()
      }
    })

    enemies.forEach(c => {
      let enemy = system_get_enemy(c)
      let transform = system_get_transform(c)
      let collider = system_get_collider(c)

      if (enemy.path.length > 0) {
        let pos = /** @type {Vector} */ (createVector(transform.pos.x, transform.pos.y))

        let path_pos = /** @type {Vector} */ (clone_object(enemy.path[0]))

        if (path_pos.dist(pos) <= 1) {
          enemy.path.shift()
        }
        let delta = path_pos.sub(pos)
        transform.vel.x = delta.x > 0 ? 1 : -1
        transform.vel.y = delta.y > 0 ? 1 : -1
      }

      if (enemy.afraid) {
        transform.vel.mult(-1).setMag(0.3)

        let target_pos = clone_object(transform.pos).add(transform.vel)
        if (collide_at(target_pos, collider)) {
          transform.vel.setHeading(transform.vel.heading() + HALF_PI)
          target_pos = clone_object(transform.pos).add(transform.vel)
          if (collide_at(target_pos, collider)) {
            transform.vel.setHeading(transform.vel.heading() + PI)
          }
        }
      }

      handle_movement(transform, collider)
    })
  }
}
