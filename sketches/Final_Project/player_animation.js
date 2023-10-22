class Idle extends Component {}
class Running extends Component {}

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

class PlayerIdle extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Player(),
        new Sprite(),
        new Transform(),
        new Idle(),
      ]),
    ]
  }

  /**
   * @param {QueryResponse[]} r
  */
  work(r) {
    let players = r[0]
    players.forEach((p_c, p_id) => {
      let transform = system_get_transform(p_c)

      if (abs(transform.vel.x) > 0) {
        game_controller.world.remove_components(p_id, [
          new Idle(),
        ])
        game_controller.world.add_components(p_id, [
          new Running(),
        ])
        game_controller.world.remove_components(p_id, [
          new Sprite(),
        ])
        game_controller.world.add_components(p_id, [
          sprite_manager.get_sprite('player_run')
        ])
      }
    })
  }
}

class PlayerRun extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Player(),
        new Sprite(),
        new Transform(),
        new Running(),
      ])
    ]
  }
  
  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let players = r[0]
    players.forEach((p_c, p_id) => {
      let transform = system_get_transform(p_c)

      if (abs(transform.vel.x) == 0) {
        game_controller.world.remove_components(p_id, [
          new Running(),
        ])
        game_controller.world.add_components(p_id, [
          new Idle(),
        ])
        game_controller.world.remove_components(p_id, [
          new Sprite(),
        ])
        game_controller.world.add_components(p_id, [
          sprite_manager.get_sprite('player_idle')
        ])
      }
    })
  }
}
