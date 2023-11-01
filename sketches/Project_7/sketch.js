/** @type {GameController} */
let game_controller

/** @type {Image} */
let player_sprite
/** @type {Image} */
let enemy_sprite
/** @type {Image} */
let enemy_scared_sprite
/** @type {Image} */
let pellet_sprite
/** @type {Image} */
let power_pellet_sprite
/** @type {Image} */
let wall_sprite
/** @type {Image} */
let particle_sprite

function setup() {
  player_sprite = create_player_sprite()
  enemy_sprite = create_enemy_sprite()
  enemy_scared_sprite = create_enemy_scared_sprite()
  pellet_sprite = create_pellet_sprite()
  power_pellet_sprite = create_power_pellet_sprite()
  wall_sprite = create_wall_sprite()
  particle_sprite = create_particle_sprite()
  game_controller = new GameController()
  game_controller.setup_game()
}

function draw() {
  game_controller.frame()
}
