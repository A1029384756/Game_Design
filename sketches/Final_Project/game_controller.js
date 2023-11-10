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

    this.loading_world = new World()
    this.game_world = new World()
    this.menu_world = new World()
    this.option_world = new World()

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

  /** 
   * @param {Query} query
   * @returns {QueryResponse}
  */
  query_world(query) {
    let selected_components = query.components.map(c => this.world.registry.registry.get(c.name)).filter(c => c !== undefined)

    let entities = /** @type {Entity[]} */ (selected_components.reduce((accum, id) => [...accum, ...id.keys()], []))

    let result = new Map()
    entities.forEach(e => {
      let components = []
      for (let i = 0; i < selected_components.length; i++) {
        if (selected_components[i].has(e)) {
          components.push(selected_components[i].get(e))
        } else {
          return
        }
      }
      result.set(e, components)
    })

    return result
  }

  frame() {
    clear(0, 0, 0, 0)
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
    loading_screen(start_screen, new LoadingLevel())
  }

  win_game() {
  }

  lose_game() {
  }
}
