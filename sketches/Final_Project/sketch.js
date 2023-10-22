/** @type {GameController} */
let game_controller
/** @type {SpriteManager} */
let sprite_manager

/** @type {Level[]} */
let levels
const TILE_SIZE = 8

function preload() {
  sprite_manager = new SpriteManager()
  let tiles = /** @type {Image[]} */ ([])
  loadImage('/libraries/cavernas.png', (img) => {
    for (let y = 0; y < img.height; y += TILE_SIZE) {
      for (let x = 0; x < img.width; x += TILE_SIZE) {
        tiles.push(img.get(x, y, TILE_SIZE, TILE_SIZE))
      }
    }
  })
  sprite_manager.add_spritesheet('tilemap', tiles)

  loadImage('/libraries/player_idle.png', (img) => {
    img.resize(img.width / 3, img.height / 3)
    sprite_manager.add_sprite('player_idle', img, 10)
  })
  loadImage('/libraries/player_run.png', (img) => {
    img.resize(img.width / 3, img.height / 3)
    sprite_manager.add_sprite('player_run', img, 8)
  })
  loadImage('/libraries/player_jump.png', (img) => {
    img.resize(img.width / 3, img.height / 3)
    sprite_manager.add_sprite('player_jump', img, 3)
  })
  loadImage('/libraries/player_fall.png', (img) => {
    img.resize(img.width / 3, img.height / 3)
    sprite_manager.add_sprite('player_fall', img, 6)
  })
  loadImage('/libraries/player_land.png', (img) => {
    img.resize(img.width / 3, img.height / 3)
    sprite_manager.add_sprite('player_land', img, 9)
  })

  let img = createGraphics(CANVAS_WIDTH + 10, CANVAS_HEIGHT + 10)
  img.background(BACKGROUND_COLOR)
  sprite_manager.add_sprite('background', img)

  levels = /** @type {Level[]} */ (loadJSON('/libraries/levels.json'))
}

function setup() {
  game_controller = new GameController()
}

function draw() {
  game_controller.frame()
}
