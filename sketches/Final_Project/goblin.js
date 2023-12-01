class Goblin extends Component {
  constructor() {
    super()
    this.in_air = false
    this.attack_delay = 800
    this.attack_timer = this.attack_delay
    this.attacked = false
  }
}
class Attacking extends Component { }

class GoblinAttack extends Component {
  /** @param {Vector} dir */
  constructor(dir = createVector()) {
    super()
    /** @type {Vector} */
    this.dir = dir
  }
}

const GOBLIN_SPEED = 1.0
const GOBLIN_JUMP = -1.8

class GoblinUpdate extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Goblin(),
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    r[0].forEach((g_c, _) => {
      let goblin = system_get_goblin(g_c)
      goblin.attack_timer += deltaTime
    })
  }
}

class GoblinPhysics extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Goblin(),
        new Transform(),
        new Collider(),
        new Gravity(),
      ], [
        new Idle(),
      ]),
      new Query([
        new Ground(),
        new Transform(),
        new Collider(),
      ]),
      new Query([
        new Bridge(),
        new Transform(),
        new Collider(),
      ]),
    ]
  }


  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let goblins = r[0]
    let ground_tiles = r[1]
    let bridge_tiles = r[2]

    goblins.forEach((p_c, _) => {
      let transform = system_get_transform(p_c)
      let collider = system_get_collider(p_c)
      let goblin = system_get_goblin(p_c)

      transform.x_remainder += transform.vel.x
      transform.y_remainder += transform.vel.y
      let move_x = round(transform.x_remainder)
      let move_y = round(transform.y_remainder)

      if (move_x != 0) {
        transform.x_remainder -= move_x
        let x_sign = move_x > 0 ? 1 : -1
        while (move_x != 0) {
          if (!collide_at(
            createVector(transform.pos.x + x_sign, transform.pos.y),
            collider,
            ground_tiles,
            bridge_tiles
          )) {
            transform.pos.x += x_sign
            move_x -= x_sign
          } else {
            transform.vel.x = 0
            break
          }
        }
      }

      if (move_y != 0) {
        transform.y_remainder -= move_y
        let y_sign = move_y > 0 ? 1 : -1
        while (move_y != 0) {
          if (!collide_at(
            createVector(transform.pos.x, transform.pos.y + y_sign),
            collider,
            ground_tiles,
            bridge_tiles
          )) {
            transform.pos.y += y_sign
            move_y -= y_sign
          } else {
            transform.vel.y = 0

            if (y_sign > 0) {
              goblin.in_air = false
            }
            break
          }
        }
      }
    })
  }
}


class GoblinTakeHit extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Goblin(),
        new Transform(),
        new Collider(),
        new Sprite(),
        new Health(),
      ]),
      new Query([
        new PlayerAttack(),
        new Transform(),
        new Collider(),
        new Lifetime(),
      ]),
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    r[0].forEach((g_c, g_id) => {
      let transform = system_get_transform(g_c)
      let collider = system_get_collider(g_c)
      let health = system_get_health(g_c)

      r[1].forEach((a_c, a_id) => {
        let attack_transform = system_get_transform(a_c)
        let attack_collider = system_get_collider(a_c)
        let attack = system_get_player_attack(a_c)

        if (collides(transform.pos, collider, attack_transform.pos, attack_collider)) {
          game_controller.world.despawn_entity(a_id)
          transform.vel.add(attack.dir)
          health.health -= 1
        }

        if (health.health <= 0) {
          game_controller.world.spawn_entity([
            sprite_manager.get_sprite('Goblin_death'),
            new Lifetime(8),
            clone_object(transform),
          ])
          game_controller.world.despawn_entity(g_id)
        }
      })
    })
  }
}

class GoblinIdle extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Goblin(),
        new Transform(),
        new Sprite(),
        new Idle(),
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
    let player_transform = system_get_transform(r[1].values().next().value)

    r[0].forEach((g_c, g_id) => {
      let transform = system_get_transform(g_c)
      let sprite = system_get_sprite(g_c)
      let delta = clone_object(transform.pos).sub(player_transform.pos)
      let dist = delta.mag();

      if (dist < 50 && delta.y < 3 * TILE_SIZE) {
        game_controller.world.remove_components(g_id, [new Idle()])
        game_controller.world.add_components(g_id, [new Running()])
        update_sprite(sprite, sprite_manager.get_sprite('Goblin_run'))
        return
      }

      transform.vel.x = 0
    })
  }
}

class GoblinRun extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Goblin(),
        new Transform(),
        new Sprite(),
        new Running(),
        new Collider(),
      ]),
      new Query([
        new Player(),
        new Transform(),
      ]),
      new Query([
        new Ground(),
        new Transform(),
        new Collider(),
      ]),
      new Query([
        new Bridge(),
        new Transform(),
        new Collider(),
      ]),
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let player_transform = system_get_transform(r[1].values().next().value)

    r[0].forEach((g_c, g_id) => {
      let transform = system_get_transform(g_c)
      let collider = system_get_collider(g_c)
      let sprite = system_get_sprite(g_c)
      let goblin = system_get_goblin(g_c)
      let delta = clone_object(transform.pos).sub(player_transform.pos)
      let dist = delta.mag();

      if (abs(delta.x) < 15) {
        game_controller.world.remove_components(g_id, [new Running()])
        game_controller.world.add_components(g_id, [new Attacking()])
        goblin.attack_timer = 0
        update_sprite(sprite, sprite_manager.get_sprite('Goblin_idle'))
        return
      } else if (dist > 70) {
        game_controller.world.remove_components(g_id, [new Running()])
        game_controller.world.add_components(g_id, [new Idle()])
        update_sprite(sprite, sprite_manager.get_sprite('Goblin_idle'))
        return
      }

      transform.vel.x = min(max(round(delta.x), -1), 1) * -GOBLIN_SPEED

      if (collide_at(
        createVector(transform.pos.x + transform.vel.x, transform.pos.y),
        collider,
        r[2],
        r[3]
      ) && !goblin.in_air) {
        transform.vel.y = GOBLIN_JUMP
        goblin.in_air = true
      }
    })
  }
}

class GoblinAttacks extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Goblin(),
        new Transform(),
        new Sprite(),
        new Attacking(),
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
    let player_transform = system_get_transform(r[1].values().next().value)

    r[0].forEach((g_c, g_id) => {
      let transform = system_get_transform(g_c)
      let sprite = system_get_sprite(g_c)
      let goblin = system_get_goblin(g_c)
      let delta = clone_object(transform.pos).sub(player_transform.pos)

      if (abs(delta.x) > 17 && !goblin.attacked) {
        game_controller.world.remove_components(g_id, [new Attacking()])
        game_controller.world.add_components(g_id, [new Running()])
        update_sprite(sprite, sprite_manager.get_sprite('Goblin_run'))
        return
      }

      if (goblin.attack_timer >= goblin.attack_delay && abs(delta.y) < 16 && !goblin.attacked) {
        goblin.attack_timer = 0
        goblin.attack_delay = random(800, 2400)
        update_sprite(sprite, sprite_manager.get_sprite('Goblin_attack'))
      }

      if (sprite.sprite_name == 'Goblin_attack' && sprite.curr_frame == 6 && !goblin.attacked) {
        goblin.attacked = true
        game_controller.spawn_entity([
          new GoblinAttack(createVector(sprite.facing_right ? 1 : -1, 1)),
          new Transform(
            createVector(
              transform.pos.x + (sprite.facing_right ? 15 : -15),
              transform.pos.y,
            ),
          ),
          new Collider(15, 15),
          new Lifetime(8),
        ])
      }

      if (sprite.curr_frame == sprite.frame_count - 1) {
        goblin.attacked = false
        update_sprite(sprite, sprite_manager.get_sprite('Goblin_idle'))
      }

      transform.vel.x = 0
    })
  }
}

/** 
 * @param {Vector} pos 
 * @param {Collider} collider
 * @param {QueryResponse} ground_tiles
 * @param {QueryResponse} bridge_tiles
 */
const collide_at = (pos, collider, ground_tiles, bridge_tiles) => {
  let collide = false

  for (let [_, g_c] of ground_tiles.entries()) {
    let ground_transform = system_get_transform(g_c)
    let ground_collider = system_get_collider(g_c)
    if (collides(
      pos,
      collider,
      ground_transform.pos,
      ground_collider,
    )) {
      collide = true
      break
    }
  }

  for (let [_, b_c] of bridge_tiles.entries()) {
    let bridge_transform = system_get_transform(b_c)
    let bridge_collider = system_get_collider(b_c)

    if (collides(
      pos,
      collider,
      bridge_transform.pos,
      bridge_collider,
    )) {
      collide = true
      break
    }
  }

  return collide
}
