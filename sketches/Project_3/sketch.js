/** @type {GameController} */
let game_controller

function setup () {
  game_controller = new GameController()
}

function draw () {
  game_controller.update()
  game_controller.draw()
}
