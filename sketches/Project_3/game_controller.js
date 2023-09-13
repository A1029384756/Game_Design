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
    this.world.register_system(new Collision())
    this.world.register_system(new Movement())

    for (let i = 0; i < 3000; i++) {
      this.world.spawn_entity(
        [
          new Enemy(),
          new Sprite(this.sprite_manager.get_sprite('player')),
          new Transform(createVector(Math.floor((i * 20) % 400), Math.floor(i % 400), 0)),
          new Collider(10)
        ]
      )
    }

    this.world.spawn_entity(
      [
        new Player(),
        new Sprite(this.sprite_manager.get_sprite('enemy')),
        new Transform(createVector(200, 200, 1)),
        new Collider(10)
      ]
    )

    this.frametimes = []
    this.timer = 0
  }

  /** @param {String} id */
  despawn_entity(id) {
    this.world.despawn_entity(id)
  }

  frame() {
    background('black')
    this.world.update()

    if (this.timer > 1000) {
      this.timer = 0
      let rate = this.frametimes.reduce((a, b) => a + b) / this.frametimes.length
      framerate.html(`Framerate: ${Math.round(rate)}`)
      entity_count.html(`Entity Count: ${this.world.component_registry.entity_count}`)
      this.frametimes = []

      this.world.spawn_entity(
        [
          new Enemy(),
          new Sprite(this.sprite_manager.get_sprite('player')),
          new Transform(createVector(200, 200)),
          new Collider(10)
        ]
      )
    }
    this.frametimes.push(Math.round((1/deltaTime) * 1000))
    this.timer += deltaTime
  }
}
