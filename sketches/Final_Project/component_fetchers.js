/**
 * @param {Component[]} components 
 * @returns {Transform}
 */
const system_get_transform = (components) => {
  // @ts-ignore
  return components.find(c => c instanceof Transform)
}

/**
 * @param {Component[]} components 
 * @returns {Sprite}
 */
const system_get_sprite = (components) => {
  // @ts-ignore
  return components.find(c => c instanceof Sprite)
}

/**
 * @param {Component[]} components 
 * @returns {Player}
 */
const system_get_player = (components) => {
  // @ts-ignore
  return components.find(c => c instanceof Player)
}

/**
 * @param {Component[]} components 
 * @returns {Collider}
 */
const system_get_collider = (components) => {
  // @ts-ignore
  return components.find(c => c instanceof Collider)
}

/**
 * @param {Component[]} components 
 * @returns {Sensor}
 */
const system_get_sensor = (components) => {
  // @ts-ignore
  return components.find(c => c instanceof Sensor)
}

/**
 * @param {Component[]} components 
 * @returns {Button}
 */
const system_get_button = (components) => {
  // @ts-ignore
  return components.find(c => c instanceof Button)
}

/**
 * @param {Component[]} components 
 * @returns {UIText}
 */
const system_get_text = (components) => {
  // @ts-ignore
  return components.find(c => c instanceof UIText)
}

/**
 * @param {Component[]} components 
 * @returns {UIImage}
 */
const system_get_image = (components) => {
  // @ts-ignore
  return components.find(c => c instanceof UIImage)
}

/**
 * @param {Component[]} components 
 * @returns {Gravity}
 */
const system_get_gravity = (components) => {
  // @ts-ignore
  return components.find(c => c instanceof Gravity)
}

/**
 * @param {Component[]} components 
 * @returns {Health}
 */
const system_get_health = (components) => {
  // @ts-ignore
  return components.find(c => c instanceof Health)
}

/**
 * @param {Component[]} components 
 * @returns {Lifetime}
 */
const system_get_lifetime = (components) => {
  // @ts-ignore
  return components.find(c => c instanceof Lifetime)
}

/**
 * @param {Component[]} components 
 * @returns {LoadingBar}
 */
const system_get_loading_bar = (components) => {
  // @ts-ignore
  return components.find(c => c instanceof LoadingBar)
}

/**
 * @param {Component[]} components 
 * @returns {Goblin}
 */
const system_get_goblin = (components) => {
  // @ts-ignore
  return components.find(c => c instanceof Goblin)
}

/**
 * @param {Component[]} components 
 * @returns {GoblinAttack}
 */
const system_get_goblin_attack = (components) => {
  // @ts-ignore
  return components.find(c => c instanceof GoblinAttack)
}

/**
 * @param {Component[]} components 
 * @returns {GoblinAttack}
 */
const system_get_player_attack = (components) => {
  // @ts-ignore
  return components.find(c => c instanceof PlayerAttack)
}
