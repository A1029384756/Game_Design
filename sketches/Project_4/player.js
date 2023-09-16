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
    let player_query = r[0]

    player_query.forEach((player_components, _) => {
      /** @type {Transform} */
      // @ts-ignore
      let transform = player_components.find(c => c instanceof Transform)

      let vel = 0

      if (keyIsDown(87)) {
        vel++
      }
      if (keyIsDown(83)) {
        vel--
      }
      if (keyIsDown(65)) {
        transform.dir -= 0.075
      }
      if (keyIsDown(68)) {
        transform.dir += 0.075
      }
      vel *= 3
      transform.pos.add(
        createVector(
          vel * cos(transform.dir),
          vel * sin(transform.dir)
        )
      )
    })
  }
}

class Shoot extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Gun(),
        new Transform()
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let shooter_query = r[0]

    shooter_query.forEach((shooter_components, _) => {
      /** @type {Transform} */
      // @ts-ignore
      let transform = shooter_components.find(c => c instanceof Transform)
      /** @type {Gun} */
      // @ts-ignore
      let gun = shooter_components.find(c => c instanceof Gun)

      gun.shot_delay.update()
      if (keyIsDown(32) && gun.shot_delay.complete) {
        gun.shot_delay.reset()

        game_controller.spawn_entity([
          new Transform(
            copy_vector(transform.pos),
            transform.dir,
            5
          ),
          new Sprite(
            game_controller.sprite_manager.get_sprite('bullet')
          ),
          new Bullet()
        ])
      }
    })
  }
}
