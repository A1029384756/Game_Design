class Bird extends Component {
  constructor() {
    super()
    this.jump_vel = -3
    this.speed = 4
    this.target_x = 100
  }
}

// Components representing bird states
class BirdDefault extends Component { }
class BirdBorder extends Component { }
class BirdBuilding extends Component { }
class BirdMonster extends Component { }
class BirdBall extends Component { }

class BirdLabeling extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Bird(),
        new BirdDefault(),
        new GameText()
      ]),
      new Query([
        new Bird(),
        new BirdBuilding(),
        new GameText()
      ]),
      new Query([
        new Bird(),
        new BirdMonster(),
        new GameText()
      ]),
      new Query([
        new Bird(),
        new BirdBall(),
        new GameText()
      ]),
      new Query([
        new Bird(),
        new BirdBorder(),
        new GameText()
      ]),
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let b_default = r[0]
    let building = r[1]
    let monster = r[2]
    let ball = r[3]
    let border = r[4]

    b_default.forEach((c, _) => {
      let text = system_get_text(c)
      text.text = 'Default'
    })
    building.forEach((c, _) => {
      let text = system_get_text(c)
      text.text = 'Building'
    })
    monster.forEach((c, _) => {
      let text = system_get_text(c)
      text.text = 'Monster'
    })
    ball.forEach((c, _) => {
      let text = system_get_text(c)
      text.text = 'Ball'
    })
    border.forEach((c, _) => {
      let text = system_get_text(c)
      text.text = 'Border'
    })
  }
}

class BirdCollision extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Bird(),
        new Transform(),
        new Collider()
      ]),
      new Query([
        new Transform(),
        new Collider()
      ], [
        new Bird()
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let bird_query = r[0]
    let collision_query = r[1]

    bird_query.forEach((b_c, _) => {
      let transform = system_get_transform(b_c)
      let collider = system_get_collider(b_c)

      collision_query.forEach((c_c, _) => {
        let c_transform = system_get_transform(c_c)
        let c_collider = system_get_collider(c_c)

        // End game if bird collides with objects
        if (collides(collider, transform.pos, c_collider, c_transform.pos)) {
          game_controller.win_game()
        }
      })

      // End game if outside of bounds
      if (transform.pos.y < 15 || transform.pos.x < 15 || transform.pos.x > 200) {
        game_controller.win_game()
      }
    })
  }
}

class BirdDefaultBehavior extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Bird(),
        new Transform(),
        new Sensor(),
        new BirdDefault()
      ]),
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
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let bird_query = r[0]
    let player_query = r[1]
    let building_query = r[2]
    let ball_query = r[3]

    bird_query.forEach((b_c, id) => {
      let transform = system_get_transform(b_c)
      let sensor = system_get_sensor(b_c)

      let bird = system_get_bird(b_c)

      // Move target x position every 30 frames
      if (frameCount % 30 == 0) {
        bird.target_x = random(80, 160)
      }

      // Move to target x position if not there
      if (transform.pos.x < bird.target_x - 10 || transform.pos.x > bird.target_x + 10) {
        transform.pos.x += (transform.pos.x < bird.target_x ? 1 : -1) * bird.speed
      }

      // Transition to bird border avoidance
      if (
        transform.pos.x < 40 ||
        transform.pos.x > 190 ||
        transform.pos.y < 30 ||
        transform.pos.y > 370
      ) {
        game_controller.world.add_components(id, [new BirdBorder()])
        game_controller.world.remove_components(id, [new BirdDefault()])
        return
      }

      // Transition to monster avoidance
      for (const [_, p_c] of player_query) {
        let player_transform = system_get_transform(p_c)
        let player_collider = system_get_collider(p_c)

        if (predict_collision(sensor, transform, player_collider, player_transform, 3)) {
          game_controller.world.add_components(id, [new BirdMonster()])
          game_controller.world.remove_components(id, [new BirdDefault()])
          return
        }
      }

      // Transition to ball avoidance
      if (balls_to_avoid(transform, sensor, ball_query).length > 0) {
        game_controller.world.add_components(id, [new BirdBall()])
        game_controller.world.remove_components(id, [new BirdDefault()])
        return
      }

      // Transition to building avoidance
      const [closest_building_transform, closest_building_collider] = nearest_building(transform, building_query)
      if (transform.pos.y > closest_building_transform.pos.y - closest_building_collider.h / 2 - 30) {
        game_controller.world.add_components(id, [new BirdBuilding()])
        game_controller.world.remove_components(id, [new BirdDefault()])
        return
      }
    })
  }
}

class BirdMonsterBehavior extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Bird(),
        new Transform(),
        new Sensor(),
        new BirdMonster()
      ]),
      new Query([
        new Player(),
        new Transform(),
        new Collider()
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let bird_query = r[0]
    let player_query = r[1]

    bird_query.forEach((b_c, id) => {
      let bird = system_get_bird(b_c)
      let transform = system_get_transform(b_c)
      let sensor = system_get_sensor(b_c)

      player_query.forEach((p_c, _) => {
        let p_transform = system_get_transform(p_c)
        let p_collider = system_get_collider(p_c)

        // Decide whether monster is still a threat
        if (predict_collision(sensor, transform, p_collider, p_transform, 3)) {
          // Jump only if above monster
          if (transform.vel.y > 0 && p_transform.pos.y > transform.pos.y) {
            transform.vel.y = bird.jump_vel
          }
          // Move away from monster
          transform.pos.x += (transform.pos.x > p_transform.pos.x ? 1 : -1) * bird.speed
        } else {
          // Reset to default state
          game_controller.world.add_components(id, [new BirdDefault()])
          game_controller.world.remove_components(id, [new BirdMonster()])
        }
      })
    })
  }
}

class BirdBallBehavior extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Bird(),
        new Transform(),
        new Sensor(),
        new BirdBall()
      ]),
      new Query([
        new Ball(),
        new Transform(),
        new Collider()
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let bird_query = r[0]
    let ball_query = r[1]

    bird_query.forEach((b_c, id) => {
      let bird = system_get_bird(b_c)
      let transform = system_get_transform(b_c)
      let sensor = system_get_sensor(b_c)

      const obstacle_balls = balls_to_avoid(transform, sensor, ball_query)

      // Decide whether balls are still a threat
      if (obstacle_balls.length > 0) {
        // Move and jump away from ball
        transform.pos.x += (transform.pos.x > obstacle_balls[0].x ? 1 : -1) * bird.speed
        if (transform.vel.y > 0) {
          transform.vel.y = bird.jump_vel
        }
      } else {
        // Reset to default state
        game_controller.world.add_components(id, [new BirdDefault()])
        game_controller.world.remove_components(id, [new BirdBall()])
      }
    })
  }
}

class BirdBuildingBehavior extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Bird(),
        new Transform(),
        new Sensor(),
        new BirdBuilding()
      ]),
      new Query([
        new Building(),
        new Transform(),
        new Collider()
      ]),
      new Query([
        new Player(),
        new Transform(),
        new Collider()
      ]),
      new Query([
        new Ball(),
        new Transform(),
        new Collider()
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let bird_query = r[0]
    let building_query = r[1]
    let player_query = r[2]
    let ball_query = r[3]

    bird_query.forEach((b_c, id) => {
      let bird = system_get_bird(b_c)
      let transform = system_get_transform(b_c)
      let sensor = system_get_sensor(b_c)

      const [closest_building_transform, closest_building_collider] = nearest_building(transform, building_query)

      // Decide whether building is still a threat
      if (transform.pos.y > closest_building_transform.pos.y - closest_building_collider.h / 2 - 30) {
        // Jump over or avoid building
        if (transform.vel.y > 0) {
          transform.vel.y = bird.jump_vel
        } else if (transform.pos.x > closest_building_transform.pos.x - closest_building_collider.w) {
          transform.pos.x -= bird.speed
        }
      } else {
        // Reset to default state
        game_controller.world.add_components(id, [new BirdDefault()])
        game_controller.world.remove_components(id, [new BirdBuilding()])
        return
      }

      // Find if any players are threats
      for (const [_, p_c] of player_query) {
        let player_transform = system_get_transform(p_c)
        let player_collider = system_get_collider(p_c)

        // Transition to monster state
        if (predict_collision(sensor, transform, player_collider, player_transform, 3)) {
          game_controller.world.add_components(id, [new BirdMonster()])
          game_controller.world.remove_components(id, [new BirdBuilding()])
          return
        }
      }

      // Find if any balls are threats
      const obstacle_balls = balls_to_avoid(transform, sensor, ball_query)
      if (obstacle_balls.length > 0) {
        // Transition to ball state
        game_controller.world.add_components(id, [new BirdBall()])
        game_controller.world.remove_components(id, [new BirdBuilding()])
        return
      }
    })
  }
}

class BirdBorderBehavior extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Bird(),
        new Transform(),
        new BirdBorder()
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let bird_query = r[0]

    bird_query.forEach((b_c, id) => {
      let bird = system_get_bird(b_c)
      let transform = system_get_transform(b_c)

      // Move away from x edges
      if (transform.pos.x < 50) {
        transform.pos.x += bird.speed
      } else if (transform.pos.x > 180) {
        transform.pos.x -= bird.speed
      }

      // Jump above y edges
      if (transform.pos.y > 350 && transform.vel.y > 0) {
        transform.vel.y = bird.jump_vel
      }

      // Reset to default state
      if (
        transform.pos.x > 50 &&
        transform.pos.x < 180 &&
        transform.pos.y < 360 &&
        transform.pos.y > 40
      ) {
        game_controller.world.add_components(id, [new BirdDefault()])
        game_controller.world.remove_components(id, [new BirdBorder()])
      }
    })
  }
}

class BirdAnimation extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Bird(),
        new Sprite(),
        new Transform(),
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let bird_query = r[0]
    bird_query.forEach((b_c, _) => {
      let sprite = system_get_sprite(b_c)
      let transform = system_get_transform(b_c)
      let vel_copy = copy_vector(transform.vel)
      transform.dir = vel_copy.add(createVector(2, 0)).heading()

      // Cycle bird frame every 5 frames
      if (frameCount % 5 == 0) {
        sprite.curr_frame++
        if (sprite.curr_frame == sprite.frame_count) {
          sprite.curr_frame = 0
        }
      }
    })
  }
}

/**
 * @param {Transform} bird_transform
 * @param {QueryResponse} building_query
 * @returns {[Transform, Collider]}
 */
const nearest_building = (bird_transform, building_query) => {
  let closest_building_transform = new Transform(createVector(Infinity))
  let closest_building_collider = new Collider()

  building_query.forEach((bu_c, _) => {
    let building_transform = system_get_transform(bu_c)
    let building_collider = system_get_collider(bu_c)

    if (building_transform.pos.x + building_collider.w / 2 + 30 <= bird_transform.pos.x) {
      return
    }

    if (building_transform.pos.x < closest_building_transform.pos.x) {
      closest_building_transform = building_transform
      closest_building_collider = building_collider
    }
  })

  return [closest_building_transform, closest_building_collider]
}

/**
 * @param {Transform} bird_transform
 * @param {Collider} bird_collider
 * @param {QueryResponse} ball_query
 * @returns {Vector[]}
 */
const balls_to_avoid = (bird_transform, bird_collider, ball_query) => {
  let result = []
  ball_query.forEach((b_c, _) => {
    let ball_transform = system_get_transform(b_c)
    let ball_collider = system_get_collider(b_c)
    for (let i = 1; i <= 5; i++) {
      if (predict_collision(bird_collider, bird_transform, ball_collider, ball_transform, i)) {
        result.push(predict_position(ball_transform, i))
      }
    }
  })

  return result
}

/**
 * @param {Collider} c1
 * @param {Transform} t1
 * @param {Collider} c2
 * @param {Transform} t2
 * @param {Number} n
 * @returns {Boolean}
 */
const predict_collision = (c1, t1, c2, t2, n) => {
  let p_t1 = predict_position(t1, n)
  let p_t2 = predict_position(t2, n)

  return collides(c1, p_t1, c2, p_t2)
}

/**
 * @param {Transform} t
 * @param {Number} n
 * @returns {Vector}
 */
const predict_position = (t, n) => {
  let pos_copy = copy_vector(t.pos)
  let vel_copy = copy_vector(t.vel)

  pos_copy.add(vel_copy.mult(n))
  return pos_copy
}
