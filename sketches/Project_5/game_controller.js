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
    background('#70C5CD')
    if (focused) {
      this.world.update()
    } else {
      fill('black')
      textAlign(CENTER, CENTER)
      textSize(30)
      text('Focus canvas to play', 200, 200)
    }
  }

  setup_game() {
    this.world = new World()

    this.world.register_system(new PlayerControl())
    this.world.register_system(new PlayerCollision())
    this.world.register_system(new PlayerAnimation())

    this.world.register_system(new BuildingLifecycle())

    this.world.register_system(new CannonBehavior())
    this.world.register_system(new BallAnimation())
    this.world.register_system(new BallCollision())

    this.world.register_system(new BirdBuildingBehavior())
    this.world.register_system(new BirdDefaultBehavior())
    this.world.register_system(new BirdMonsterBehavior())
    this.world.register_system(new BirdBorderBehavior())
    this.world.register_system(new BirdBallBehavior())
    this.world.register_system(new BirdCollision())
    this.world.register_system(new BirdAnimation())
    
    this.world.register_system(new ScoreBoard())
    this.world.register_system(new ApplyGravity())
    this.world.register_system(new RenderSprites())
    this.world.register_system(new RenderUI())

    this.spawn_entity([
      new Player(),
      new Sprite(player_sprite(), 2),
      new Transform(createVector(200, 10, 2)),
      new Gravity(createVector(0, 1)),
      new Collider(20, 20)
    ])

    this.spawn_entity([
      new Bird(),
      new Sprite(bird_sprite(), 2),
      new Transform(createVector(75, 200, 1)),
      new Gravity(createVector(0, -1)),
      new BirdDefault(),
      new Collider(30, 30),
      new Sensor(60, 60)
    ])

    this.spawn_entity([
      new Score(),
      new GameText(),
      new Transform(createVector(300, 50))
    ])

    {
      const entities = create_building_and_cannon(660)
      entities.forEach((e) => {
        this.spawn_entity(e)
      })
    }
    {
      const entities = create_building_and_cannon(400)
      entities.forEach((e) => {
        this.spawn_entity(e)
      })
    }
  }

  win_game() {
    this.world = new World()

    this.world.register_system(new RenderUI())

    this.spawn_entity([
      new GameText(
        `You Win!\nYour score: ${this.score}`
      ),
      new Transform(
        createVector(200, 100)
      )
    ])

    this.spawn_entity([
      new Button(
        'Restart',
        500,
        500,
        'green',
        this.setup_game.bind(this)
      ),
      new Transform(
        createVector(200, 200)
      )
    ])

    this.score = 0
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
        500,
        500,
        'red',
        this.setup_game.bind(this)
      ),
      new Transform(
        createVector(200, 200)
      )
    ])

    this.score = 0
  }
}
