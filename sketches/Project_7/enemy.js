class Enemy extends Component {
  /**
  * @param {Number} calculate_time
  * @param {Number} curr_time
  */
  constructor(calculate_time = 0, curr_time = 0) {
    super()
    this.calculate_time = calculate_time
    this.curr_time = curr_time
    this.afraid = false
    this.path = /** @type {Vector[]} */ ([])
  }
}

class EnemyFear extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Enemy(),
        new Sprite(),
      ]),
      new Query([
        new Player(),
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let enemies = r[0]
    let players = r[1]

    enemies.forEach(e_c => {
      let enemy = system_get_enemy(e_c)
      let sprite = system_get_sprite(e_c)
      players.forEach(p_c => {
        let player = system_get_player(p_c)
        if (player.power_up_remaining > 0) {
          enemy.afraid = true
          sprite.imgs = [enemy_scared_sprite]
        } else {
          enemy.afraid = false 
          sprite.imgs = [enemy_sprite]
        }
      })
    })
  }
}

class EnemyPathing extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Enemy(),
        new Transform(),
      ]),
      new Query([
        new Player(),
        new Transform(),
      ]),
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let enemies = r[0]
    let players = r[1]

    let player_pos = /** @type {Vector} */ (createVector())
    players.forEach(c => {
      player_pos = system_get_transform(c).pos
    })

    enemies.forEach(c => {
      let enemy = system_get_enemy(c)
      let transform = system_get_transform(c)
      enemy.curr_time += 1
      if (enemy.curr_time > enemy.calculate_time) {
        enemy.curr_time = 0
        let init_pos = createVector(round(transform.pos.x / 20), round(transform.pos.y / 20))
        let goal_pos = createVector(round(player_pos.x / 20), round(player_pos.y / 20))

        let fringe = new PriorityQueue()
        let initial_state = new QueueItem(init_pos, 0, [])
        fringe.push(initial_state, 0)
        let visited = /** @type {Vector[]} */ ([])

        while (fringe.items.length > 0) {
          let fringe_item = fringe.pop()
          if (visited.find(v => v.equals(fringe_item.pos)) === undefined) {
            if (fringe_item.pos.equals(goal_pos)) {
              enemy.path = fringe_item.path
              break
            }
            visited.push(fringe_item.pos)
            game_controller.navmap.get(fringe_item.pos).adjacent.forEach(new_pos => {
              let new_cost = fringe_item.cost + 1
              let action = clone_object(new_pos).mult(20)
              let successor_state = new QueueItem(new_pos, fringe_item.cost, fringe_item.path.concat([action]))
              fringe.push(successor_state, new_cost + new_pos.dist(goal_pos))
            })
          }
        }
      }
    })
  }
}
