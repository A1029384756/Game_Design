class Player extends Component {
  constructor() {
    super()
    this.jump_delay = 400
    this.jump_timer = this.jump_delay
    this.total_jumps = 2
    this.jumps_remaining = this.total_jumps
  }
}

const PLAYER_SPEED = 0.75
const PLAYER_JUMP = -1.25

class PlayerMovement extends System {
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
    let players = r[0]
    players.forEach((p_c, p_id) => {
      let player = system_get_player(p_c)
      let player_transform = system_get_transform(p_c)

      player.jump_timer += deltaTime
      if (
        keyIsDown(32) &&
        player.jump_timer >= player.jump_delay &&
        player.jumps_remaining > 0
      ) {
        player.jump_timer = 0
        player.jumps_remaining -= 1
        player_transform.vel.y = PLAYER_JUMP
      }

      let x_vel = 0
      if (keyIsDown(68)) {
        x_vel += PLAYER_SPEED
      }
      if (keyIsDown(65)) {
        x_vel -= PLAYER_SPEED
      }
      player_transform.vel.x = x_vel
    })
  }
}

const PLAYER_COLLISION_PADDING = 1

class PlayerPhysics extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Player(),
        new Transform(),
        new Collider(),
        new Gravity(),
      ]),
      new Query([
        new Ground(),
        new Transform(),
        new Collider(),
      ]),
      new Query([
        new Bridge(),
        new Transform(),
        new Collider(),
      ]),
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let players = r[0]
    let ground_tiles = r[1]
    let bridge_tiles = r[2]

    players.forEach((p_c, p_id) => {
      let player = system_get_player(p_c)
      let player_transform = system_get_transform(p_c)
      let player_collider = system_get_collider(p_c)

      ground_tiles.forEach((g_c, g_id) => {
        const STICKY_THRESHOLD = 0.0004
        let ground_transform = system_get_transform(g_c)
        let ground_collider = system_get_collider(g_c)

        if (
          collides(
            player_transform.pos,
            player_collider,
            ground_transform.pos,
            ground_collider,
          )
        ) {
          let dx = (ground_transform.pos.x - player_transform.pos.x) / (ground_collider.w / 2)
          let dy = (ground_transform.pos.y - player_transform.pos.y) / (ground_collider.h / 2)
          let abs_dx = abs(dx)
          let abs_dy = abs(dy)

          if (abs(abs_dx - abs_dy) < 0.1) {
            if (dx < 0) {
              player_transform.pos.x = ground_transform.pos.x + ground_collider.w / 2 + player_collider.w / 2 + PLAYER_COLLISION_PADDING
            } else {
              player_transform.pos.x = ground_transform.pos.x - ground_collider.w / 2 - player_collider.w / 2 - PLAYER_COLLISION_PADDING
            }

            if (dy < 0) {
              player_transform.pos.y = ground_transform.pos.y + ground_collider.h / 2 + player_collider.h / 2
            } else {
              player_transform.pos.y = ground_transform.pos.y - ground_collider.h / 2 - player_collider.h / 2
            }
            if (random() < 0.5) {
              player_transform.vel.x = -player_transform.vel.x * 0.1;

              if (abs(player_transform.vel.x) < STICKY_THRESHOLD) {
                player_transform.vel.x = 0;
              }
            } else {
              player_transform.vel.y = -player_transform.vel.y * 0.1;
              if (abs(player_transform.vel.y) < STICKY_THRESHOLD) {
                player_transform.vel.y = 0;
              }
            }
          } else if (abs_dx > abs_dy) {
            if (dx < 0) {
              player_transform.pos.x = ground_transform.pos.x + ground_collider.w / 2 + player_collider.w / 2 + PLAYER_COLLISION_PADDING
            } else {
              player_transform.pos.x = ground_transform.pos.x - ground_collider.w / 2 - player_collider.w / 2 - PLAYER_COLLISION_PADDING
            }

            player_transform.vel.x = -player_transform.vel.x * 0.1;

            if (abs(player_transform.vel.x) < STICKY_THRESHOLD) {
              player_transform.vel.x = 0;
            }
          } else {
            if (dy < 0) {
              player_transform.pos.y = ground_transform.pos.y + ground_collider.h / 2 + player_collider.h / 2
            } else {
              player_transform.pos.y = ground_transform.pos.y - ground_collider.h / 2 - player_collider.h / 2
              player.jumps_remaining = player.total_jumps
            }

            player_transform.vel.y = -player_transform.vel.y * 0.1
            if (abs(player_transform.vel.y) < STICKY_THRESHOLD) {
              player_transform.vel.y = 0
              player.jumps_remaining = player.total_jumps
            }
          }
        }
      })

      bridge_tiles.forEach((b_c, b_id) => {
        let bridge_transform = system_get_transform(b_c)
        let bridge_collider = system_get_collider(b_c)
      })
    })
  }
}
