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
      let player_transform = system_get_transform(p_c)

      if (player_transform.vel.y > 0 && keyIsDown(32)) {
        player_transform.vel.y = -3
      }

      if (player_transform.pos.y <= 15 || player_transform.pos.y >= 385) {
        game_controller.lose_game()
      }

      player_transform.vel.y += 0.1
      player_transform.pos.y += player_transform.vel.y
      player_transform.vel.x = 2
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
      let sprite = system_get_sprite(p_c)

      if (frameCount % 5 == 0) {
        sprite.curr_frame++
        if (sprite.curr_frame == sprite.frame_count) {
          sprite.curr_frame = 0
        }
      }
    })
  }
}
