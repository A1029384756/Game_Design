const CANVAS_WIDTH = 160
const CANVAS_HEIGHT = 160

const PANE_WIDTH = 800
const PANE_HEIGHT = 800

const BACKGROUND_COLOR = '#171C39'

class GameController {
  constructor() {
    /** @type {Renderer} */
    this.canvas = createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight), WEBGL)
    this.canvas.style('display', 'block');

    /** @type {Graphics} */
    this.game_buffer = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT)
    /** @type {Graphics} */
    this.ui_buffer = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT)
    this.world = new World()

    this.setup_game()

    this.score = 0
    this.size = min(windowWidth, windowHeight)
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
    if (min(windowWidth, windowHeight) !== this.size) {
      this.size = min(windowWidth, windowHeight)
      resizeCanvas(this.size, this.size)
    }
    this.world.update()
    // @ts-ignore
    let game_texture = this.canvas.getTexture(this.game_buffer)
    game_texture.setInterpolation(NEAREST, NEAREST)
    image(game_texture, -this.size / 2, -this.size / 2, this.size, this.size)

    // @ts-ignore
    let ui_texture = this.canvas.getTexture(this.ui_buffer)
    ui_texture.setInterpolation(NEAREST, NEAREST)
    image(ui_texture, -this.size / 2, -this.size / 2, this.size, this.size)

    this.game_buffer.clear(0, 0, 0, 0)
    this.ui_buffer.clear(0, 0, 0, 0)
  }

  setup_game() {
    this.world = new World()

    this.world.register_system(new PlayerRun())
    this.world.register_system(new PlayerIdle())

    this.world.register_system(new PlayerMovement())

    this.world.register_system(new AnimateFacing())
    this.world.register_system(new AnimateSprites())

    this.world.register_system(new ParticleFadeOut())
    this.world.register_system(new LifetimeManagement())

    this.world.register_system(new VelocityMovement())
    this.world.register_system(new ApplyGravity())

    this.world.register_system(new PlayerPhysics())
    this.world.register_system(new RenderSprites())
    this.world.register_system(new RenderUI())

    this.spawn_entity([
      sprite_manager.get_sprite('background'),
      new Transform(createVector(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, -Infinity)),
    ])

    get_serialized_level(0, 0, 0).forEach((bundle) => {
      this.spawn_entity(bundle)
    })

    this.spawn_entity([
      sprite_manager.get_sprite('player_idle'),
      new Player(),
      new Transform(createVector(76, 75)),
      new Gravity(),
      new Collider(
        8, 12 
      ),
      new Idle(),
    ])
  }

  win_game() {
  }

  lose_game() {
  }
}
