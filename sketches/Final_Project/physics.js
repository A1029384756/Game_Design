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
      transform.pos.x = round(transform.pos.x)
      transform.pos.y = round(transform.pos.y)
      transform.pos.z = round(transform.pos.z)
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

      transform.vel.add(grav_dir.mult(gravity.mag))
    })
  }
}
