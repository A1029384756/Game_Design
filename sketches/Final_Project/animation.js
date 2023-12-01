class AnimateFacing extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Sprite(),
        new Transform(),
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let entities = r[0]
    entities.forEach((e_c, _) => {
      let transform = system_get_transform(e_c)
      let sprite = system_get_sprite(e_c)

      if (transform.vel.x < 0) {
        sprite.facing_right = false
      } else if (transform.vel.x > 0) {
        sprite.facing_right = true
      }
    })
  }
}

class AnimateSprites extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Sprite(),
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let entities = r[0]
    entities.forEach((e_c, _) => {
      let sprite = system_get_sprite(e_c)
      if (frameCount % 5 == 0) {
        sprite.curr_frame += 1
      }
      if (sprite.curr_frame >= sprite.frame_count) {
        sprite.curr_frame = 0
      }
    })
  }
}
