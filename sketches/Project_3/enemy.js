class EnemyState {
  static Wander = new EnemyState('wander')
  static Chase = new EnemyState('chase')
  static Avoid = new EnemyState('avoid')

  /** @param {String} name */
  constructor(name) {
    this.name = name
  }
}

class EnemyBehavior extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Enemy(),
        new Transform()
      ]),
      new Query([
        new Player(),
        new Transform()
      ]),
      new Query([
        new Rock(),
        new Transform(),
      ])
    ]

    this.closest_rock_dist_pos = [0, createVector()]
    this.player_dist_pos = [0, createVector()]
  }

  /**
   * @param {QueryResponse[]} r
   */

  work(r) {
    let enemy_query = r[0]
    let player_query = r[1]
    let rock_query = r[2]

    enemy_query.forEach((e_c, e_id) => {
      let enemy = system_get_enemy(e_c)
      let enemy_transform = system_get_transform(e_c)

      if (enemy.health <= 0) {
        game_controller.despawn_entity(e_id)
        return
      }

      this.closest_rock_dist_pos = get_closest_rock(enemy_transform.pos, rock_query)
      this.player_dist_pos = get_player(enemy_transform.pos, player_query)

      if (this.closest_rock_dist_pos[0] < 50) {
        enemy.state = EnemyState.Avoid
      } else if (this.player_dist_pos[0] < 150) {
        enemy.state = EnemyState.Chase
      } else {
        enemy.state = EnemyState.Wander
      }

      let delta = copy_vector(enemy_transform.pos)
      switch (enemy.state) {
        case EnemyState.Wander:
          break
        case EnemyState.Chase:
          delta.sub(this.player_dist_pos[1])
          enemy_transform.dir = delta.heading() - HALF_PI
          break
        case EnemyState.Avoid:
          delta.sub(this.closest_rock_dist_pos[1])

          let angle = enemy_transform.dir - HALF_PI - delta.heading()
          let x = round(delta.mag() * sin(angle))
          let y = round(delta.mag() * cos(angle))

          if (x <= 0 && y <= 0) {
            enemy_transform.dir += 0.1
          } else if (x > 0 && y <= 0) {
            enemy_transform.dir -= 0.1
          } else if (x > 0 && y > 0) {
            enemy_transform.dir += 0.01
          } else {
            enemy_transform.dir -= 0.01
          }
          break
      }

      enemy_transform.pos.x += sin(enemy_transform.dir)
      enemy_transform.pos.y -= cos(enemy_transform.dir)
    })
  }
}

/**
 * @param {Vector} enemy_pos
 * @param {QueryResponse} rock_query
 * @returns {[Number, Vector]}
 */
const get_closest_rock = (enemy_pos, rock_query) => {
  /** @type {Number} */
  let closest_rock_dist = Infinity
  /** @type {Vector} */
  let closest_rock_pos = createVector()

  rock_query.forEach((r_c, _) => {
    let rock_pos = copy_vector(system_get_transform(r_c).pos)
    let delta = copy_vector(enemy_pos)
    delta.sub(rock_pos)

    if (delta.mag() < closest_rock_dist) {
      closest_rock_dist = delta.mag()
      closest_rock_pos = rock_pos
    }
  })

  return [closest_rock_dist, closest_rock_pos]
}

/**
 * @param {Vector} enemy_pos
 * @param {QueryResponse} player_query
 * @returns {[Number, Vector]}
 */
const get_player = (enemy_pos, player_query) => {
  /** @type {Number} */
  let player_dist = 0
  /** @type {Vector} */
  let player_pos = createVector()

  player_query.forEach((p_c, _) => {
    let pos = system_get_transform(p_c).pos
    let delta = copy_vector(enemy_pos)
    delta.sub(pos)

    player_dist = delta.mag()
    player_pos = pos
  })

  return [player_dist, player_pos]
}
