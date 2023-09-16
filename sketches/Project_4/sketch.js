/** @type {GameController} */
let game_controller

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
