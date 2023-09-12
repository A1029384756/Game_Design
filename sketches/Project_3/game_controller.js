class GameController {
  constructor() {
    this.world = new World()
    this.sprite_manager = new SpriteManager()

    this.world.register_system(new Render())
  }

  frame() {
    this.world.update()
  }
}
