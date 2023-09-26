const TILE_SIZE = 20

class GameController {
  constructor() {
    this.canvas = createCanvas(400, 400)
    this.sprite_manager = new SpriteManager()
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
    background('cyan')
    this.world.update()
  }

  setup_game() {
    this.world = new World()

    this.world.register_system(new PlayerControl())
    this.world.register_system(new PlayerCollision())
    this.world.register_system(new BuildingLifecycle())
    this.world.register_system(new ScoreBoard())
    this.world.register_system(new EnemyBehavior())
    this.world.register_system(new RenderSprites())
    this.world.register_system(new RenderUI())

    this.spawn_entity([
      new Player(),
      new Transform(createVector(50, 200, 1)),
      new Sprite(player_sprite()),
      new Collider(30, 30)
    ])

    this.spawn_entity([
      new Score(),
      new GameText(),
      new Transform(createVector(300, 50))
    ])

    {
      const [building, enemy] = create_building_and_enemy(660)
      this.spawn_entity(building)
      this.spawn_entity(enemy)
    }

    {
      const [building, enemy] = create_building_and_enemy(400)
      this.spawn_entity(building)
      this.spawn_entity(enemy)
    }
  }

  lose_game() {
    this.world = new World()

    this.world.register_system(new RenderUI())

    this.spawn_entity([
      new GameText(
        `Game Over!\nYour score: ${this.score}`
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

    this.score = 0
  }
}
