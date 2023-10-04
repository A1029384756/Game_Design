/** @typedef {Map<String, [Image, Vector]>} SpriteTable */

class SpriteManager {
  constructor() {
    /** @type {SpriteTable} */
    this.sprite_table = new Map()
  }

  /** 
   * @param {String} name
   * @param {Image} img
   * @param {Vector} size
   */
  add_sprite(name, img, size) {
    this.sprite_table.set(name, [img, size])
  }

  /**
   * @param {String} name 
   * @returns {Image}
   */
  get_sprite(name) {
    return this.sprite_table.get(name)[0]
  }
}
