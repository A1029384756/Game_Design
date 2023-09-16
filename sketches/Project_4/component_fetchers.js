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
 * @returns {Enemy}
 */
const system_get_enemy = (components) => {
  // @ts-ignore
  return components.find(c => c instanceof Enemy)
}

/**
 * @param {Component[]} components 
 * @returns {Gun}
 */
const system_get_gun = (components) => {
  // @ts-ignore
  return components.find(c => c instanceof Gun)
}


/**
 * @param {Component[]} components 
 * @returns {Collider}
 */
const system_get_collider = (components) => {
  // @ts-ignore
  return components.find(c => c instanceof Collider)
}
