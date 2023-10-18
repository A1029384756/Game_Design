class Particle extends Component { }
class Lifetime extends Component {
  /**
   * @param {Number} [life=0]
  */
  constructor(life = 0) {
    super()
    this.life = life
    this.total_life = life
  }
}


class LifetimeManagement extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Lifetime(),
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let particles = r[0]

    particles.forEach((p_c, p_id) => {
      let lifetime = system_get_lifetime(p_c)
      lifetime.life -= 1

      if (lifetime.life <= 0) {
        game_controller.despawn_entity(p_id)
      }
    })
  }
}

class ParticleFadeOut extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Lifetime(),
        new Particle(),
        new Sprite(),
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let particles = r[0]
    
    particles.forEach((p_c, _) => {
      let lifetime = system_get_lifetime(p_c)
      let sprite = system_get_sprite(p_c)

      sprite.tint = [255, 255, 255, 255 * lifetime.life / lifetime.total_life]
    })
  }
}
