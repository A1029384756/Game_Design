class System {
  constructor() {
    /** @type {Query[]} */
    this.query_set = [new Query([])]
  }

  /**
   * @param {QueryResponse[]} r
  */
  work(r) { }
}

class Render extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Sprite(),
        new Transform()
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let sprite_transforms = []

    r.forEach(q => q.forEach((c_list, _) => {
      sprite_transforms.push({
        sprite: c_list.find(c => c instanceof Sprite),
        transform: c_list.find(c => c instanceof Transform)
      })
    }))

    sprite_transforms.sort((a, b) => a.transform.v.z - b.transform.v.z).forEach(st => {
      image(st.sprite.img, st.transform.v.x, st.transform.v.y)
    })
  }
}

class Gravity extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Transform(),
        new Enemy()
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    r.forEach(q => q.forEach((c_list, _) => {
      /** @type {Transform} */
      // @ts-ignore
      let transform = c_list.find(c => c instanceof Transform)
      transform.v.y += 10
    }))
  }
}


class Wrapping extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Transform(),
        new Enemy()
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    r.forEach(q => q.forEach((c_list, _) => {
      /** @type {Transform} */
      // @ts-ignore
      let transform = c_list.find(c => c instanceof Transform)
      if (transform.v.y > 410) {
        transform.v.y = -10
      }
    }))
  }
}

class Collision extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Player(),
        new Transform(),
        new Collider()
      ]),
      new Query([
        new Enemy(),
        new Transform(),
        new Collider()
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let player_query = r[0]
    let enemy_query = r[1]

    player_query.forEach((player_components, _) => {
      /** @type {Collider} */
      // @ts-ignore
      let player_collider = player_components.find(c => c instanceof Collider)
      /** @type {Transform} */
      // @ts-ignore
      let player_transform = player_components.find(c => c instanceof Transform)
      enemy_query.forEach((enemy_components, id) => {
        /** @type {Collider} */
        // @ts-ignore
        let enemy_collider = enemy_components.find(c => c instanceof Collider)
        /** @type {Transform} */
        // @ts-ignore
        let enemy_transform = enemy_components.find(c => c instanceof Transform)

        let dist = player_transform.v.dist(enemy_transform.v)
        if (dist < player_collider.radius + enemy_collider.radius) {
          game_controller.despawn_entity(id)
        }
      })
    })
  }
}

class Movement extends System {
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

      let dir = createVector()

      if (keyIsDown(UP_ARROW)) {
        dir.y -= 1
      }
      if (keyIsDown(DOWN_ARROW)) {
        dir.y += 1
      }
      if (keyIsDown(LEFT_ARROW)) {
        dir.x -= 1
      }
      if (keyIsDown(RIGHT_ARROW)) {
        dir.x += 1
      }
      dir.mult(3)

      transform.v.add(dir)
    })
  }
}
