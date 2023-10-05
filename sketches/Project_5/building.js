class Building extends Component {}

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

      // Move buildings and spawn new ones
      // when old ones pass left screen edge
      transform.pos.add(transform.vel)
      if (transform.pos.x < -60) {
        game_controller.despawn_entity(b_id)
        const entities = create_building_and_cannon(460)
        entities.forEach((e) => {
          game_controller.spawn_entity(e)
        })
        game_controller.score += 1
      }
    })
  }
}

/** 
 * @param {Number} x
 * @returns {Component[][]} 
 */
const create_building_and_cannon = (x) => {
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
    '#91361A'
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

  const cannon_angle = random(-2.3562, -1.7453)
  const cannon_y_vel = sqrt(-2 * GRAVITY * (buf.height + 50))

  return [
    [
      new Building(),
      new Transform(createVector(x, 400 - buf.height / 2, 0), createVector(BUILDING_X_VEL, 0)),
      new Sprite(buf.get()),
      new Collider(buf.width, buf.height)
    ],
    [
      new Cannon(createVector(cannon_y_vel / tan(PI - cannon_angle) + BUILDING_X_VEL, -cannon_y_vel)),
      new Sprite(cannon_sprite()),
      new Transform(createVector(x + 130, 400, 5), createVector(BUILDING_X_VEL, 0), cannon_angle + HALF_PI)
    ]
  ]
}
