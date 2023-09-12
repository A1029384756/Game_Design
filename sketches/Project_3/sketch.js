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

function setup() {
  game_controller = new GameController()
}

function draw() {
  game_controller.frame()
}
