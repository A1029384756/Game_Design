const TILE_SIZE = 20

class GameController {
  constructor() {
    this.canvas = createCanvas(400, 400)
    this.sprite_manager = new SpriteManager()
    this.sprite_manager.add_sprite('player', player_sprite())
    this.sprite_manager.add_sprite('enemy', enemy_sprite())
    this.sprite_manager.add_sprite('bullet', bullet_sprite())
    this.sprite_manager.add_sprite('rock', rock_sprite())
    this.setup_game()
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

  setup_game() {
    this.world = new World()

    this.world.register_system(new Shoot())
    this.world.register_system(new PlayerLogic())
    this.world.register_system(new PlayerControl())
    this.world.register_system(new PlayerCollision())

    this.world.register_system(new EnemyBehavior())
    this.world.register_system(new BulletDynamics())

    this.world.register_system(new Render())

    get_level().forEach((row, y) => {
      row.split('').forEach((tile, x) => {
        switch (tile) {
          case 'p':
            this.spawn_entity(player(TILE_SIZE * x, TILE_SIZE * y, this.sprite_manager))
            break
          case 'c':
            break
          case 'e':
            this.spawn_entity(enemy(TILE_SIZE * x, TILE_SIZE * y, this.sprite_manager))
            break
          case 'r':
            this.spawn_entity(rock(TILE_SIZE * x, TILE_SIZE * y, this.sprite_manager))
            break
          case 'b':
            this.spawn_entity(border(TILE_SIZE * x, TILE_SIZE * y, this.sprite_manager))
        }
      })
    })
  }

  end_game() {
    this.world = new World()
  }
}
