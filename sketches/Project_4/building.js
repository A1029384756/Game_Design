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
  const BUILDING_COLORS = [
    '#BC6D50',
    '#8E3215',
    '#9E440B',
    '#B74315',
    '#854C3B',
    '#6B3F37',
    '#91361A',
  ]

  /** @type {Graphics} */
  let buf = createGraphics(BUILDING_WIDTH, random(BUILDING_MIN_HEIGHT, BUILDING_MAX_HEIGHT))
  buf.fill(BUILDING_COLORS[floor(random(BUILDING_COLORS.length))])
  buf.rect(0, 0, buf.width, buf.height)
  buf.fill('#DBB177')
  buf.rect(0, 0, buf.width, 5)

  for (let x = 15; x < 45; x += 15) {
    for (let y = 15; y < buf.height; y += 30) {
      if (random() > 0.5) {
        buf.image(window_sprite(), x, y)
      }
    }
  }

  return [
    [
    new Building(),
    new Transform(createVector(x, 400 - buf.height / 2, 0)),
    new Sprite(buf.get()),
    new Collider(buf.width, buf.height)
    ],
    [
      new Enemy(340 - buf.height),
      new Sprite(enemy_sprite(), 2),
      new Transform(createVector(x, 0)),
      new Collider(20, 20)
    ]
  ]
}
