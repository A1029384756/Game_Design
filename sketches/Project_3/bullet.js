class BulletDynamics extends System {
  constructor() {
    super()
    /** @type {Query[]} */
    this.query_set = [
      new Query([
        new Transform(),
        new Bullet(),
        new Collider()
      ]),
      new Query([
        new Enemy(),
        new Transform(),
        new Collider()
      ]),
      new Query([
        new Rock(),
        new Transform(),
        new Collider()
      ], [
        new Border()
      ]),
      new Query([
        new Border(),
        new Transform(),
        new Collider()
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
  */
  work(r) {
    let bullet_query = r[0]
    let enemy_query = r[1]
    let rock_query = r[2]
    let border_query = r[3]

    bullet_query.forEach((b_c, b_id) => {
      let collider = system_get_collider(b_c)
      let transform = system_get_transform(b_c)

      transform.pos.add(transform.speed * cos(transform.dir), transform.speed * sin(transform.dir))

      enemy_query.forEach((e_q, _) => {
        let enemy = system_get_enemy(e_q)
        let enemy_collider = system_get_collider(e_q)
        let enemy_pos = system_get_transform(e_q)

        if (collides(collider, transform.pos, enemy_collider, enemy_pos.pos)) {
          enemy.health--
          game_controller.despawn_entity(b_id)
        }
      })

      rock_query.forEach((r_q, r_id) => {
        let rock_collider = system_get_collider(r_q)
        let rock_pos = system_get_transform(r_q)

        if (collides(collider, transform.pos, rock_collider, rock_pos.pos)) {
          game_controller.despawn_entity(r_id)
          game_controller.despawn_entity(b_id)
        }
      })

      border_query.forEach((br_q, _) => {
        let rock_collider = system_get_collider(br_q)
        let rock_pos = system_get_transform(br_q)

        if (collides(collider, transform.pos, rock_collider, rock_pos.pos)) {
          game_controller.despawn_entity(b_id)
        }
      })
    })
  }
}
