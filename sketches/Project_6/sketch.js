/** @type {GameController} */
let game_controller

/** @type {SpriteManager} */
let sprite_manager

function setup() {
  game_controller = new GameController()
  sprite_manager = new SpriteManager()
}

function draw() {
  game_controller.frame()
}
