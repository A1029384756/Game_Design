const TILE_SIZE = 20

class GameController {
  constructor() {
    this.canvas = createCanvas(400, 400)
    this.sprite_manager = new SpriteManager()
    this.sprite_manager.add_sprite('player_3', player_sprite())
    this.sprite_manager.add_sprite('player_2', player_med_sprite())
    this.sprite_manager.add_sprite('player_1', player_low_sprite())
    this.sprite_manager.add_sprite('enemy_2', enemy_sprite())
    this.sprite_manager.add_sprite('enemy_1', enemy_low_sprite())
    this.sprite_manager.add_sprite('bullet', bullet_sprite())
    this.sprite_manager.add_sprite('rock', rock_sprite())
    this.sprite_manager.add_sprite('coin', coin_sprite())
    this.sprite_manager.add_sprite('border', border_sprite())
    this.sprite_manager.add_sprite('bg', background_tile())
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
    background('tan')
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

    this.world.register_system(new RenderSprites())

    get_level().forEach((row, y) => {
      row.split('').forEach((tile, x) => {
        this.spawn_entity([
          new Sprite(this.sprite_manager.get_sprite('bg')),
          new Transform(createVector(TILE_SIZE * x, TILE_SIZE * y, -1))
        ])
        switch (tile) {
          case 'p':
            this.spawn_entity(player(TILE_SIZE * x, TILE_SIZE * y, this.sprite_manager))
            break
          case 'c':
            this.spawn_entity(coin(TILE_SIZE * x, TILE_SIZE * y, this.sprite_manager))
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

  win_game() {
    this.world = new World()

    this.world.register_system(new RenderUI())

    this.spawn_entity([
      new GameText(
        'You Win!'
      ),
      new Transform(
        createVector(200, 100)
      )
    ])

    this.spawn_entity([
      new Button(
        'Restart',
        200,
        100,
        'green',
        this.setup_game.bind(this)
      ),
      new Transform(
        createVector(200, 300)
      )
    ])
  }

  lose_game() {
    this.world = new World()

    this.world.register_system(new RenderUI())

    this.spawn_entity([
      new GameText(
        'You Lose!'
      ),
      new Transform(
        createVector(200, 100)
      )
    ])

    this.spawn_entity([
      new Button(
        'Restart',
        200,
        100,
        'red',
        this.setup_game.bind(this)
      ),
      new Transform(
        createVector(200, 300)
      )
    ])
  }
}
