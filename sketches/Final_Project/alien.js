class Alien extends Component { }
class AlienTrail extends Component { }

const ALIEN_SPRITE_SIZE = 35

class AlienMovement extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Alien(),
        new Transform(),
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let aliens = r[0]

    let leftmost = CANVAS_WIDTH
    let rightmost = 0
    aliens.forEach((a_c, _) => {
      let transform = system_get_transform(a_c)
      if (transform.pos.x < leftmost) {
        leftmost = transform.pos.x
      } else if (transform.pos.x > rightmost) {
        rightmost = transform.pos.x
      }
    })

    if (
      leftmost < ALIEN_SPRITE_SIZE / 2 ||
      rightmost > CANVAS_WIDTH - ALIEN_SPRITE_SIZE / 2
    ) {
      aliens.forEach((a_c, _) => {
        let transform = system_get_transform(a_c)
        transform.vel.x *= -1
      })
    }
  }
}

class AlienCollision extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Alien(),
        new Health(),
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
    let aliens = r[0]
    let bullets = r[1]

    aliens.forEach((a_c, a_id) => {
      let alien_transform = system_get_transform(a_c)
      let alien_collider = system_get_collider(a_c)
      let alien_health = system_get_health(a_c)

      bullets.forEach((b_c, b_id) => {
        let bullet_transform = system_get_transform(b_c)
        let bullet_collider = system_get_collider(b_c)

        if (collides(
          alien_transform.pos,
          alien_collider,
          bullet_transform.pos,
          bullet_collider
        )) {
          alien_health.health -= 1
          game_controller.despawn_entity(b_id)

          if (alien_health.health == 1) {
            game_controller.spawn_entity([
              new Missile(),
              new Lifetime(500),
              new Transform(
                createVector(
                  alien_transform.pos.x,
                  alien_transform.pos.y + ALIEN_SPRITE_SIZE / 2,
                ),
                createVector(),
                -0.5,
              ),
              new Collider(MISSILE_SPRITE_SIZE, MISSILE_SPRITE_SIZE),
              sprite_manager.get_sprite('missile'),
            ])
          }
        }
      })

      if (alien_health.health <= 0) {
        game_controller.spawn_entity([
          new AlienTrail(),
          new Transform(
            clone_object(alien_transform.pos),
            createVector(alien_transform.vel.x, 2),
          )
        ])
        game_controller.despawn_entity(a_id)
      }
    })
  }
}

class AlienAshTrail extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new AlienTrail(),
        new Transform(),
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let trails = r[0]

    trails.forEach((t_c, t_id) => {
      let trail_transform = system_get_transform(t_c)
      game_controller.spawn_entity([
        new Particle(),
        new Lifetime(240),
        new Transform(
          clone_object(trail_transform.pos),
          createVector(trail_transform.vel.x + random(-0.3, 0.3), random(0.25, 0.35)),
        ),
        clone_object(sprite_manager.get_sprite('missile_particle')),
      ])

      if (trail_transform.pos.y > CANVAS_HEIGHT) {
        game_controller.despawn_entity(t_id)
      }
    })
  }
}
