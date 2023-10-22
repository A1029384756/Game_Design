const GRAVITY = -0.075

class VelocityMovement extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Transform(),
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let transforms = r[0]
    transforms.forEach((t_c, _) => {
      let transform = system_get_transform(t_c)
      transform.pos.add(transform.vel)
    })
  }
}

class Gravity extends Component {
  /**
  * @param {Number} mag
  * @param {Vector} dir
    */
  constructor(dir = createVector(0, -1), mag = GRAVITY) {
    super()
    this.mag = mag
    this.dir = dir
  }
}

class ApplyGravity extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Gravity(),
        new Transform()
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
    */
  work(r) {
    let grav_query = r[0]
    grav_query.forEach((c, _) => {
      let gravity = system_get_gravity(c)
      let transform = system_get_transform(c)
      let grav_dir = clone_object(gravity.dir)

      // Update position and velocity
      // using basic newtonian physics
      transform.vel.add(grav_dir.mult(gravity.mag))
      transform.pos.add(transform.vel)
    })
  }
}

/**
 * @param {Transform} e_t
 * @param {Collider} e_c
 * @param {Transform} c_t
 * @param {Collider} c_c
 */
const resolve_collision = (e_t, e_c, c_t, c_c) => {
  const STICKY_THRESHOLD = 0.0004
  let dx = (c_t.pos.x - e_t.pos.x) / (c_c.w / 2)
  let dy = (c_t.pos.y - e_t.pos.y) / (c_c.h / 2)
  let abs_dx = abs(dx)
  let abs_dy = abs(dy)

  if (abs(abs_dx - abs_dy) < 0.1) {
    if (dx < 0) {
      e_t.pos.x = c_t.pos.x + c_c.w / 2 + e_c.w / 2 + PLAYER_COLLISION_PADDING
    } else {
      e_t.pos.x = c_t.pos.x - c_c.w / 2 - e_c.w / 2 - PLAYER_COLLISION_PADDING
    }

    if (dy < 0) {
      e_t.pos.y = c_t.pos.y + c_c.h / 2 + e_c.h / 2
    } else {
      e_t.pos.y = c_t.pos.y - c_c.h / 2 - e_c.h / 2
    }
    if (random() < 0.5) {
      e_t.vel.x = -e_t.vel.x * 0.1;

      if (abs(e_t.vel.x) < STICKY_THRESHOLD) {
        e_t.vel.x = 0;
      }
    } else {
      e_t.vel.y = -e_t.vel.y * 0.1;
      if (abs(e_t.vel.y) < STICKY_THRESHOLD) {
        e_t.vel.y = 0;
      }
    }
  } else if (abs_dx > abs_dy) {
    if (dx < 0) {
      e_t.pos.x = c_t.pos.x + c_c.w / 2 + e_c.w / 2 + PLAYER_COLLISION_PADDING
    } else {
      e_t.pos.x = c_t.pos.x - c_c.w / 2 - e_c.w / 2 - PLAYER_COLLISION_PADDING
    }

    e_t.vel.x = -e_t.vel.x * 0.1;

    if (abs(e_t.vel.x) < STICKY_THRESHOLD) {
      e_t.vel.x = 0;
    }
  } else {
    if (dy < 0) {
      e_t.pos.y = c_t.pos.y + c_c.h / 2 + e_c.h / 2
    } else {
      e_t.pos.y = c_t.pos.y - c_c.h / 2 - e_c.h / 2
    }

    e_t.vel.y = -e_t.vel.y * 0.1
    if (abs(e_t.vel.y) < STICKY_THRESHOLD) {
      e_t.vel.y = 0
    }
  }
}
