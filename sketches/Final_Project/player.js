class Player extends Component {
  constructor() {
    super()
    this.jump_delay = 200
    this.jump_timer = this.jump_delay
    this.total_jumps = 2
    this.jumps_remaining = this.total_jumps
    this.downward_jump = false
  }
}

const PLAYER_SPEED = 1
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
    players.forEach((p_c, _) => {
      let player = system_get_player(p_c)
      let player_transform = system_get_transform(p_c)

      player.jump_timer += deltaTime
      if (
        keyIsDown(32) &&
        keyIsDown(83)
      ) {
        player.jump_timer = 0
        player_transform.vel.y = -PLAYER_JUMP
        player.downward_jump = true
      } else if (
        keyIsDown(32) &&
        player.jump_timer >= player.jump_delay &&
        player.jumps_remaining > 0
      ) {
        player.jump_timer = 0
        player.jumps_remaining -= 1
        player_transform.vel.y = PLAYER_JUMP
        player.downward_jump = false
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

    players.forEach((p_c, _) => {
      let player = system_get_player(p_c)
      let player_transform = system_get_transform(p_c)
      let player_collider = system_get_collider(p_c)

      ground_tiles.forEach((g_c, _) => {
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
          resolve_collision(
            player_transform,
            player_collider,
            ground_transform,
            ground_collider
          )
          if (abs(player_transform.vel.y) < 0.1 && ground_transform.pos.y > player_transform.pos.y) {
            player.jumps_remaining = player.total_jumps
            player.downward_jump = false
          }
        }
      })

      bridge_tiles.forEach((b_c, _) => {
        let bridge_transform = system_get_transform(b_c)
        let bridge_collider = system_get_collider(b_c)

        if (
          collides(
            player_transform.pos,
            player_collider,
            bridge_transform.pos,
            bridge_collider
          ) && !player.downward_jump
        ) {
          let delta = (player_transform.pos.y + player_collider.h / 2) - (bridge_transform.pos.y - bridge_collider.h / 2)
          if (delta < 3) {
            if (player_transform.vel.y > 0) {
              player_transform.vel.y = 0
              player_transform.pos.y = bridge_transform.pos.y - bridge_collider.h / 2 - player_collider.h / 2
              player.jumps_remaining = player.total_jumps
            }
          }
        }
      })
    })
  }
}
