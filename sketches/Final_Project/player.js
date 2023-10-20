class Player extends Component {
  constructor() {
    super()
    this.shot_timer = 1000
  }
}

const PLAYER_X_VEL = 2
const PLAYER_SPRITE_SIZE = 20
const PLAYER_SHOT_TIME = 1000

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
      let player = system_get_player(p_c)
      let player_transform = system_get_transform(p_c)

      player.shot_timer += deltaTime;
      if (keyIsDown(LEFT_ARROW)) {
        player_transform.vel.x -= PLAYER_X_VEL
      }
      if (keyIsDown(RIGHT_ARROW)) {
        player_transform.vel.x += PLAYER_X_VEL
      }

      if (!keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW)) {
        player_transform.vel.x = 0
      }

      player_transform.vel.x = min(max(player_transform.vel.x, -PLAYER_X_VEL), PLAYER_X_VEL)

      if (keyIsDown(32) && player.shot_timer >= 1000) {
        player.shot_timer = 0
        game_controller.spawn_entity([
          new Bullet(),
          new Lifetime(500),
          new Transform(
            createVector(
              player_transform.pos.x,
              player_transform.pos.y - PLAYER_SPRITE_SIZE / 2
            ),
            createVector(
              0,
              -3,
            ),
          ),
          new Collider(BULLET_SPRITE_SIZE, BULLET_SPRITE_SIZE),
          sprite_manager.get_sprite('bullet'),
        ])
      }

      if (player_transform.pos.x < PLAYER_SPRITE_SIZE / 2) {
        player_transform.pos.x = PLAYER_SPRITE_SIZE / 2
      } else if (player_transform.pos.x > CANVAS_WIDTH - PLAYER_SPRITE_SIZE / 2) {
        player_transform.pos.x = CANVAS_WIDTH - PLAYER_SPRITE_SIZE / 2
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
        new Collider(),
      ]),
      new Query([
        new Missile(),
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
    let missiles = r[1]

    players.forEach((p_c, p_id) => {
      let player_transform = system_get_transform(p_c)
      let player_collider = system_get_collider(p_c)
      missiles.forEach((m_c, m_id) => {
        let missile_transform = system_get_transform(m_c)
        let missile_collider = system_get_collider(m_c)

        if (collides(player_transform.pos, player_collider, missile_transform.pos, missile_collider)) {
          game_controller.spawn_entity([
            new Explosion(),
            new Lifetime(10),
            clone_object(player_transform),
          ])
          game_controller.despawn_entity(p_id)
          game_controller.despawn_entity(m_id)
          game_controller.lose_game()
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
        new Alien(),
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let players = r[0]
    let aliens = r[1]

    players.forEach((_) => {
      let a_count = 0
      aliens.forEach((_) => {
        a_count++
      })
      if (a_count <= 0) {
        game_controller.win_game()
      }
    })
  }
}
