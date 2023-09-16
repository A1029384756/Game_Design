class GameController {
  constructor() {
    this.canvas = createCanvas(400, 400)
    this.world = new World()
    this.sprite_manager = new SpriteManager()
    this.sprite_manager.add_sprite('player', player_sprite())
    this.sprite_manager.add_sprite('bullet', bullet_sprite())

    this.world.register_system(new Render())
    this.world.register_system(new PlayerControl())
    this.world.register_system(new Shoot())
    this.world.register_system(new BulletDynamics())

    this.world.spawn_entity(
      [
        new Camera(),
        new Player(),
        new Sprite(this.sprite_manager.get_sprite('player')),
        new Transform(createVector(200, 200, 1)),
        new Gun(new Timer(500))
      ]
    )
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
    background('black')
    this.world.update()
  }
}
