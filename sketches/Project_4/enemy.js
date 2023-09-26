class EnemyBehavior extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Enemy(),
        new Transform()
      ]),
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */

  work(r) {
    let enemy_query = r[0]
    enemy_query.forEach((e_c, e_id) => {
      let enemy = system_get_enemy(e_c)
      let enemy_transform = system_get_transform(e_c)

      if (enemy_transform.pos.y <= 0) {
        enemy_transform.pos.y = 0
        enemy_transform.vel.y = sqrt(enemy.jump_height * -2 * GRAVITY)
      }

      enemy_transform.pos.x -= BUILDING_ENEMY_VEL
      enemy_transform.vel.y -= 0.1
      enemy_transform.pos.y += enemy_transform.vel.y

      if (enemy_transform.pos.x < -60) {
        game_controller.despawn_entity(e_id)
      }
    })
  }
}

class EnemyAnimation extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Enemy(),
        new Sprite(),
        new Transform(),
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let enemy_query = r[0]
    enemy_query.forEach((e_c, e_id) => {
      let sprite = system_get_sprite(e_c)
      let transform = system_get_transform(e_c)

      if (transform.vel.y > 0) {
        sprite.curr_frame = 0
      } else {
        sprite.curr_frame = 1
      }
    })
  }
}
