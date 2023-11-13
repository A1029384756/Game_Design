/** @type {GameController} */
let game_controller
let sprite_manager

function setup() {
  game_controller = new GameController()
}

function draw() {
  game_controller.frame()
}
