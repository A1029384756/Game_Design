/**
 * @param {World} world
 */
const player_animation_plugin = (world) => {
  world.register_system(new PlayerIdle())
  world.register_system(new PlayerRun())
  world.register_system(new PlayerJump())
  world.register_system(new PlayerFall())
  world.register_system(new PlayerLand())
  world.register_system(new AnimateFacing())
  world.register_system(new AnimateSprites())
}

/**
 * @param {World} world
 */
const player_plugin = (world) => {
  world.register_system(new ApplyGravity())
  world.register_system(new PlayerPhysics())
  world.register_system(new PlayerMovement())

  player_animation_plugin(world)
}

/**
 * @param {World} world
 */
const particle_plugin = (world) => {
  world.register_system(new ParticleFadeOut())
  world.register_system(new LifetimeManagement())
}

/**
 * @param {World} world
 */
const render_plugin = (world) => {
  world.register_system(new AnimateUIImage())
  world.register_system(new ButtonHover())
  world.register_system(new FollowPlayer())
  world.register_system(new RenderSprites())
  world.register_system(new RenderUI())
}
