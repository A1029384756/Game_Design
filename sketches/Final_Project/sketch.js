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
    sprite_manager.add_sprite('player_idle', img, 10)
  })
  loadImage('/libraries/player_run.png', (img) => {
    sprite_manager.add_sprite('player_run', img, 8)
  })
  loadImage('/libraries/player_jump.png', (img) => {
    sprite_manager.add_sprite('player_jump', img, 3)
  })
  loadImage('/libraries/player_fall.png', (img) => {
    sprite_manager.add_sprite('player_fall', img, 6)
  })
  loadImage('/libraries/player_land.png', (img) => {
    sprite_manager.add_sprite('player_land', img, 9)
  })
  loadImage('/libraries/player_roll.png', (img) => {
    sprite_manager.add_sprite('player_roll', img, 7)
  })
  loadImage('/libraries/player_jab.png', (img) => {
    sprite_manager.add_sprite('player_jab', img, 8)
  })
  loadImage('/libraries/player_uppercut.png', (img) => {
    sprite_manager.add_sprite('player_uppercut', img, 8)
  })

  loadImage('/libraries/Goblin_attack.png', (img) => {
    sprite_manager.add_sprite('Goblin_attack', img, 8)
  })
  loadImage('/libraries/Goblin_damaged.png', (img) => {
    sprite_manager.add_sprite('Goblin_damaged', img, 4)
  })
  loadImage('/libraries/Goblin_death.png', (img) => {
    sprite_manager.add_sprite('Goblin_death', img, 4)
  })
  loadImage('/libraries/Goblin_idle.png', (img) => {
    sprite_manager.add_sprite('Goblin_idle', img, 4)
  })
  loadImage('/libraries/Goblin_run.png', (img) => {
    sprite_manager.add_sprite('Goblin_run', img, 8)
  })

  loadImage('/libraries/title_card.png', (img) => {
    sprite_manager.add_sprite('title_card', img, 1)
  })
  loadImage('/libraries/play_button.png', (img) => {
    sprite_manager.add_sprite('play_button', img, 2)
  })
  loadImage('/libraries/tutor_button.png', (img) => {
    sprite_manager.add_sprite('tutor_button', img, 2)
  })
  loadImage('/libraries/back_button.png', (img) => {
    sprite_manager.add_sprite('back_button', img, 2)
  })
  loadImage('/libraries/tutorial_screen.png', (img) => {
    sprite_manager.add_sprite('tutorial_screen', img, 1)
  })

  let img = createGraphics(CANVAS_WIDTH + 10, CANVAS_HEIGHT + 10)
  img.background(BACKGROUND_COLOR)
  sprite_manager.add_sprite('background', img)

  levels = /** @type {Level[]} */ (loadJSON('/libraries/levels.json'))
}

function setup() {
  // @ts-ignore
  levels = Object.values(levels)
  game_controller = new GameController()
  game_controller.setup_game()
}

function draw() {
  game_controller.frame()
}
