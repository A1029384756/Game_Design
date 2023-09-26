class BuildingLifecycle extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Building(),
        new Transform()
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let building_query = r[0]

    building_query.forEach((b_c, b_id) => {
      let transform = system_get_transform(b_c)

      transform.pos.x -= BUILDING_ENEMY_VEL
      if (transform.pos.x < -60) {
        game_controller.despawn_entity(b_id)
        let [building, enemy] = create_building_and_enemy(460)
        game_controller.spawn_entity(building)
        game_controller.spawn_entity(enemy)
        game_controller.score++;
      }
    })
  }
}

/** 
 * @param {Number} x
 * @returns {[Component[], Component[]]} 
 */
const create_building_and_enemy = (x) => {
  const BUILDING_WIDTH = 60
  const BUILDING_MIN_HEIGHT = 50
  const BUILDING_MAX_HEIGHT = 250

  /** @type {Graphics} */
  let buf = createGraphics(BUILDING_WIDTH, random(BUILDING_MIN_HEIGHT, BUILDING_MAX_HEIGHT))
  buf.fill(color(random(255), random(255), random(255)))
  buf.rect(0, 0, buf.width, buf.height)

  return [
    [
    new Building(),
    new Transform(createVector(x, 400 - buf.height / 2, 0)),
    new Sprite(buf.get()),
    new Collider(buf.width, buf.height)
    ],
    [
      new Enemy(340 - buf.height),
      new Sprite(player_sprite()),
      new Transform(createVector(x, 0)),
      new Collider(20, 20)
    ]
  ]
}
