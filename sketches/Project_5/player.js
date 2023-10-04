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
    player_query.forEach((e_c, _) => {
      let player_transform = system_get_transform(e_c)

      if (player_transform.pos.y <= 10) {
        player_transform.pos.y = 10
        player_transform.vel.y = 0
        if (keyIsDown(32)) {
          player_transform.vel.y = sqrt(200 * -2 * GRAVITY)
        }
      }

      if (keyIsDown(LEFT_ARROW)) {
        player_transform.pos.x -= 3
      }
      if (keyIsDown(RIGHT_ARROW)) {
        player_transform.pos.x += 3
      }

      player_transform.pos.add(player_transform.vel)

      if (player_transform.pos.x <= 10 || player_transform.pos.x >= 390) {
        game_controller.lose_game()
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
        new Transform(),
        new Collider()
      ], [
        new Player()
      ])
    ]
  }

  /**
  * @param {QueryResponse[]} r
  */
  work(r) {
    let player_query = r[0]
    let collision_query = r[1]

    player_query.forEach((p_c, _) => {
      let transform = system_get_transform(p_c).pos
      let collider = system_get_collider(p_c)

      collision_query.forEach((c_c, _) => {
        let c_transform = system_get_transform(c_c).pos
        let c_collider = system_get_collider(c_c)

        if (collides(collider, transform, c_collider, c_transform)) {
          game_controller.lose_game()
        }
      })
    })
  }
}

class PlayerAnimation extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Player(),
        new Transform(),
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
      let transform = system_get_transform(p_c)
      let sprite = system_get_sprite(p_c)

      if (transform.vel.y > 0) {
        sprite.curr_frame = 1
      } else {
        sprite.curr_frame = 0
      }
    })
  }
}
