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
      vel *= 2
      transform.pos.add(
        createVector(
          vel * cos(transform.dir),
          vel * sin(transform.dir)
        )
      )

      if (transform.pos.x < 20) {
        transform.pos.x = 22
      }
      if (transform.pos.x > 960) {
        transform.pos.x = 958
      }
      if (transform.pos.y < 20) {
        transform.pos.y = 22
      }
      if (transform.pos.y > 960) {
        transform.pos.y = 958
      }
    })
  }
}

class PlayerLogic extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Player(),
        new Sprite()
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let player_query = r[0]
    player_query.forEach((p_c, _) => {
      let player = system_get_player(p_c)
      let sprite = system_get_sprite(p_c)

      if (player.health <= 0) {
        game_controller.lose_game()
      } else {
        sprite.img = game_controller.sprite_manager.get_sprite(`player_${player.health}`)
      }

      if (player.remaining_goals == 0) {
        game_controller.win_game()
      }
    })
  }
}

class PlayerCollision extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Player(),
        new Transform(),
        new Collider()
      ]),
      new Query([
        new Enemy(),
        new Transform(),
        new Collider()
      ]),
      new Query([
        new Rock(),
        new Transform(),
        new Collider()
      ], [
        new Border()
      ]),
      new Query([
        new Coin(),
        new Transform(),
        new Collider()
      ])
    ]
  }

  /** 
   * @param {QueryResponse[]} r
   */
  work(r) {
    let player_query = r[0]
    let enemy_query = r[1]
    let rock_query = r[2]
    let coin_query = r[3]

    player_query.forEach((p_c, _) => {
      let player = system_get_player(p_c)
      let collider = system_get_collider(p_c)
      let transform = system_get_transform(p_c)

      enemy_query.forEach((e_c, _) => {
        let enemy_collider = system_get_collider(e_c)
        let enemy_transform = system_get_transform(e_c)

        if (collides(collider, transform.pos, enemy_collider, enemy_transform.pos)) {
          game_controller.lose_game()
        }
      })

      rock_query.forEach((r_c, r_id) => {
        let rock_collider = system_get_collider(r_c)
        let rock_transform = system_get_transform(r_c)

        if (collides(collider, transform.pos, rock_collider, rock_transform.pos)) {
          game_controller.despawn_entity(r_id)
          player.health--
        }
      })

      coin_query.forEach((c_c, c_id) => {
        let coin_collider = system_get_collider(c_c)
        let coin_transform = system_get_transform(c_c)

        if (collides(collider, transform.pos, coin_collider, coin_transform.pos)) {
          game_controller.despawn_entity(c_id)
          player.remaining_goals--
        }
      })
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
