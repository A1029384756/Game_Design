class Player extends Component {
  constructor() {
    super()
    this.power_up_time = 5000
    this.power_up_remaining = 0
  }
}

const PLAYER_SPEED = 1.2

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
    let players = r[0]
    players.forEach((p_c, _) => {
      let player_transform = system_get_transform(p_c)
      let player = system_get_player(p_c)
      if (player.power_up_remaining > 0) {
        player.power_up_remaining -= deltaTime
      }

      let x_vel = 0
      let y_vel = 0
      if (keyIsDown(68)) {
        x_vel += PLAYER_SPEED
      }
      if (keyIsDown(65)) {
        x_vel -= PLAYER_SPEED
      }
      if (keyIsDown(87)) {
        y_vel -= PLAYER_SPEED
      }
      if (keyIsDown(83)) {
        y_vel += PLAYER_SPEED
      }

      player_transform.vel.x = x_vel
      player_transform.vel.y = y_vel
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
        new Collider(),
      ]),
      new Query([
        new Enemy(),
        new Transform(),
        new Collider(),
      ]),
      new Query([
        new Pellet(),
        new Transform(),
        new Collider(),
      ], [
        new PowerPellet(),
      ]),
      new Query([
        new PowerPellet(),
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
    let enemies = r[1]
    let pellets = r[2]
    let power_pellets = r[3]

    players.forEach((p_c, p_id) => {
      let player_transform = system_get_transform(p_c)
      let player_collider = system_get_collider(p_c)
      let player = system_get_player(p_c)

      enemies.forEach((e_c, e_id) => {
        let enemy_transform = system_get_transform(e_c)
        let enemy_collider = system_get_collider(e_c)
        let enemy = system_get_enemy(e_c)

        if (collides(player_transform.pos, player_collider, enemy_transform.pos, enemy_collider)) {
          if (enemy.afraid) {
            game_controller.despawn_entity(e_id)
            game_controller.spawn_entity([
              new Explosion(),
              new Lifetime(15),
              clone_object(player_transform),
            ])
          } else {
            game_controller.despawn_entity(p_id)
            game_controller.lose_game()
          }
        }
      })

      pellets.forEach((c, id) => {
        let pellet_transform = system_get_transform(c)
        let pellet_collider = system_get_collider(c)

        if (collides(player_transform.pos, player_collider, pellet_transform.pos, pellet_collider)) {
          game_controller.despawn_entity(id)
        }
      })

      power_pellets.forEach((c, id) => {
        let pellet_transform = system_get_transform(c)
        let pellet_collider = system_get_collider(c)

        if (collides(player_transform.pos, player_collider, pellet_transform.pos, pellet_collider)) {
          game_controller.despawn_entity(id)
          player.power_up_remaining = player.power_up_time
        }
      })
    })
  }
}

class PlayerVictory extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Player(),
      ]),
      new Query([
        new Pellet(),
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let players = r[0]
    let pellets = r[1]

    players.forEach((_) => {
      let a_count = 0
      pellets.forEach((_) => {
        a_count++
      })
      if (a_count <= 0) {
        game_controller.win_game()
      }
    })
  }
}
