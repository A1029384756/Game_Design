class Bullet extends Component { }
class Missile extends Component { }

const MISSILE_SPRITE_SIZE = 20
const BULLET_SPRITE_SIZE = 10

class MissileSeeking extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Missile(),
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
    let missiles = r[0]
    let players = r[1]

    missiles.forEach((m_c, _) => {
      let missile_transform = system_get_transform(m_c)

      players.forEach((p_c, _) => {
        let player_transform = system_get_transform(p_c)

        let delta = clone_object(player_transform.pos).sub(missile_transform.pos)
        missile_transform.vel = delta.setMag(3)
        missile_transform.dir = delta.heading()
      })

      if (missile_transform.vel.magSq() == 0) {
        missile_transform.vel = createVector(0, 3)
        missile_transform.dir = missile_transform.vel.heading()
      }
    })
  }
}

class MissileCollision extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Missile(),
        new Transform(),
        new Collider(),
      ]),
      new Query([
        new Bullet(),
        new Transform(),
        new Collider(),
      ]),
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let missiles = r[0]
    let bullets = r[1]

    missiles.forEach((m_c, m_id) => {
      let missile_transform = system_get_transform(m_c)
      let missile_collider = system_get_collider(m_c)

      bullets.forEach((b_c, b_id) => {
        let bullet_transform = system_get_transform(b_c)
        let bullet_collider = system_get_collider(b_c)

        if (collides(
          missile_transform.pos,
          missile_collider,
          bullet_transform.pos,
          bullet_collider
        )) {
          game_controller.spawn_entity([
            new Explosion(),
            new Lifetime(10),
            new Transform(
              clone_object(bullet_transform.pos),
            )
          ])
          game_controller.despawn_entity(m_id)
          game_controller.despawn_entity(b_id)
        }
      })
    })
  }
}

class MissileTrail extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Missile(),
        new Transform(),
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let missiles = r[0]

    missiles.forEach((m_c, _) => {
      let missile_transform = system_get_transform(m_c)

      let vel = /** @type {Vector} */ (clone_object(missile_transform.vel))
      vel.setMag(random(0.5, 1)).mult(-1)

      game_controller.spawn_entity([
        new Particle(),
        new Lifetime(30),
        new Transform(
          createVector(
            missile_transform.pos.x,
            missile_transform.pos.y,
            -1
          ),
          vel,
        ),
        clone_object(sprite_manager.get_sprite('missile_particle')),
      ])
    })
  }
}
