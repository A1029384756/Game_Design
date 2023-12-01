class Player extends Component {
  constructor() {
    super()
    this.jump_delay = 200
    this.jump_timer = this.jump_delay
    this.attack_delay = 800
    this.attack_timer = this.attack_delay
    this.i_frame_time = 400
    this.i_frame_timer = this.i_frame_time
    this.total_jumps = 2
    this.jumps_remaining = this.total_jumps
    this.downward_jump = false
    this.in_air = false
  }
}

class PlayerAttack extends Component {
  /** @param {Vector} dir */
  constructor(dir = createVector()) {
    super()
    /** @type {Vector} */
    this.dir = dir
  }
}
class Attack1 extends Component { }
class Attack2 extends Component { }

const PLAYER_SPEED = 1.75
const PLAYER_JUMP = -1.8

class PlayerMovement extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Player(),
        new Transform(),
        new Sprite(),
      ]),
      new Query([
        new PlayerAttack(),
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let players = r[0]
    let attacks = r[1]
    let attack_active = attacks.size > 0
    players.forEach((p_c, _) => {
      let player = system_get_player(p_c)
      let player_transform = system_get_transform(p_c)
      let sprite = system_get_sprite(p_c)

      player.jump_timer += deltaTime
      player.attack_timer += deltaTime
      player.i_frame_timer -= deltaTime
      if (
        keyIsDown(32) &&
        keyIsDown(83)
      ) {
        player.jump_timer = 0
        player.attack_timer = player.attack_delay
        player_transform.vel.y = PLAYER_JUMP * PLAYER_JUMP
        player.downward_jump = true
        player.in_air = true
      } else if (
        keyIsDown(32) &&
        player.jump_timer >= player.jump_delay &&
        player.jumps_remaining > 0
      ) {
        player.jump_timer = 0
        player.attack_timer = player.attack_delay
        player.jumps_remaining -= 1
        player_transform.vel.y = PLAYER_JUMP
        player.downward_jump = false
        player.in_air = true
      }

      if (!player.in_air) {
        if (
          keyIsDown(87) &&
          player.i_frame_timer <= 0 &&
          !attack_active &&
          abs(player_transform.vel.x) > 0.1
        ) {
          player.i_frame_timer = player.i_frame_time
        }
        else if (
          player.attack_timer >= player.attack_delay &&
          player.i_frame_timer <= 0
        ) {
          let attack_x_offset = sprite.facing_right ? 15 : -15
          let attack_x_dir = sprite.facing_right ? 1 : -1
          if (keyIsDown(74)) {
            player.attack_timer = 0
            game_controller.spawn_entity([
              new Attack1(),
              new PlayerAttack(createVector(attack_x_dir)),
              new Lifetime(8),
              new Collider(15, 15),
              new Transform(
                createVector(
                  player_transform.pos.x + attack_x_offset,
                  player_transform.pos.y,
                ),
              ),
            ])
          } else if (keyIsDown(75)) {
            player.attack_timer = 0
            game_controller.spawn_entity([
              new Attack2(),
              new PlayerAttack(createVector(attack_x_dir, -2)),
              new Lifetime(8),
              new Collider(15, 15),
              new Transform(
                createVector(
                  player_transform.pos.x + attack_x_offset,
                  player_transform.pos.y,
                ),
              ),
            ])
          }
        }
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

class PlayerTakeHit extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Player(),
        new Transform(),
        new Collider(),
        new Health(),
      ]),
      new Query([
        new GoblinAttack(),
        new Transform(),
        new Collider(),
        new Lifetime(),
      ]),
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    r[0].forEach((p_c, _) => {
      let transform = system_get_transform(p_c)
      let collider = system_get_collider(p_c)
      let player = system_get_player(p_c)
      let health = system_get_health(p_c)

      if (player.i_frame_timer <= 0) {
        r[1].forEach((a_c, a_id) => {
          let attack_transform = system_get_transform(a_c)
          let attack_collider = system_get_collider(a_c)
          let attack = system_get_goblin_attack(a_c)

          if (collides(transform.pos, collider, attack_transform.pos, attack_collider)) {
            game_controller.despawn_entity(a_id)
            transform.vel.add(attack.dir)
            health.health -= 1
          }

          if (health.health <= 0) {
            game_controller.lose_game()
          }
        })
      }
    })
  }
}

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

      /** @param {Vector} pos */
      const collide_at = (pos) => {
        let collide = false

        for (let [_, g_c] of ground_tiles.entries()) {
          let ground_transform = system_get_transform(g_c)
          let ground_collider = system_get_collider(g_c)
          if (collides(
            pos,
            player_collider,
            ground_transform.pos,
            ground_collider,
          )) {
            collide = true
            break
          }
        }

        for (let [_, b_c] of bridge_tiles.entries()) {
          let bridge_transform = system_get_transform(b_c)
          let bridge_collider = system_get_collider(b_c)

          if (collides(
            pos,
            player_collider,
            bridge_transform.pos,
            bridge_collider,
          ) && !player.downward_jump) {
            if ((player_transform.pos.y + player_collider.h / 2) - (bridge_transform.pos.y - bridge_collider.h / 2) < 0) {
              collide = true
            }
            break
          }
        }

        return collide
      }

      player_transform.x_remainder += player_transform.vel.x
      player_transform.y_remainder += player_transform.vel.y
      let move_x = round(player_transform.x_remainder)
      let move_y = round(player_transform.y_remainder)

      if (move_x != 0) {
        player_transform.x_remainder -= move_x
        let x_sign = move_x > 0 ? 1 : -1
        while (move_x != 0) {
          if (!collide_at(createVector(player_transform.pos.x + x_sign, player_transform.pos.y))) {
            player_transform.pos.x += x_sign
            move_x -= x_sign
          } else {
            player_transform.vel.x = 0
            break
          }
        }
      }

      if (move_y != 0) {
        player_transform.y_remainder -= move_y
        let y_sign = move_y > 0 ? 1 : -1
        while (move_y != 0) {
          if (!collide_at(createVector(player_transform.pos.x, player_transform.pos.y + y_sign))) {
            player.in_air = true
            player_transform.pos.y += y_sign
            move_y -= y_sign
          } else {
            player_transform.vel.y = 0

            if (y_sign > 0) {
              player.jumps_remaining = player.total_jumps
              player.downward_jump = false
              player.in_air = false
            }
            break
          }
        }
      }
    })
  }
}

class PlayerWin extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Player(),
        new Transform(),
        new Collider(),
      ]),
      new Query([
        new Exit(),
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
    let exits = r[1]

    players.forEach(c => {
      let transform = system_get_transform(c)
      let collider = system_get_collider(c)

      exits.forEach(e => {
        let exit_transform = system_get_transform(e)
        let exit_collider = system_get_collider(e)

        if (collides(transform.pos, collider, exit_transform.pos, exit_collider)) {
          game_controller.win_game()
        }
      })
    })
  }
}
