class PlayerControl extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Player(),
        new Transform(),
      ])
    ]
  }

  /** 
   * @param {QueryResponse[]} r
   */
  work(r) {
    let player_query = r[0]

    player_query.forEach((p_c, _) => {
      let transform = system_get_transform(p_c)

      let vel = 0

      if (keyIsDown(87)) {
        vel++
      }
      if (keyIsDown(83)) {
        vel--
      }
      if (keyIsDown(65)) {
        transform.dir -= 0.075
      }
      if (keyIsDown(68)) {
        transform.dir += 0.075
      }
      vel *= 3
      transform.pos.add(
        createVector(
          vel * cos(transform.dir),
          vel * sin(transform.dir)
        )
      )
    })
  }
}

class Shoot extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Gun(),
        new Transform()
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let shooter_query = r[0]

    shooter_query.forEach((s_c, _) => {
      let transform = system_get_transform(s_c)
      let gun = system_get_gun(s_c)

      gun.shot_delay.update()
      if (keyIsDown(32) && gun.shot_delay.complete) {
        gun.shot_delay.reset()

        game_controller.spawn_entity([
          new Transform(
            copy_vector(transform.pos),
            transform.dir,
            5
          ),
          new Sprite(
            game_controller.sprite_manager.get_sprite('bullet')
          ),
          new Bullet(),
          new Collider(5)
        ])
      }
    })
  }
}
