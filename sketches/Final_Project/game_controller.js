const CANVAS_WIDTH = 200
const CANVAS_HEIGHT = 200

const PANE_WIDTH = 800
const PANE_HEIGHT = 800

class GameController {
  constructor() {
    /** @type {Renderer} */
    this.canvas = createCanvas(PANE_WIDTH, PANE_HEIGHT, WEBGL)

    /** @type {Graphics} */
    this.game_buffer = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT)
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
    // @ts-ignore
    let game_texture = this.canvas.getTexture(this.game_buffer)
    game_texture.setInterpolation(NEAREST, NEAREST)
    image(game_texture, -PANE_WIDTH / 2, -PANE_HEIGHT / 2, PANE_WIDTH, PANE_HEIGHT)

    // @ts-ignore
    let ui_texture = this.canvas.getTexture(this.ui_buffer)
    ui_texture.setInterpolation(NEAREST, NEAREST)
    image(ui_texture, -PANE_WIDTH / 2, -PANE_HEIGHT / 2, PANE_WIDTH, PANE_HEIGHT)

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

    for (let y = 0; y < 1; y += 1) {
      for (let x = 0; x < 2; x += 1) {
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
          CANVAS_WIDTH / 2,
          CANVAS_HEIGHT - PLAYER_SPRITE_SIZE,
        )
      ),
      new Collider(PLAYER_SPRITE_SIZE, PLAYER_SPRITE_SIZE),
      sprite_manager.get_sprite('player')
    ])
  }

  win_game() {
    this.world.deregister_system('PlayerVictory')
    this.spawn_entity([
      new GameText('You Win!\nPlay again?', 15, [255, 255, 255]),
      new Transform(createVector(100, 50)),
    ])
    this.spawn_entity([
      new Button(
        sprite_manager.get_sprite('restart_button').imgs[0],
        this.setup_game.bind(this),
      ),
      new Transform(
        createVector(100, 125),
      )
    ])
  }

  lose_game() {
    this.world.deregister_system('PlayerVictory')
    this.spawn_entity([
      new GameText('You Lose!\nPlay again?', 15, [255, 255, 255]),
      new Transform(createVector(100, 50)),
    ])
    this.spawn_entity([
      new Button(
        sprite_manager.get_sprite('restart_button').imgs[0],
        this.setup_game.bind(this),
      ),
      new Transform(
        createVector(100, 125),
      )
    ])
  }
}
