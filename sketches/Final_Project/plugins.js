/**
 * @param {World} world
 */
const player_animation_plugin = (world) => {
  world.register_system(new PlayerIdle())
  world.register_system(new PlayerRun())
  world.register_system(new PlayerJump())
  world.register_system(new PlayerFall())
  world.register_system(new PlayerLand())
  world.register_system(new PlayerJab())
  world.register_system(new PlayerRoll())
  world.register_system(new PlayerUppercut())
  world.register_system(new PlayerTakeHit())
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
  world.register_system(new HealthBarSystem())
  world.register_system(new PlayerWin())

  player_animation_plugin(world)
}

/**
 * @param {World} world
 */
const goblin_plugin = (world) => {
  world.register_system(new GoblinIdle())
  world.register_system(new GoblinRun())
  world.register_system(new GoblinAttacks())
  world.register_system(new ApplyGravity())
  world.register_system(new GoblinUpdate())
  world.register_system(new GoblinTakeHit())
  world.register_system(new GoblinPhysics())
  world.register_system(new AnimateFacing())
  world.register_system(new AnimateSprites())
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
