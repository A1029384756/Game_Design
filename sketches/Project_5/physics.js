const GRAVITY = -0.1
const BUILDING_X_VEL = -2

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
      let grav_dir = copy_vector(gravity.dir)

      // Update position and velocity
      // using basic newtonian physics
      transform.vel.add(grav_dir.mult(gravity.mag))
      transform.pos.add(transform.vel)
    })
  }
}
