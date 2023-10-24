const start_screen = () => {
  game_controller.world = game_controller.menu_world

  if (game_controller.world.registry.entity_count > 0) {
    return
  }

  player_animation_plugin(game_controller.world)
  render_plugin(game_controller.world)

  game_controller.spawn_entity([
    new Camera(),
    new Transform(createVector(76, 75)),
  ])

  game_controller.spawn_entity([
    new Background(),
    sprite_manager.get_sprite('background'),
    new Transform(createVector(150, 75, -Infinity)),
  ])

  game_controller.spawn_entity([
    clone_object(sprite_manager.get_sprite('player_idle')),
    new Player(),
    new Transform(createVector(80, 88)),
    new Gravity(),
    new Collider(
      8, 15
    ),
    new Idle(),
  ])

  get_serialized_level(0, 0, 0).forEach((bundle) => {
    game_controller.spawn_entity(bundle)
  })
  get_serialized_level(0, 160, 2).forEach((bundle) => {
    game_controller.spawn_entity(bundle)
  })

  game_controller.spawn_entity([
    new Button(
      sprite_manager.get_sprite_imgs('play_button'),
      game_world
    ),
    new Transform(createVector(50, 120)),
  ])

  game_controller.spawn_entity([
    new Button(
      sprite_manager.get_sprite_imgs('tutor_button'),
      tutorial_menu
    ),
    new Transform(createVector(110, 120)),
  ])
}

const game_world = () => {
  game_controller.world = game_controller.game_world
  if (game_controller.world.registry.entity_count > 0) {
    return
  }
}

const tutorial_menu = () => {
  game_controller.world = game_controller.option_world

  if (game_controller.world.registry.entity_count > 0) {
    return
  }

  render_plugin(game_controller.world)

  game_controller.world.spawn_entity([
    sprite_manager.get_sprite('background'),
    new Transform(createVector(0, 0, -Infinity)),
  ])

  game_controller.spawn_entity([
    new UIImage(sprite_manager.get_sprite_imgs('tutorial_screen')),
    new Transform(createVector(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)),
  ])

  let jump_sequence = /** @type {Image[]} */ ([])
  jump_sequence = jump_sequence.concat(sprite_manager.get_sprite_imgs('player_jump'))
  jump_sequence = jump_sequence.concat(sprite_manager.get_sprite_imgs('player_fall'))
  jump_sequence = jump_sequence.concat(sprite_manager.get_sprite_imgs('player_land'))
  game_controller.spawn_entity([
    new UIImage(jump_sequence),
    new Transform(createVector(48, 60)),
  ])
  game_controller.spawn_entity([
    new UIImage(sprite_manager.get_sprite_imgs('player_run')),
    new Transform(createVector(112, 60)),
  ])
  game_controller.spawn_entity([
    new Button(
      sprite_manager.get_sprite_imgs('back_button'),
      start_screen,
    ),
    new Transform(createVector(30, 20)),
  ])
}
