let game_controller 

function setup () {
  createCanvas(windowWidth, windowHeight)
  game_controller = new GameController()
}

function draw () {
  game_controller.frame()
}
