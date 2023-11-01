class Explosion extends Component { }

class ExplosionManagement extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Explosion(),
        new Transform(),
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let explosions = r[0]

    explosions.forEach((e_c, _) => {
      let transform = system_get_transform(e_c)

      for (let i = 0; i < 3; i++) {
        game_controller.spawn_entity([
          new Particle(),
          new Lifetime(20),
          new Transform(
            clone_object(transform.pos),
            createVector(random(-1, 1), random(-1, 1)).setMag(3, 5)
          ),
          new Sprite([particle_sprite], [255, random(90, 150), 0, 255]),
        ])
      }
    })
  }
}

class ExplosionMovement extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Particle(),
        new Transform(),
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let particles = r[0]
    particles.forEach(c => {
      let transform = system_get_transform(c)
      transform.pos.add(transform.vel)
    })
  }
}
