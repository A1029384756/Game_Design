const CANVAS_WIDTH = 400
const CANVAS_HEIGHT = 400

class GameController {
  constructor() {
    /** @type {Renderer} */
    this.canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    /** @type {Graphics} */
    this.game_buffer = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT)
    /** @type {Graphics} */
    this.ui_buffer = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT)

    this.world = new World()
    this.navmap = new NavMap()

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
    image(this.game_buffer, 0, 0)
    image(this.ui_buffer, 0, 0)
    this.game_buffer.clear(0, 0, 0, 0)
    this.ui_buffer.clear(0, 0, 0, 0)
  }

  setup_game() {
    this.world = new World()
    this.world.register_system(new PlayerControl())
    this.world.register_system(new PlayerCollision())
    this.world.register_system(new PlayerVictory())

    this.world.register_system(new EnemyFear())
    this.world.register_system(new EnemyPathing())

    this.world.register_system(new ExplosionManagement())
    this.world.register_system(new ExplosionMovement())
    this.world.register_system(new ParticleFadeOut())

    this.world.register_system(new LifetimeManagement())
    this.world.register_system(new EntityMovement())

    this.world.register_system(new RenderSprites())
    this.world.register_system(new RenderUI())

    this.spawn_entity([
      new Sprite([background_image()]),
      new Transform(
        createVector(190, 190, -Infinity)
      )
    ])

    create_level().forEach((bundle) => {
      this.spawn_entity(bundle)
    })
  }

  win_game() {
    this.world.deregister_system('PlayerVictory')
    this.spawn_entity([
      new GameText('You Win!\n\nClick anywhere\nto play again', 30, [255, 255, 255]),
      new Transform(createVector(200, 100)),
    ])
    this.spawn_entity([
      new Button(
        restart_button_sprite(),
        this.setup_game.bind(this),
      ),
      new Transform(
        createVector(200, 200),
      )
    ])
  }

  lose_game() {
    this.world.deregister_system('PlayerVictory')
    this.spawn_entity([
      new GameText('You Lose!\n\nClick anywhere\nto play again', 30, [255, 255, 255]),
      new Transform(createVector(200, 100)),
    ])
    this.spawn_entity([
      new Button(
        restart_button_sprite(),
        this.setup_game.bind(this),
      ),
      new Transform(
        createVector(200, 200),
      )
    ])
  }
}

class NavCell {
  /** @param {Vector} pos */
  constructor(pos) {
    this.pos = pos
    this.adjacent = /** @type {Vector[]} */ ([])
  }

  /** @param {Vector} loc */
  push(loc) {
    this.adjacent.push(loc)
  }
}

class NavMap {
  constructor() {
    this.items = /** @type {NavCell[]} */ ([])
  }

  /**
  * @param {Vector} pos
  * @returns {NavCell}
  */
  get(pos) {
    return this.items.find(item => item.pos.equals(pos))
  }
}
