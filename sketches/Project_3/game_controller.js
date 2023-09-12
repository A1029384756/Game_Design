class GameController {
  constructor() {
    this.canvas = createCanvas(400, 400)
    this.world = new World()
    this.sprite_manager = new SpriteManager()
    this.sprite_manager.add_sprite('player', player_sprite())
    this.sprite_manager.add_sprite('enemy', enemy_sprite())

    this.world.register_system(new Render())
    this.world.register_system(new Gravity())
    this.world.register_system(new Wrapping())

    for (let i = 0; i < 9000; i++) {
      this.world.spawn_entity(
        [
          new Player(),
          new Sprite(this.sprite_manager.get_sprite('player')),
          new Transform(createVector((i * 20) % 400, 200 + i))
        ]
      )
    }

    this.world.spawn_entity(
      [
        new Sprite(this.sprite_manager.get_sprite('enemy')),
        new Transform(createVector(200, 200))
      ]
    )

    this.frametimes = []
    this.time = 0
  }

  frame() {
    background('black')
    this.world.update()
    fill('white')
    textSize(30)
    textAlign(CENTER, CENTER)
    text(Math.round((1/deltaTime) * 1000), 100, 100)
    text(this.world.component_registry.entity_count, 100, 200)

    if (this.time > 5000) {
      this.time = 0
      let rate = this.frametimes.reduce((a, b) => a + b) / this.frametimes.length
      console.log(rate)
      this.frametimes = []
    } 

    this.time += deltaTime
    this.frametimes.push(Math.round((1/deltaTime) * 1000))
  }
}
