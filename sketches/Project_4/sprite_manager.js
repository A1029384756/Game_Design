/** @typedef {Map<String, Image>} SpriteTable */

class SpriteManager {
  constructor() {
    /** @type {SpriteTable} */
    this.sprite_table = new Map()
  }

  /** 
   * @param {String} name
   * @param {Image} img 
   */
  add_sprite(name, img) {
    this.sprite_table.set(name, img)
  }

  /**
   * @param {String} name 
   * @returns {Image}
   */
  get_sprite(name) {
    return this.sprite_table.get(name)
  }
}
