const CANVAS_WIDTH = 400
const CANVAS_HEIGHT = 400

class GameController {
  constructor() {
    /** @type {Renderer} */
    this.canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    /** @type {Graphics} */
    this.game_buffer = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT)
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
    game_controller.game_buffer.background('gray')
    this.world.update()
    image(this.game_buffer, 0, 0)
  }

  setup_game() {
    this.world = new World()
    this.world.register_system(new RotateMesh())
    this.world.register_system(new MeshWireframe())
    this.world.register_system(new MeshSolid())
    this.world.register_system(new RenderMeshes())
    this.world.register_system(new RenderWireFrames())

    this.world.spawn_entity([
      new Transform(createVector(1, 0, 3), createVector(0, 0.214, 0)),
      new Mesh(lego(), [187, 182, 12]),
    ])

    this.world.spawn_entity([
      new Transform(createVector(-2, 1.5, 0), createVector(0, HALF_PI, PI / 8)),
      new Mesh(lego(), [155, 18, 203]),
    ])

    this.world.spawn_entity([
      new Transform(createVector(0, 0, 4.6), createVector(0, 0.978, 0)),
      new Mesh(lego(), [230, 100, 87]),
    ])

    this.world.spawn_entity([
      new Transform(createVector(0, 0, 0)),
      new Mesh(lego(), [17, 190, 223]) 
    ])


    this.world.spawn_entity([
      new Transform(createVector(0, 0, -15)),
      new Camera(),
    ])
  }
}
