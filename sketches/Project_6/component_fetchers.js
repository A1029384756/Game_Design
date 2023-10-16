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
 * @returns {GameText}
 */
const system_get_text = (components) => {
  // @ts-ignore
  return components.find(c => c instanceof GameText)
}

/**
 * @param {Component[]} components 
 * @returns {Gravity}
 */
const system_get_gravity = (components) => {
  // @ts-ignore
  return components.find(c => c instanceof Gravity)
}
