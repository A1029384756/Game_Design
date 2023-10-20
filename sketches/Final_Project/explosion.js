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

      for (let i = 0; i < 10; i++) {
        game_controller.spawn_entity([
          new Particle(),
          new Lifetime(20),
          new Transform(
            clone_object(transform.pos),
            createVector(random(-1, 1), random(-1, 1)).setMag(1, 2)
          ),
          clone_object(sprite_manager.get_sprite('missile_particle')),
        ])
      }
    })
  }
}
