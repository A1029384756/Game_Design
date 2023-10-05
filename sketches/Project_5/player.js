class Player extends Component {}

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
        player_transform.pos.x -= 2
      }
      if (keyIsDown(RIGHT_ARROW)) {
        player_transform.pos.x += 2
      }

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
        new Building(),
        new Transform(),
        new Collider()
      ]),
      new Query([
        new Ball(),
        new Transform(),
        new Collider()
      ]),
      new Query([
        new Bird(),
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
    let collision_query = new Map([...r[1], ...r[2]])
    let bird_query = r[3]

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

      bird_query.forEach((b_c, _) => {
        let bird_transform = system_get_transform(b_c).pos
        let bird_collider = system_get_collider(b_c)

        if (collides(collider, transform, bird_collider, bird_transform)) {
          game_controller.win_game()
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
