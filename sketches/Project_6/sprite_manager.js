/** @typedef {Map<String, Sprite>} SpriteTable */

class SpriteManager {
  constructor() {
    /** @type {SpriteTable} */
    this.sprite_table = new Map()
  }

  /** 
   * @param {String} name
   * @param {Sprite} sprite 
   */
  add_sprite(name, sprite) {
    this.sprite_table.set(name, sprite)
  }

  /**
   * @param {String} name 
   * @returns {Sprite}
   */
  get_sprite(name) {
    return this.sprite_table.get(name)
  }
}
