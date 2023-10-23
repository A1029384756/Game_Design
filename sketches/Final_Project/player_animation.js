class Idle extends Component {}
class Running extends Component {}
class Jumping extends Component {}
class Falling extends Component {}
class Landing extends Component {}

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
      let player = system_get_player(p_c)
      let transform = system_get_transform(p_c)
      let sprite = system_get_sprite(p_c)

      if (player.in_air) {
        game_controller.world.remove_components(p_id, [
          new Idle(),
        ])
        game_controller.world.add_components(p_id, [
          new Jumping(),
        ])
        update_sprite(sprite, sprite_manager.get_sprite('player_jump'))
      } else if (abs(transform.vel.x) >= 0.1) {
        game_controller.world.remove_components(p_id, [
          new Idle(),
        ])
        game_controller.world.add_components(p_id, [
          new Running(),
        ])
        update_sprite(sprite, sprite_manager.get_sprite('player_run'))
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
      let player = system_get_player(p_c)
      let transform = system_get_transform(p_c)
      let sprite = system_get_sprite(p_c)

      if (player.in_air) {
        game_controller.world.remove_components(p_id, [
          new Running(),
        ])
        game_controller.world.add_components(p_id, [
          new Jumping(),
        ])
        update_sprite(sprite, sprite_manager.get_sprite('player_jump'))
      } else if (abs(transform.vel.x) < 0.1) {
        game_controller.world.remove_components(p_id, [
          new Running(),
        ])
        game_controller.world.add_components(p_id, [
          new Idle(),
        ])
        update_sprite(sprite, sprite_manager.get_sprite('player_idle'))
      }
    })
  }
}

class PlayerJump extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Player(),
        new Sprite(),
        new Transform(),
        new Jumping(),
      ]),
    ]
  }

  /**
   * @param {QueryResponse[]} r
  */
  work(r) {
    let players = r[0]
    players.forEach((p_c, p_id) => {
      let sprite = system_get_sprite(p_c)

      if (sprite.curr_frame == sprite.frame_count - 1) {
        game_controller.world.remove_components(p_id, [
          new Jumping(),
        ])
        game_controller.world.add_components(p_id, [
          new Falling(),
        ])
        update_sprite(sprite, sprite_manager.get_sprite('player_fall'))
      }
    })
  }
}

class PlayerFall extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Player(),
        new Sprite(),
        new Transform(),
        new Falling(),
      ]),
    ]
  }

  /**
   * @param {QueryResponse[]} r
  */
  work(r) {
    let players = r[0]
    players.forEach((p_c, p_id) => {
      let player = system_get_player(p_c)
      let sprite = system_get_sprite(p_c)

      if (!player.in_air) {
        game_controller.world.remove_components(p_id, [
          new Falling(),
        ])
        game_controller.world.add_components(p_id, [
          new Landing(),
        ])
        update_sprite(sprite, sprite_manager.get_sprite('player_land'))
      }
    })
  }
}

class PlayerLand extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Player(),
        new Sprite(),
        new Transform(),
        new Landing(),
      ]),
    ]
  }

  /**
   * @param {QueryResponse[]} r
  */
  work(r) {
    let players = r[0]
    players.forEach((p_c, p_id) => {
      let sprite = system_get_sprite(p_c)
      let transform = system_get_transform(p_c)

      if (sprite.curr_frame == sprite.frame_count - 1) {
        game_controller.world.remove_components(p_id, [
          new Landing(),
        ])
        game_controller.world.add_components(p_id, [
          new Idle(),
        ])
        update_sprite(sprite, sprite_manager.get_sprite('player_idle'))
      } else if (abs(transform.vel.x) > 0.1) {
        game_controller.world.remove_components(p_id, [
          new Landing(),
        ])
        game_controller.world.add_components(p_id, [
          new Running(),
        ])
        update_sprite(sprite, sprite_manager.get_sprite('player_run'))
      }
    })
  }
}

/**
 * @param {Sprite} sp1
 * @param {Sprite} sp2
 */
const update_sprite = (sp1, sp2) => {
  sp1.imgs = sp2.imgs
  sp1.curr_frame = 0
  sp1.frame_count = sp2.frame_count
  sp1.name = sp2.name
}
