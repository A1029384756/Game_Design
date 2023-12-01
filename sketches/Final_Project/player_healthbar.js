class HealthPoint extends Component { }

class HealthBarSystem extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new HealthPoint(),
        new UIImage(),
      ]),
      new Query([
        new Player(),
        new Health(),
      ]),
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    r[0].forEach((_, r_id) => {
      game_controller.despawn_entity(r_id)
    })

    let player_health = system_get_health(r[1].values().next().value).health

    for (let i = 0; i < player_health; i += 1) {
      game_controller.spawn_entity([
        new UIImage(sprite_manager.get_sprite_imgs('heart')),
        new Transform(createVector(9 * i + 8, 8)),
        new HealthPoint(),
      ])
    }
  }
}
