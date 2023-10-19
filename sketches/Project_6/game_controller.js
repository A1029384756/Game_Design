const CANVAS_WIDTH = 400
const CANVAS_HEIGHT = 400

class GameController {
  constructor() {
    /** @type {Renderer} */
    this.canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL)
    /** @type {Graphics} */
    this.game_buffer = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL)
    /** @type {Graphics} */
    this.ui_buffer = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT)
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
    this.world.update()
    image(this.game_buffer, -CANVAS_WIDTH / 2, -CANVAS_HEIGHT / 2)
    image(this.ui_buffer, -CANVAS_WIDTH / 2, -CANVAS_HEIGHT / 2)
    this.game_buffer.clear(0, 0, 0, 0)
    this.ui_buffer.clear(0, 0, 0, 0)
  }

  setup_game() {
    this.world = new World()
    this.world.register_system(new PlayerControl())
    this.world.register_system(new PlayerCollision())
    this.world.register_system(new PlayerVictory())

    this.world.register_system(new AlienMovement())
    this.world.register_system(new AlienCollision())
    this.world.register_system(new AlienAshTrail())

    this.world.register_system(new MissileSeeking())
    this.world.register_system(new MissileCollision())
    this.world.register_system(new MissileTrail())

    this.world.register_system(new ExplosionManagement())
    this.world.register_system(new ParticleFadeOut())

    this.world.register_system(new LifetimeManagement())
    this.world.register_system(new VelocityMovement())

    this.world.register_system(new RenderSprites())
    this.world.register_system(new RenderUI())

    this.spawn_entity([
      sprite_manager.get_sprite('background'),
      new Transform(
        createVector(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, -Infinity)
      )
    ])

    for (let y = 0; y < 3; y += 1) {
      for (let x = 0; x < 5; x += 1) {
        this.spawn_entity([
          new Alien(),
          new Health(2),
          new Transform(
            createVector(
              ALIEN_SPRITE_SIZE * x + 5 * x + 50,
              ALIEN_SPRITE_SIZE * y + 5 * y + 50,
            ),
            createVector(1, 0),
          ),
          new Collider(ALIEN_SPRITE_SIZE, ALIEN_SPRITE_SIZE),
          sprite_manager.get_sprite('alien')
        ])
      }
    }

    this.spawn_entity([
      new Player(),
      new Transform(
        createVector(
          this.canvas.width / 2,
          this.canvas.height - PLAYER_SPRITE_SIZE,
        )
      ),
      new Collider(PLAYER_SPRITE_SIZE, PLAYER_SPRITE_SIZE),
      sprite_manager.get_sprite('player')
    ])
  }

  win_game() {
    console.log('win')
    this.world.deregister_system('PlayerVictory')
    this.spawn_entity([
      new GameText('You Win!', 30, [255, 255, 255]),
      new Transform(createVector(200, 100)),
    ])
    this.spawn_entity([
      new Button(
        sprite_manager.get_sprite('restart_button').imgs[0],
      ),
      new Transform(
        createVector(200, 300),
      )
    ])
  }

  lose_game() {
    console.log('lose')
    this.world.deregister_system('PlayerVictory')
    this.spawn_entity([
      new GameText('You Lose!', 30, [255, 255, 255]),
      new Transform(createVector(200, 100)),
    ])
    this.spawn_entity([
      new Button(
        sprite_manager.get_sprite('restart_button').imgs[0],
        this.setup_game.bind(this),
      ),
      new Transform(
        createVector(200, 300),
      )
    ])
  }
}
