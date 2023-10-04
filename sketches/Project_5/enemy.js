class BirdBehavior extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Bird(),
        new Transform()
      ]),
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let enemy_query = r[0]
    enemy_query.forEach((p_c, _) => {
      let enemy_transform = system_get_transform(p_c)

      if (enemy_transform.vel.y > 0 && keyIsDown(32)) {
        enemy_transform.vel.y = -3
      }

      enemy_transform.vel.y += 0.1
      enemy_transform.pos.y += enemy_transform.vel.y
      enemy_transform.vel.x = 2
      enemy_transform.dir = enemy_transform.vel.heading()
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
    let enemy_query = r[0]
    enemy_query.forEach((e_c, _) => {
      let sprite = system_get_sprite(e_c)

      if (frameCount % 5 == 0) {
        sprite.curr_frame++
        if (sprite.curr_frame == sprite.frame_count) {
          sprite.curr_frame = 0
        }
      }
    })
  }
}
