class GameController {
  constructor() {
    this.canvas = createCanvas(400, 400)
    this.world = new World()

    this.setup_game()

    this.score = 0
  }

  /** @param {Component[]} components */
  spawn_entity(components) {
    this.world.spawn_entity(components)
  }

  /** @param {String} id */
  despawn_entity(id) {
    this.world.despawn_entity(id)
  }

  frame() {
    background('#70C5CD')
    fill('black')
    textAlign(CENTER, CENTER)
    textSize(30)
    text('Focus canvas to play', 200, 200)
  }

  setup_game() {
  }

  win_game() {
  }

  lose_game() {
  }
}
