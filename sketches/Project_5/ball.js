class BallAnimation extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Ball(),
        new Transform()
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let ball_query = r[0]

    ball_query.forEach((b_c, _) => {
      let transform = system_get_transform(b_c)
      transform.dir += abs(transform.vel.y)
        * (transform.vel.x > 0 ? 0.1 : -0.1)
      transform.pos.add(transform.vel)
    })
  }
}

class BallCollision extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Ball(),
        new Collider(),
        new Transform()
      ]),
      new Query([
        new Building(),
        new Collider(),
        new Transform()
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let ball_query = r[0]
    let building_query = r[1]

    ball_query.forEach((b_c, b_id) => {
      let transform = system_get_transform(b_c)
      let collider = system_get_collider(b_c)

      building_query.forEach((bu_c, _) => {
        let building_transform = system_get_transform(bu_c)
        let building_collider = system_get_collider(bu_c)

        if (collides(collider, transform.pos, building_collider, building_transform.pos)) {
          if (transform.pos.y < building_transform.pos.y - building_collider.h / 2) {
            transform.pos.y = building_transform.pos.y - building_collider.h / 2 - collider.h / 2
            transform.vel.y *= -1
          } else if (transform.pos.x < building_transform.pos.x - building_collider.w / 2) {
            transform.pos.x = building_transform.pos.x - building_collider.w / 2 - collider.w / 2
            transform.vel.x *= -1
          } else if (transform.pos.x > building_transform.pos.x + building_collider.w / 2) {
            transform.pos.x = building_transform.pos.x + building_collider.w / 2 + collider.w / 2
            transform.vel.x *= -1
          }
        }
      })

      if (transform.pos.x < -50 || transform.pos.x > 450 || transform.pos.y > 400) {
        game_controller.despawn_entity(b_id)
      }
    })
  }
}

class CannonMovement extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Cannon(),
        new Transform()
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let cannon_query = r[0]

    cannon_query.forEach((c_c, c_id) => {
      let cannon = system_get_cannon(c_c)
      let transform = system_get_transform(c_c)

      transform.pos.x -= BUILDING_ENEMY_VEL

      if (transform.pos.x <= 380 && !cannon.fired) {
        cannon.fired = true
        game_controller.spawn_entity(
          [
            new Ball(),
            new Sprite(ball_sprite()),
            new Transform(createVector(transform.pos.x, transform.pos.y), cannon.initial_vel),
            new Gravity(),
            new Collider(20, 20)
          ]
        )
      }
      
      if (transform.pos.x < -20) {
        game_controller.despawn_entity(c_id)
      }
    })
  }
}
