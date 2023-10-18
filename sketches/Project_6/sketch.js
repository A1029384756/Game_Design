/** @type {GameController} */
let game_controller
/** @type {SpriteManager} */
let sprite_manager

function setup() {
  sprite_manager = new SpriteManager()
  sprite_manager.add_sprite('player', player_sprite())
  sprite_manager.add_sprite('alien', alien_sprite())
  sprite_manager.add_sprite('missile', missile_sprite())
  sprite_manager.add_sprite('bullet', bullet_sprite())
  sprite_manager.add_sprite('missile_particle', missile_particle_sprite())
  sprite_manager.add_sprite('restart_button', restart_button_sprite())
  sprite_manager.add_sprite('background', background_image())

  game_controller = new GameController()
}

function draw() {
  game_controller.frame()
}
