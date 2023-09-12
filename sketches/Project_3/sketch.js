/** @type {GameController} */
let game_controller

const player_sprite = () => {
  let buf = createGraphics(20, 20)
  buf.fill('yellow')
  buf.circle(10, 10, 20)
  return buf.get(0, 0, buf.width, buf.height)
}

const enemy_sprite = () => {
  let buf = createGraphics(20, 20)
  buf.fill('red')
  buf.rect(0, 0, 20)
  return buf.get(0, 0, buf.width, buf.height)
}

/** @type {p5.Element} */
let framerate
/** @type {p5.Element} */
let entity_count 

function setup() {
  game_controller = new GameController()
  framerate = createDiv()
  entity_count = createDiv()
}

function draw() {
  game_controller.frame()
}
